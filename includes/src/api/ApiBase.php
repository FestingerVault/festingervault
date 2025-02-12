<?php

namespace FestingerVault\api;

use FestingerVault\Constants;

abstract class ApiBase
{
	public function __construct()
	{
	}

	final function register()
	{
		add_action('rest_api_init', [$this, 'rest_api_init']);
	}

	final public function rest_api_init()
	{
		$route_ns = Constants::SLUG . '/v1/' . $this->prefix();
		foreach ($this->endpoints() as $route => $args) {
			register_rest_route(
				$route_ns,
				$route,
				array_merge(
					[
						'methods' => 'POST',
						'permission_callback' => '__return_true',
					],
					$args,
					[
						'callback' => function (\WP_REST_Request $request) use (
							$args
						) {
							$response = $args['callback']($request);
							$code = 200;
							if (is_wp_error($response)) {
								$code = 400;
								$response = [
									'error' => true,
									'message' => $response->get_error_message(),
								];
							}
							return new \WP_REST_Response($response, $code);
						},
					]
				)
			);
		}
	}
	final public function user_is_adminstrator()
	{
		return current_user_can('administrator');
	}

	final public function user_can_install()
	{
		return current_user_can('install_plugins') &&
			current_user_can('install_themes');
	}

	protected function endpoints()
	{
		return [];
	}

	// override this if you want rest api endpoint prefix be other than the class name itself
	protected function prefix()
	{
		$path = explode('\\', static::class);
		return strtolower(array_pop($path));
	}
}
