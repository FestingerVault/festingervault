<?php

namespace FestingerVault\api;

use FestingerVault\Helper;

class History extends ApiBase
{
	/**
	 * @param \WP_REST_Request $request
	 * @return mixed
	 */
	public function list(\WP_REST_Request $request)
	{
		$page = $request->get_param('page');
		return Helper::engine_post('history/list', [
			'page' => $page ?? 1,
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
