<?php

namespace FestingerVault;

use FestingerVault\exceptions\{
	ItemDetailErrorException,
	ItemDownloadDetailException
};

class AutoUpdate
{
	/**
	 * @var	static $instance
	 */
	private static $instance = null;

	function __construct()
	{
		add_action('init', [$this, 'schedule_action']);
		add_action(Constants::SLUG . '/autoupdate', [$this, 'auto_update']);
		add_action(
			Constants::SLUG . '/autoupdate/run-update',
			[$this, 'auto_update_run'],
			10,
			2
		);
		add_action(Constants::SLUG . '/autoupdate/cleanup', [$this, 'cleanup']);
	}

	function auto_update()
	{
		$settings = get_option(Constants::AUTOUPDATE_SETTING_KEY);
		$engine_data = Helper::get_item_updates();
		if (!is_wp_error($engine_data)) {
			foreach ($engine_data['data'] as $item) {
				if (
					isset($settings[$item['type']]) &&
					in_array($item['slug'], $settings[$item['type']])
				) {
					if (
						version_compare(
							$item['version'],
							$item['installed_version'],
							'gt'
						) === true
					) {
						if (function_exists('as_schedule_single_action')) {
							as_schedule_single_action(
								time(),
								Constants::SLUG . '/autoupdate/run-update',
								[$item['id'], $item['slug']],
								Constants::SLUG
							);
						}
					}
				}
			}
		}
	}
	function auto_update_run($item_id, $slug = null)
	{
		try {
			$item_detail = Helper::engine_post('item/detail', [
				'item_id' => $item_id,
			]);
			if (is_wp_error($item_detail)) {
				throw new ItemDetailErrorException($item_id);
			}
			$download_detail = Helper::engine_post('item/download', [
				'item_id' => $item_id,
				'method' => 'update',
			]);
			if (is_wp_error($download_detail)) {
				throw new ItemDownloadDetailException($item_id);
			}
			if ('template-kit' === $item_detail['type']) {
				return false;
			}
			$installer = new Installer($item_detail, $download_detail, $slug);
			$installer->run();
			return true;
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage());
		}
	}

	function cleanup()
	{
		/** @var \wpdb $wpdb WP Database */
		global $wpdb;
		$group_id = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT group_id FROM {$wpdb->prefix}actionscheduler_groups WHERE slug=%s",
				Constants::SLUG
			)
		);
		if ($group_id) {
			$wpdb->query(
				$wpdb->prepare(
					"DELETE actions, logs FROM {$wpdb->prefix}actionscheduler_actions actions LEFT JOIN {$wpdb->prefix}actionscheduler_logs logs ON ( logs.action_id = actions.action_id) WHERE group_id=%d AND scheduled_date_gmt < (NOW() - INTERVAL 1 HOUR) AND status=%s",
					$group_id,
					'complete'
				)
			);
		}
	}
	/**
	 * @return self
	 */
	public static function get_instance()
	{
		if (is_null(self::$instance)) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	function schedule_action()
	{
		if (function_exists('as_has_scheduled_action')) {
			if (
				false ===
				as_has_scheduled_action(Constants::SLUG . '/autoupdate')
			) {
				as_schedule_recurring_action(
					strtotime('1 hour'),
					1 * HOUR_IN_SECONDS,
					Constants::SLUG . '/autoupdate',
					[],
					Constants::SLUG,
					true
				);
			}
			if (
				false ===
				as_has_scheduled_action(Constants::SLUG . '/autoupdate/cleanup')
			) {
				as_schedule_recurring_action(
					strtotime('1 hour'),
					1 * HOUR_IN_SECONDS,
					Constants::SLUG . '/autoupdate/cleanup',
					[],
					Constants::SLUG,
					true
				);
			}
		}
	}
}
