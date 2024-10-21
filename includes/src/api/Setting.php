<?php

namespace FestingerVault\api;

use FestingerVault\Constants;

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
		global $wp_roles;

		// Check if wp_roles is set
		if (!isset($wp_roles)) {
			$wp_roles = new \WP_Roles();
		}

		// Get the roles as an array
		$roles = $wp_roles->roles;

		// Initialize an empty array for the key => label roles
		$res = [];

		// Loop through each role and build the key => label array
		foreach ($roles as $role_slug => $role_details) {
			if ($role_slug === 'administrator') {
				continue;
			}
			$res[$role_slug] = $role_details['name'];
		}

		return $res;
	}
}
