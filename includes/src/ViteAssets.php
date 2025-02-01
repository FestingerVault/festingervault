<?php
namespace FestingerVault;

class ViteAssets
{
	const DEV_CLIENT_HANDLE = 'vite-wp-react-assets-dev-client';

	/**
	 * Assets directory path
	 *
	 * @var string
	 */
	protected string $assets_path;

	/**
	 * Assets directory URL
	 *
	 * @var string
	 */
	protected string $assets_url;

	/**
	 * React refresh preamble printed ports
	 *
	 * @var array
	 */
	protected static $preamble_printed_ports = [];

	/**
	 * Development manifest
	 *
	 * @var ?array
	 */
	protected ?array $dev_manifest = null;

	/**
	 * Production manifest
	 *
	 * @var ?array
	 */
	protected ?array $prod_manifest = null;

	/**
	 * Configuration options
	 *
	 * @var array
	 */
	protected array $config;

	private $dependencies = [];

	/**
	 * The registered assets.
	 *
	 * @var array
	 */
	private $registered_assets = [];

	/**
	 * ViteAssets constructor.
	 *
	 * @param string $assets_path Path to assets directory.
	 * @param string $assets_url  URL to assets directory.
	 * @param array  $config     Configuration options.
	 */
	public function __construct(
		string $assets_path,
		string $assets_url,
		array $config = []
	) {
		$this->assets_path = untrailingslashit($assets_path);
		$this->assets_url = untrailingslashit($assets_url);

		$default_config = [
			'prod-manifest' => 'manifest.json',
			'dev-manifest' => 'dev-server.json',
			'dependencies' => 'dependencies.json',
			'preload-css-chunks' => true,
		];

		$this->config = wp_parse_args($config, $default_config);

		$this->init();
	}

	/**
	 * Enqueue asset
	 *
	 * @param string $entry   Entrypoint.
	 * @param array  $options Options.
	 *
	 * @return bool
	 */
	public function enqueue(string $entry, array $options = []): bool
	{
		if (!$this->is_registered($entry)) {
			$this->register($entry, $options);
		}

		// If the entry is still not registered, return false.
		if (!$this->is_registered($entry)) {
			return false;
		}

		$script_handle = $this->get_entry_script_handle($entry);

		$options = $this->parse_options($options);

		if ($script_handle && !$options['skip-script']) {
			wp_enqueue_script($script_handle);
		}

		if ($options['skip-style']) {
			return true;
		}

		$style_handles = $this->get_entry_style_handles($entry);

		foreach ($style_handles as $style_handle) {
			wp_enqueue_style($style_handle);
		}

		return true;
	}

	/**
	 * Get the development manifest.
	 *
	 * @return null|array
	 */
	public function get_dev_manifest(): ?array
	{
		return $this->dev_manifest;
	}

	/**
	 * Get the registered script handle for a given entry.
	 *
	 * @param string $entry Entry name.
	 *
	 * @return string
	 */
	public function get_entry_script_handle(string $entry): string
	{
		return $this->registered_assets[$entry]['script'] ?? '';
	}

	/**
	 * Get the registered style handles for a given entry.
	 *
	 * @param string $entry Entry name.
	 *
	 * @return array
	 */
	public function get_entry_style_handles(string $entry): array
	{
		return $this->registered_assets[$entry]['styles'] ?? [];
	}

	/**
	 * Returns imports for a file listed in the manifest.
	 *
	 * Can be used to preload JS chunks.
	 *
	 * @param string $entry Entrypoint.
	 * @return array
	 */
	public function get_import_chunks(string $entry): array
	{
		$manifest = $this->get_prod_manifest();

		if (
			!isset($manifest[$entry]['imports']) ||
			!is_array($manifest[$entry]['imports'])
		) {
			return [];
		}

		$imports = [];

		foreach ($manifest[$entry]['imports'] as $import) {
			if (isset($manifest[$import]['file'])) {
				$url = sprintf(
					'%s/%s',
					$this->assets_url,
					$manifest[$import]['file']
				);

				$imports[] = [
					'entry' => $import,
					'url' => $url,
				];
			}
		}

		return $imports;
	}

	/**
	 * Get the production manifest.
	 *
	 * @return null|array
	 */
	public function get_prod_manifest(): ?array
	{
		return $this->prod_manifest;
	}

	/**
	 * Get the registered assets.
	 *
	 * @return array
	 */
	public function get_registered_assets(): array
	{
		return $this->registered_assets;
	}

	/**
	 * Whether the manifest is for development.
	 *
	 * @return bool
	 */
	public function is_dev(): bool
	{
		return (bool) $this->dev_manifest;
	}

	/**
	 * Whether a handle is registered.
	 *
	 * @param string $entry Entry name.
	 * @param string $as    Asset type (script or style).
	 * @return bool
	 */
	public function is_registered(string $entry, string $as = 'script'): bool
	{
		$key = 'style' === $as ? 'styles' : 'script';

		return !empty($this->registered_assets[$entry][$key]);
	}

