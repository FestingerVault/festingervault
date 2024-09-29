<?php

namespace FestingerVault;

use WP_Error;

class Helper
{
	/**
	 * @param string $path
	 * @param array $data
	 * @return array|WP_Error
	 */
	public static function engine_post(string $path, $data = [], $cache = false)
	{
		$data = array_merge($data, [
			'site_information' => self::get_site_information(),
		]);
		$content_body = json_encode($data);
		$result = wp_remote_post(
			trailingslashit(Constants::ENGINE_URL) .
				'api/client/' .
				trim($path, '/'),
			[
				'sslverify' =>
					defined('WP_DEBUG') && WP_DEBUG == true ? false : true,
				'headers' => [
					'Content-Type' => 'application/json',
					'X-Install-ID' => get_option(Constants::ACTIVATION_KEY, ''),
				],
				'body' => $content_body,
			]
		);
		$body = json_decode(wp_remote_retrieve_body($result), true);
		if (
			is_wp_error($result) ||
			wp_remote_retrieve_response_code($result) !== 200 ||
			isset($body['error'])
		) {
			return new WP_Error(
				400,
				$body['message'] ?? __('Something went wrong')
			);
		}
		return $body;
	}
	static function wp_content_rel_path($path)
	{
		$wp_content_dir = trailingslashit(\wp_normalize_path(\WP_CONTENT_DIR));
		return rtrim(
			str_replace($wp_content_dir, '', \wp_normalize_path($path)),
			'/'
		);
	}

	/**
	 * @return array|WP_Error
	 */
	public static function get_item_updates()
	{
		$installed_themes = Helper::installed_themes();
		$installed_plugins = Helper::installed_plugins();

		$result = Helper::engine_post('update/list', [
			'themes' => $installed_themes,
			'plugins' => $installed_plugins,
		]);
		if (is_wp_error($result)) {
			return new WP_Error(400, 'Error Fetching Update List');
		}
		$data = [];
		foreach ($result['data'] as $item) {
			if (
				'wordpress-themes' == $item['type'] &&
				isset($installed_themes[$item['slug']])
			) {
				$item['installed_version'] =
					$installed_themes[$item['slug']]['version'];
				$item['path'] = $installed_themes[$item['slug']]['path'];
				$item['install_dir'] = self::wp_content_rel_path(
					trailingslashit(
						$installed_themes[$item['slug']]['theme_root']
					) . trim($installed_themes[$item['slug']]['path'], '/')
				);

				$item['data'] = $installed_themes[$item['slug']];
				$data[] = $item;
			}
			if (
				'wordpress-plugins' == $item['type'] &&
				isset($installed_plugins[$item['slug']])
			) {
				$item['installed_version'] =
					$installed_plugins[$item['slug']]['version'];
				$item['path'] = $installed_plugins[$item['slug']]['path'];
				$item['install_dir'] = self::wp_content_rel_path(
					\plugin_dir_path(
						trailingslashit(WP_PLUGIN_DIR) .
							trim($installed_plugins[$item['slug']]['path'], '/')
					)
				);
				$data[] = $item;
			}
		}
		usort($data, function ($a, $b) {
			return strcmp(strtolower($a['title']), strtolower($b['title']));
		});
		$updatable = array_filter($data, function ($item) {
			return version_compare(
				$item['version'],
				$item['installed_version'],
				'gt'
			);
		});
		$data = array_filter($data, function ($item) {
			return version_compare(
				$item['version'],
				$item['installed_version'],
				'le'
			);
		});
		return ['data' => array_values(array_merge($updatable, $data))];
	}

	/**
	 * @return array
	 */
	public static function get_site_information()
	{
		/** @var \wpdb $wpdb WP Database */
		global $wpdb;
		$site_url = get_site_url();
		$admin_email = get_option('admin_email');
		$table_prefix = $wpdb->prefix;
		$plugin_uuid = get_option('fv_uuid');
		$info = Plugin::info();
		if (!$plugin_uuid) {
			$plugin_uuid = wp_generate_uuid4();
			update_option('fv_uuid', $plugin_uuid);
		}
		$data = [
			'site_url' => $site_url,
			'admin_email' => $admin_email,
			'table_prefix' => $table_prefix,
			'uuid' => $plugin_uuid,
			'wp_path' => \ABSPATH,
			'wp_version' => get_bloginfo('version'),
			'fv_version' => $info['Version'] ?? null,
		];
		return $data;
	}

	/**
	 * @return array
	 */
	public static function installed_plugins()
	{
		if (!function_exists('get_plugins')) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}
		$plugins = get_plugins();
		$result = [];
		foreach ($plugins as $file_path => $plugin) {
			$slug = Helper::slug_from_path($file_path);
			$result[$slug] = [
				'slug' => $slug,
				'path' => $file_path,
				'name' => $plugin['Name'],
				'version' => $plugin['Version'],
			];
		}
		return $result;
	}

	/**
	 * @return array
	 */
	public static function installed_themes()
	{
		if (!function_exists('wp_get_themes')) {
			require_once ABSPATH . 'wp-admin/includes/theme.php';
		}
		$themes = wp_get_themes();
		$result = [];
		foreach ($themes as $slug => $theme) {
			$result[$slug] = [
				'slug' => $slug,
				'path' => $slug,
				'theme_root' => $theme->get_theme_root(),
				'name' => $theme->get('Name'),
				'version' => $theme->get('Version'),
			];
		}
		return $result;
	}

	/**
	 * @param string $path
	 * @return string
	 */
	public static function slug_from_path($path = '')
	{
		$parts = explode('/', $path);
		return array_shift($parts);
	}
}
