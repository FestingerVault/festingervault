<?php
namespace FestingerVault\exceptions;
class ItemDownloadDetailException extends \Exception
{
	private $item_id;
	function __construct($item_id)
	{
		$this->item_id = $item_id;
	}
	public function errorMessage()
	{
		$errorMsg =
			'Error on line ' .
			$this->getLine() .
			' in ' .
			$this->getFile() .
			': <b>Error getting download detail for item ' .
			$this->item_id .
			'</b>';
		return $errorMsg;
	}
}
