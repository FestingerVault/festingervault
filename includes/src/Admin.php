<?php
namespace FestingerVault;

class Admin
{
	/**
	 * @var mixed
	 */
	private static $instance = null;

	/**
	 * @var mixed
	 */
	/**
	 * @param array $dependencies
	 */
	private $page = null;

	/**
	 * @var mixed
	 *
	 */
	function __construct()
	{
		add_action('admin_menu', [$this, 'admin_menu'], PHP_INT_MAX);
		add_action(
			'admin_enqueue_scripts',
			[$this, 'admin_enqueue_scripts'],
			PHP_INT_MAX
		);
		add_action('admin_init', [$this, 'admin_init']);
	}

	/**
	 * @param $screen
	 */
	public function admin_enqueue_scripts($screen)
	{
		$css = [];
		$css[] =
			'li#toplevel_page_' .
			Constants::ADMIN_PAGE_ID .
			'.menu-top{ background: rgb(230,13,145);background: linear-gradient(90deg, rgba(230,13,145,1) 0%, rgba(230,13,82,1) 50%); transition:background ease-in-out .5s;}';
		$css[] =
			'li#toplevel_page_' .
			Constants::ADMIN_PAGE_ID .
			'.menu-top a,li#toplevel_page_' .
			Constants::ADMIN_PAGE_ID .
			'.menu-top div.wp-menu-image:before{ color:#FFF;}';
		$css[] =
			'li#toplevel_page_' .
			Constants::ADMIN_PAGE_ID .
			'.menu-top:hover{ background: rgb(230,13,145);background: linear-gradient(90deg, rgba(230,13,145,1) 0%, rgba(230,13,82,1) 10%)}';
		wp_add_inline_style('nav-menus', implode('', $css));
	}

	public function admin_init()
	{
		if ($this->is_current()) {
			$this->enqueue_scripts();
			$this->render_page();
			die();
		}
	}

	public function admin_menu()
	{
		$this->page = \add_menu_page(
			Constants::ADMIN_PAGE_TITLE,
			Constants::ADMIN_MENU_TITLE,
			'access_' . Constants::ADMIN_PAGE_ID,
			Constants::ADMIN_PAGE_ID,
			[$this, 'render_page'],
			'dashicons-smiley',
			1
		);
	}

	public function enqueue_scripts()
	{
		$assets = new ViteAssets(
			Plugin::p_dir('build'),
			Plugin::p_url('build')
		);
		$assets->enqueue('src/index.tsx', [
			'handle' => Constants::SLUG . '-script',
			'script-dependencies' => [
				'wp-element',
				'wp-api-fetch',
				'wp-i18n',
				'wp-html-entities',
				'moment',
			],
		]);
		wp_set_script_translations(
			Constants::SLUG . '-script',
			Constants::TEXTDOMAIN,
			Plugin::p_dir('languages')
		);
	}

	public static function get_instance()
	{
		if (is_null(self::$instance)) {
			self::$instance = new self();
		}
		return self::$instance;
	}
	public function is_current()
	{
		return !empty($_GET['page']) &&
			Constants::ADMIN_PAGE_ID === $_GET['page'];
	}

	public function render_page()
	{
		require __DIR__ . '/view/admin.php';
	}
}
