<?php

namespace FestingerVault;

class Plugin
{
	/**
	 * @var mixed
	 */
	public static $settings;

	/**
	 * Plugin main file
	 *
	 * @var string
	 */
	private static $file;

	/**
	 * @var static|null
	 */
	private static $instance = null;

	function __clone()
	{
		// Prevent cloning of the instance
	}

	/**
	 * @param $file
	 */
	public function __construct($file)
	{
		self::$file = $file;
		register_activation_hook(self::$file, [$this, 'add_admin_capability']);
		Admin::get_instance();
		RestAPI::get_instance();
		AutoUpdate::get_instance();
	}

	function __wakeup()
	{
		// Prevent unserializing of the instance
	}

	public function add_admin_capability()
	{
		$capability = 'access_' . Constants::ADMIN_PAGE_ID;
		$role = get_role('administrator');
		if ($role && !$role->has_cap($capability)) {
			$role->add_cap($capability, true);
		}
	}

	/**
	 * @param $file
	 */
	public static function get_instance($file)
	{
		if (is_null(self::$instance)) {
			self::$instance = new self($file);
		}
		return self::$instance;
	}

	public static function info()
	{
		if (!function_exists('get_plugin_data')) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}
		return get_plugin_data(self::$file);
	}

	/**
	 * plugin_dir
	 *
	 * @param  string $path
	 * @return string Full resolved path
	 */
	public static function p_dir($path = '')
	{
		return trailingslashit(dirname(self::$file)) . trim($path, '/');
	}

	/**
	 * plugin_url
	 *
	 * @param  string $path
	 * @return string Full resolved url
	 */
	public static function p_url($path = '')
	{
		return plugins_url(trim($path, '/'), self::$file);
	}
}
