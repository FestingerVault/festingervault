<?php

namespace FestingerVault\api;

use FestingerVault\Helper;

class Disclaimer extends ApiBase
{
	public function get_disclaimer(\WP_REST_Request $request)
	{
		return Helper::engine_post('disclaimer');
	}

	public function endpoints()
	{
		return [
			'get' => [
				'callback' => [$this, 'get_disclaimer'],
			],
		];
	}
}
