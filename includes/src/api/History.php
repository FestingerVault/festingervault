<?php

namespace FestingerVault\api;

use FestingerVault\Helper;
use WP_REST_Request;

class History extends ApiBase
{
	/**
	 * @param WP_REST_Request $request
	 * @return mixed
	 */
	public function list(WP_REST_Request $request)
	{
		$page = $request->get_param('page');
		return Helper::engine_post('history/list', [
			'page' => $page,
		]);
	}

	public function endpoints()
	{
		return [
			'list' => [
				'methods' => 'POST',
				'callback' => [$this, 'list'],
			],
		];
	}
}
