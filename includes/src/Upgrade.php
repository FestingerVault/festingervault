<?php
namespace FestingerVault;

class Upgrade
{
	public $cache_allowed;

	public $cache_key;

	public $plugin_slug;

	public $version;

	private static $file;

	/**
	 * @var static
	 */
	private static $instance = null;

	/**
	 * @param $file
	 */
	function __construct($file)
	{
		if (defined('WP_DEBUG') && WP_DEBUG === true) {
			add_filter('https_ssl_verify', '__return_false');
			add_filter('https_local_ssl_verify', '__return_false');
			add_filter('http_request_host_is_external', '__return_true');
		}
		if (!function_exists('get_plugin_data')) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}
		self::$file = $file;
		$plugin_info = get_plugin_data($file);
		$this->plugin_slug = dirname(plugin_basename($file));
		$this->version = $plugin_info['Version'];
		$this->cache_key = 'vault_updater';
		$this->cache_allowed = true;
		add_filter('plugins_api', [$this, 'info'], 20, 3);
		add_filter('site_transient_update_plugins', [$this, 'update']);
	}

	/**
	 * Get Instance
	 * @param string $file
	 */
	public static function get_instance($file)
	{
		if (is_null(self::$instance)) {
			self::$instance = new self($file);
		}
		return self::$instance;
	}

	/**
	 * @param $response
	 * @param $action
	 * @param $args
	 * @return boolean|\stdClass
	 */
	function info($response, $action, $args)
	{
		if (
			'plugin_information' == $action &&
			isset($args->slug) &&
			$args->slug === $this->plugin_slug
		) {
			$remote = $this->request();
			if (!$remote) {
				return $response;
			}

			$response = $remote;
		}
		return $response;
	}

	/**
	 * @return boolean|\stdClass
	 */

	public function request()
	{
		/**
		 * @var boolean|\stdClass
		 */
		$response = get_transient($this->cache_key);

		if (false === $response || !$this->cache_allowed) {
			$remote = wp_remote_get(
				add_query_arg(['time' => time()], Constants::PLUGIN_INFO_URL),
				[
					'timeout' => 10,
					'headers' => [
						'Accept' => 'application/json',
						'Accept-encoding' => 'deflate',
					],
				]
			);

			if (
				is_wp_error($remote) ||
				200 !== wp_remote_retrieve_response_code($remote) ||
				empty(wp_remote_retrieve_body($remote))
			) {
				return false;
			}
			$remote = json_decode(wp_remote_retrieve_body($remote), false);
			$response = new \stdClass();

			$response->name = $remote->name;
			$response->slug = $remote->slug;
			$response->version = $remote->version;
			$response->tested = $remote->tested;
			$response->requires = $remote->requires;
			$response->author = $remote->author;
			$response->author_profile = $remote->author_profile;
			$response->homepage = $remote->homepage;
			$response->requires_php = $remote->requires_php;
			$response->last_updated = $remote->last_updated;
			$response->sections = [
				'description' => $remote->sections->description,
				'installation' => $remote->sections->installation,
				'changelog' => $remote->sections->changelog,
			];
			$response->banners = [
				'low' => $remote->banners->low,
				'high' => $remote->banners->high,
			];
			$response->icons = [
				'1x' => $remote->icon,
			];
			$response->download_link = add_query_arg(
				['time' => time()],
				Constants::PLUGIN_DOWNLOAD_URL
			);
			$response->plugin = plugin_basename(self::$file);
			if (version_compare($this->version, $remote->version, '<')) {
				$response->update = 1;
			}
			set_transient($this->cache_key, $response, 20 * MINUTE_IN_SECONDS);
		}
		return $response;
	}

	/**
	 * @param \stdClass $transient
	 * @return \stdClass
	 */
	public function update($transient)
	{
		if (empty($transient->checked)) {
			return $transient;
		}
		$remote = $this->request();
		if ($remote) {
			$response = $this->request();
			$response->new_version = $response->version;
			$response->package = $response->download_link;
			if (version_compare($this->version, $remote->version, '<')) {
				$transient->response[$response->plugin] = $response;
			} else {
				$transient->no_update[$response->plugin] = $response;
			}
		}
		return $transient;
	}
}
