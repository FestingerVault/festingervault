<?php

namespace FestingerVault\api;

use FestingerVault\Helper;

class Collection extends ApiBase
{
	function list_collection(\WP_REST_Request $request)
	{
		return Helper::engine_post('collection/list', [
			'page' => $request->get_param('page'),
		]);
	}
	function list_items(\WP_REST_Request $request)
	{
		return Helper::engine_post('collection/items', [
			'id' => $request->get_param('id'),
			'page' => $request->get_param('page') ?? 1,
		]);
	}
	function collection_detail(\WP_REST_Request $request)
	{
		return Helper::engine_post('collection/detail', [
			'id' => $request->get_param('id'),
		]);
	}
	function collection_delete(\WP_REST_Request $request)
	{
		return Helper::engine_post('collection/delete', [
			'id' => $request->get_param('id'),
		]);
	}
	function add_collection(\WP_REST_Request $request)
	{
		return Helper::engine_post('collection/add', [
			'id' => $request->get_param('id'),
			'public' => $request->get_param('public'),
			'title' => $request->get_param('title'),
			'summary' => $request->get_param('summary'),
		]);
	}
	function add_item(\WP_REST_Request $request)
	{
		return Helper::engine_post('collection/item/add', [
			'group_id' => $request->get_param('cid'),
			'item_id' => $request->get_param('id'),
		]);
	}

	public function endpoints()
	{
		return [
			'list' => [
				'methods' => 'POST',
				'callback' => [$this, 'list_collection'],
			],
			'detail' => [
				'callback' => [$this, 'collection_detail'],
			],
			'delete' => [
				'callback' => [$this, 'collection_delete'],
			],
			'add' => [
				'callback' => [$this, 'add_collection'],
			],
			'items' => [
				'callback' => [$this, 'list_items'],
			],
			'item/add' => [
				'callback' => [$this, 'add_item'],
			],
		];
	}
}
