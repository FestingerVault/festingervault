<?php

namespace FestingerVault;

use FestingerVault\exceptions\ItemDetailErrorException;
use FestingerVault\exceptions\ItemDownloadDetailException;

class AutoUpdate
{
	/**
	 * @var	static $instance
	 */
	private static $instance = null;

	public function __construct()
	{
		add_action('init', [$this, 'schedule_action']);
		add_action(Constants::SLUG . '/autoupdate', [
			$this,
			'autoupdate_check',
		]);
		add_action(
			Constants::SLUG . '/autoupdate/item',
			[$this, 'autoupdate_item'],
			10,
			2
		);
	}

	public function autoupdate_check()
	{
		$activation_detail = Helper::get_activation_detail();
		if ($activation_detail === false) {
			return null;
		}
		if (
			isset($activation_detail['install_allowed']) &&
			$activation_detail['install_allowed'] === false
		) {
			return null;
		}
		if (
			isset($activation_detail['autoupdate']) &&
			$activation_detail['autoupdate'] !== true
		) {
			return null;
		}
		$settings = get_option(
			Constants::SETTING_KEY,
			Constants::DEFAULT_SETTINGS
		);
		if (!isset($settings['autoupdate_day_of_week'])) {
			$days = [0, 1, 2, 3, 4, 5, 6, 7];
		} else {
			$days = $settings['autoupdate_day_of_week'];
		}
		$today_day = date('w');
		if (!in_array($today_day, $days, false)) {
			// no autoupdate enabled for today, so skip
			return null;
		}
		$enabled_items = get_option(Constants::AUTOUPDATE_SETTING_KEY);
		$engine_data = Helper::get_item_updates();
		if (!is_wp_error($engine_data)) {
			foreach ($engine_data['data'] as $item) {
				if (
					isset($enabled_items[$item['type']]) &&
					is_array($enabled_items[$item['type']]) &&
					in_array($item['slug'], $enabled_items[$item['type']])
				) {
					if (
						version_compare(
							$item['version'],
							$item['installed_version'],
							'gt'
						) === true
					) {
						wp_schedule_single_event(
							time(),
							Constants::SLUG . '/autoupdate/item',
							[$item['id'], $item['slug']]
						);
					}
				}
			}
		}
	}
	public function autoupdate_item($item_id, $slug = null)
	{
		$activation_detail = Helper::get_activation_detail();
		if ($activation_detail === false) {
			return;
		}
		if (
			isset($activation_detail['install_allowed']) &&
			$activation_detail['install_allowed'] === false
		) {
			return;
		}
		if (
			isset($activation_detail['autoupdate']) &&
			$activation_detail['autoupdate'] !== true
		) {
			return;
		}

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

	public function schedule_action()
	{
		if (false === wp_next_scheduled(Constants::SLUG . '/autoupdate')) {
			$settings = get_option(
				Constants::SETTING_KEY,
				Constants::DEFAULT_SETTINGS
			);
			if (
				!isset($settings['autoupdate_hour']) ||
				$settings['autoupdate_hour'] > 23 ||
				$settings['autoupdate_hour'] < 0
			) {
				$hour = 0;
			} else {
				$hour = $settings['autoupdate_hour'];
			}
			if (
				!isset($settings['autoupdate_minute']) ||
				$settings['autoupdate_minute'] > 59 ||
				$settings['autoupdate_minute'] < 0
			) {
				$minute = 0;
			} else {
				$minute = $settings['autoupdate_minute'];
			}
			$timestamp =
				'tomorrow ' .
				\str_pad($hour, 2, '0') .
				':' .
				\str_pad($minute, 2, '0') .
				':00';
			wp_schedule_event(
				strtotime($timestamp),
				'daily',
				Constants::SLUG . '/autoupdate'
			);
		}
	}
}
