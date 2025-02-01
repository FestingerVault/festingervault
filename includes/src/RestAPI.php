<?php

namespace FestingerVault;

use FestingerVault\api\{
	Announcement,
	ApiBase,
	Collection,
	Disclaimer,
	History,
	Item,
	License,
	Popular,
	Setting,
	Update
};

class RestAPI
{
	/**
	 * @var mixed
	 */
	private static $instance = null;

	function __construct()
	{
		$this->register(new License());
		$this->register(new Item());
		$this->register(new Update());
		$this->register(new Setting());
		$this->register(new Announcement());
		$this->register(new History());
		$this->register(new Collection());
		$this->register(new Popular());
		$this->register(new Disclaimer());
	}

	public static function get_instance()
	{
		if (is_null(self::$instance)) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * @param ApiBase $instance
	 */
	function register(ApiBase $instance)
	{
		$instance->register();
	}
}
