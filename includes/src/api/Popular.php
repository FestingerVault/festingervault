<?php

namespace FestingerVault\api;

use FestingerVault\Helper;
use WP_REST_Request;

class Popular extends ApiBase
{
	public function popular_themes(WP_REST_Request $request)
	{
		return Helper::engine_post('item/popular/themes');
	}

	public function popular_plugins(WP_REST_Request $request)
	{
		return Helper::engine_post('item/popular/plugins');
	}

	public function endpoints()
	{
		return [
			'themes' => [
				'callback' => [$this, 'popular_themes'],
			],
			'plugins' => [
				'callback' => [$this, 'popular_plugins'],
			],
		];
	}
}
