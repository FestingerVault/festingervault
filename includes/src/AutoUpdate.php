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

		$settings = get_option(Constants::AUTOUPDATE_SETTING_KEY);
		$engine_data = Helper::get_item_updates();
		if (!is_wp_error($engine_data)) {
			foreach ($engine_data['data'] as $item) {
				if (
					isset($settings[$item['type']]) &&
					is_array($settings[$item['type']]) &&
					in_array($item['slug'], $settings[$item['type']])
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
			wp_schedule_event(
				strtotime('+1 hour'),
				'hourly',
				Constants::SLUG . '/autoupdate'
			);
		}
	}
}
