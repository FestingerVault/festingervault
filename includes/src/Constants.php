<?php

namespace FestingerVault;

class Constants {
    const ACTION_KEY = "festingervault";

    const ACTIVATION_KEY = "vault_activation_key";

    const ADMIN_MENU_TITLE = "FestingerVault";

    const ADMIN_PAGE_ID = "festingervault";

    const ADMIN_PAGE_TITLE = "FestingerVault";

    const API_SLUG = "festingervault";

    const DEFAULT_SETTINGS = [
        "autoupdate" => [
            "wordpress-themes"  => [],
            "wordpress-plugins" => [],
        ],
    ];

    const ENGINE_URL = "https://engine.festingervault.com";

    const PLUGIN_DOWNLOAD_URL = "https://raw.githubusercontent.com/FestingerVault/festingervault/beta-release/festingervault.zip";

    const PLUGIN_INFO_URL = "https://raw.githubusercontent.com/FestingerVault/festingervault/beta-release/info.json";

    const SETTING_KEY = "vault_settings";

    const TEXTDOMAIN = "festingervault";

    const TYPES = ["theme", "plugin", "kits", "wishlist"];
}