	/**
	 * Register asset
	 *
	 * @param string $entry   Entrypoint to register.
	 * @param array  $options Options.
	 *
	 * @return array
	 */
	public function register(string $entry, array $options): ?array
	{
		$options = $this->parse_options($options);
		$entry_dependencies = $this->dependencies[$entry] ?? [];
		$options['script-dependencies'] = array_merge(
			$entry_dependencies,
			$options['script-dependencies']
		);
		$data = $this->is_dev()
			? $this->register_for_dev($entry, $options)
			: $this->register_for_prod($entry, $options);

		$this->registered_assets[$entry] = $data;

		return $data;
	}

	/**
	 * Inject react-refresh preamble script.
	 *
	 * @return void
	 */
	protected function add_react_refresh_preamble(): void
	{
		$manifest = $this->get_dev_manifest();

		$port = $manifest['port'] ?? null;

		// If we have already printed the preamble for this port, don't print it again.
		if (!$port || !empty(self::$preamble_printed_ports[$port])) {
			return;
		}

		self::$preamble_printed_ports[$port] = true;

		if (!in_array('vite:react-refresh', $manifest['plugins'], true)) {
			return;
		}

		$react_refresh_url = $this->get_dev_asset_url('@react-refresh');

		$data = implode(PHP_EOL, [
			sprintf('import RefreshRuntime from "%s";', $react_refresh_url),
			'RefreshRuntime.injectIntoGlobalHook(window);',
			'window.$RefreshReg$ = () => {};',
			'window.$RefreshSig$ = () => (type) => type;',
			'window.__vite_plugin_react_preamble_installed__ = true;',
		]);

		$handle = $this->get_dev_client_handle();

		wp_add_inline_script($handle, $data, 'after');

		add_filter('wp_inline_script_attributes', function (
			array $attributes
		) use ($handle): array {
			if (
				isset($attributes['id']) &&
				"{$handle}-js-after" === $attributes['id']
			) {
				$attributes['type'] = 'module';
			}

			return $attributes;
		});
	}

	/**
	 * Die if debugging is enabled.
	 *
	 * @param mixed $message Message to display.
	 * @return void
	 */
	protected function die_if_debug($message): void
	{
		if (defined('WP_DEBUG') && WP_DEBUG) {
			wp_die(esc_html($message));
		}
	}

	/**
	 * Get development asset url
	 *
	 * @param string $entry Entry name.
	 *
	 * @return string
	 */
	protected function get_dev_asset_url(string $entry): string
	{
		$manifest = $this->get_dev_manifest();

		// Ensure that we don't have double slashes in the path.
		$path = trim(
			preg_replace('#[/]{2,}#', '/', "{$manifest['base']}/{$entry}"),
			'/'
		);

		// Append path to the server origin.
		return sprintf('%s/%s', untrailingslashit($manifest['origin']), $path);
	}

	/**
	 * Get client dev script handle
	 *
	 * @return string
	 */
	protected function get_dev_client_handle()
	{
		$manifest = $this->get_dev_manifest();

		$port = $manifest['port'] ?? null;

		// Add port to the handle to allow multiple dev servers to run at the same time.
		return $port
			? self::DEV_CLIENT_HANDLE . "-{$port}"
			: self::DEV_CLIENT_HANDLE;
	}

	/**
	 * Initialize
	 *
	 * @return void
	 */
	protected function init(): void
	{
		try {
			$this->init_manifest();
			$this->init_dependencies();
		} catch (\Exception $e) {
			$this->die_if_debug(esc_html($e->getMessage()));
		}
	}

	protected function init_dependencies()
	{
		$this->dependencies = $this->read_json_file(
			$this->config['dependencies']
		);
	}

	/**
	 * Initialize manifest
	 *
	 * @return void
	 * @throws \Exception Exception is thrown when the file doesn't exist or is unreadble.
	 */
	protected function init_manifest(): void
	{
		$this->dev_manifest = $this->read_json_file(
			$this->config['dev-manifest']
		);

		if (!$this->dev_manifest) {
			$this->prod_manifest = $this->read_json_file(
				$this->config['prod-manifest']
			);
		}

		if (!$this->dev_manifest && !$this->prod_manifest) {
			throw new \Exception(
				esc_html(
					sprintf(
						'[ViteWPReactAssets] Manifest file not found or is not readable in %s.',
						$this->assets_path
					)
				)
			);
		}
	}

	/**
	 * Parse options and merge with defaults.
	 *
	 * @param array $options Array of options.
	 *
	 * @return array Array of options merged with defaults.
	 */
	protected static function parse_options(array $options): array
	{
		$defaults = [
			'handle' => '',
			'script-dependencies' => [],
			'script-args' => false, // Can be [ 'in_footer' => false ].
			'style-dependencies' => [],
			'style-media' => 'all',
			'skip-script' => false,
			'skip-style' => false,
			'inline-script-data' => '',
			'inline-script-position' => 'after',
		];

		return wp_parse_args($options, $defaults);
	}

