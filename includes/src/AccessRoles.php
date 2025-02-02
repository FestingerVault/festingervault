<?php
namespace FestingerVault;

class AccessRoles
{
	/**
	 * @var static
	 */
	private static $instance = null;

	public function __construct()
	{
		add_action('init', [$this, 'capability']);
	}

	public static function get_instance()
	{
		if (is_null(self::$instance)) {
			self::$instance = new self();
		}
		return self::$instance;
	}
	public function capability()
	{
		$capability = 'access_' . Constants::ADMIN_PAGE_ID;

		$cache_key = Constants::SLUG . '_roles_cache';
		$license_detail = get_transient($cache_key);
		if (!$license_detail) {
			$license_detail = Helper::engine_post('license/activations');
			set_transient($cache_key, $license_detail, 30 * MINUTE_IN_SECONDS);
		}
		$roles = ['administrator' => true];

		if (!is_wp_error($license_detail)) {
			$settings = get_option(
				Constants::SETTING_KEY,
				Constants::DEFAULT_SETTINGS
			);

			if ($license_detail['roles'] == true) {
				$enabled_roles = isset($settings['roles'])
					? $settings['roles']
					: null;
				if (!is_array($enabled_roles)) {
					$enabled_roles = [];
				}
				foreach (Helper::get_roles() as $role => $label) {
					$roles[$role] = in_array($role, $enabled_roles);
				}
			}
		}
		foreach ($roles as $role => $grant) {
			$role = get_role($role);
			if ($role) {
				$role->add_cap($capability, $grant);
			}
		}
	}
}
