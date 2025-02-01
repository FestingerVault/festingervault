<?php

namespace FestingerVault\api;

class Announcement extends ApiBase
{
	public function endpoints()
	{
		return [
			'latest' => [
				'methods' => 'POST',
				'callback' => [$this, 'latest'],
			],
		];
	}

	public function latest(\WP_REST_Request $request)
	{
		$url = 'https://meta.festingervault.com/c/announcements/11.json';
		$key = 'fv_meta_topics';
		$cached = get_transient($key);
		if ($cached) {
			return $cached;
		}
		$request = wp_remote_get($url);
		if (!is_wp_error($request)) {
			$body = json_decode(wp_remote_retrieve_body($request), true);
			$topics = array_slice($body['topic_list']['topics'], 0, 6);
			set_transient($key, $topics, 30 * MINUTE_IN_SECONDS);
			return rest_ensure_response($topics);
		}
		return new \WP_Error(
			400,
			__('Error loading announcements.', 'festingervault')
		);
	}
}
