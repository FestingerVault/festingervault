<?php

namespace FestingerVault\api;

use FestingerVault\Helper;

class Popular extends ApiBase
{
	public function popular_themes(\WP_REST_Request $request)
	{
		return Helper::engine_post('item/popular/themes');
	}

	public function popular_plugins(\WP_REST_Request $request)
	{
		return Helper::engine_post('item/popular/plugins');
	}

	public function endpoints()
	{
		return [
			'theme' => [
				'callback' => [$this, 'popular_themes'],
			],
			'plugin' => [
				'callback' => [$this, 'popular_plugins'],
			],
		];
	}
}
