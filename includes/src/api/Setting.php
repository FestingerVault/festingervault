<?php

namespace FestingerVault\api;

use FestingerVault\Constants;
use FestingerVault\Helper;

class Setting extends ApiBase
{
	public function endpoints()
	{
		return [
			'get' => [
				'callback' => [$this, 'get_setting'],
				'permission_callback' => [$this, 'user_is_adminstrator'],
			],
			'roles' => [
				'callback' => [$this, 'get_roles'],
				'permission_callback' => [$this, 'user_is_adminstrator'],
			],
			'update' => [
				'callback' => [$this, 'update_setting'],
				'permission_callback' => [$this, 'user_is_adminstrator'],
				'args' => [
					'autoactivate' => [
						'required' => false,
						'validate_callback' => function (
							$param,
							$request,
							$key
						) {
							return is_bool($param);
						},
					],
					'clean_on_uninstall' => [
						'required' => false,
						'validate_callback' => function (
							$param,
							$request,
							$key
						) {
							return is_bool($param);
						},
					],
					'roles' => [
						'required' => true,
						'validate_callback' => function (
							$param,
							$request,
							$key
						) {
							return is_array($param);
						},
					],
				],
			],
		];
	}

	/**
	 * @param \WP_REST_Request $request
	 */
	public function get_setting(\WP_REST_Request $request)
	{
		return get_option(Constants::SETTING_KEY, Constants::DEFAULT_SETTINGS);
	}
	public function update_setting(\WP_REST_Request $request)
	{
		$keys = ['autoactivate', 'clean_on_uninstall', 'roles'];
		$setting = [];
		foreach ($keys as $key) {
			$setting[$key] = $request->get_param($key);
		}
		update_option(Constants::SETTING_KEY, $setting);
		return ['success' => true];
	}
	public function get_roles()
	{
		return Helper::get_roles();
	}
}
