<?php

namespace FestingerVault;

class Constants
{
	const ACTIVATION_KEY = 'vault_activation_key';

	const ADMIN_MENU_TITLE = 'FestingerVault';

	const ADMIN_PAGE_ID = 'festingervault';

	const ADMIN_PAGE_TITLE = 'FestingerVault';

	const DEFAULT_SETTINGS = [
		'autoupdate' => [
			'wordpress-themes' => [],
			'wordpress-plugins' => [],
		],
	];

	const ENGINE_URL = 'https://engine.sovit.top';

	const PLUGIN_DOWNLOAD_URL = 'https://raw.githubusercontent.com/FestingerVault/festingervault/dev-rc/festingervault.zip';

	const PLUGIN_INFO_URL = 'https://raw.githubusercontent.com/FestingerVault/festingervault/dev-rc/info.json';

	const SETTING_KEY = 'vault_settings';
	const AUTOUPDATE_SETTING_KEY = 'vault_autoupdates';

	const SLUG = 'festingervault';

	const TEXTDOMAIN = 'festingervault';
}