	/**
	 * Read JSON file in the assets directory.
	 *
	 * @param string $file_name File name.
	 *
	 * @return array|null
	 */
	protected function read_json_file(string $file_name)
	{
		$path = "{$this->assets_path}/{$file_name}";

		if (is_file($path) && is_readable($path)) {
			return wp_json_file_decode($path, ['associative' => true]);
		}

		return null;
	}

	/**
	 * Register vite client script
	 *
	 * @return void
	 */
	protected function register_dev_client(): void
	{
		$handle = $this->get_dev_client_handle();

		// Don't register the script if it's already registered.
		if (wp_script_is($handle, 'enqueued')) {
			return;
		}

		$src = $this->get_dev_asset_url('@vite/client');

		wp_register_script($handle, $src, [], null, false);

		$this->load_script_as_module($handle);
	}

	/**
	 * Register assets for development.
	 *
	 * @param string $entry   Entrypoint.
	 * @param array  $options Options.
	 *
	 * @return array|null Registered assets data.
	 */
	protected function register_for_dev(string $entry, array $options): ?array
	{
		if (!$this->is_dev()) {
			return null;
		}
		$this->register_dev_client();
		$this->add_react_refresh_preamble();

		// Add the dev client as a dependency to the script.
		$dependencies = apply_filters(
			'dependencies/' . $options['handle'],
			array_merge(
				[$this->get_dev_client_handle()],
				$options['script-dependencies']
			)
		);

		$url = $this->get_dev_asset_url($entry);

		$this->load_script_as_module($options['handle']);

		if (
			!wp_register_script(
				$options['handle'],
				$url,
				$dependencies,
				null,
				$options['script-args']
			)
		) {
			return null;
		}

		$data = [
			'script' => $options['handle'],
			// Retain the style dependencies for development so that the styles are enqueued.
			'styles' => $options['style-dependencies'],
		];

		return apply_filters(
			strtolower(__CLASS__) . '__dev_entry_assets_data',
			$data,
			$entry,
			$options,
			$this
		);
	}

	/**
	 * Register assets for development.
	 *
	 * @param string $entry   Entrypoint.
	 * @param array  $options Options.
	 *
	 * @return array|null Registered assets data.
	 */
	protected function register_for_prod(string $entry, array $options): ?array
	{
		$manifest = $this->get_prod_manifest();

		if (!isset($manifest[$entry]['file'])) {
			$this->die_if_debug(
				sprintf(
					'[ViteWPReactAssets] Entry "%s" does not exist.',
					$entry
				)
			);

			return null;
		}

		$data = [
			'script' => null,
			'styles' => [],
		];

		$item = $manifest[$entry];

		if (!$options['skip-script']) {
			$src = "{$this->assets_url}/{$item['file']}";

			$this->load_script_as_module($options['handle']);
			$dependencies = apply_filters(
				'dependencies/' . $options['handle'],
				$options['script-dependencies']
			);

			// Don't worry about browser caching as the version is embedded in the file name.
			$result = wp_register_script(
				$options['handle'],
				$src,
				$dependencies,
				null,
				$options['script-args']
			);

			if ($result) {
				$data['script'] = $options['handle'];
			}
		}

		if (!$options['skip-style']) {
			$css = $item['css'] ?? [];

			if ($this->config['preload-css-chunks']) {
				// Actively load CSS from lazy loaded js chunks.
				foreach ($this->get_import_chunks($entry) as $import) {
					$css = array_merge(
						$css,
						$manifest[$import['entry']]['css'] ?? []
					);
				}
			}

			foreach ($css as $index => $css_path) {
				$handle = "{$options['handle']}-{$index}";

				// Don't worry about browser caching as the version is embedded in the file name.
				$result = wp_register_style(
					$handle,
					"{$this->assets_url}/{$css_path}",
					$options['style-dependencies'],
					null,
					$options['style-media']
				);

				if ($result) {
					$data['styles'][] = $handle;
				}
			}
		}

		return apply_filters(
			strtolower(__CLASS__) . '__prod_entry_assets_data',
			$data,
			$entry,
			$options,
			$this
		);
	}

	/**
	 * Ensures that a script is loaded as a module by adding `type="module"` to the script tag.
	 *
	 * @param string $handle Script handle.
	 *
	 * @return void
	 */
	private function load_script_as_module(string $handle): void
	{
		add_filter('wp_script_attributes', function (array $attributes) use (
			$handle
		): array {
			if (
				isset($attributes['id']) &&
				"{$handle}-js" === $attributes['id']
			) {
				$attributes['type'] = 'module';
			}

			return $attributes;
		});
	}
}
