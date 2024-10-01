<?php
/*
 * Plugin Name: FestingerVault
 * Plugin URI: https://festingervault.com
 * Description: Imagine going to the forest of themes, buying a theme, and logging out. Now, you come to Festinger's, where we offer 25K+ premium themes and plugins directly from your dashboard.
 * Version: 5.0.0-dev.1.0.1727767560
 * Requires at Least: 6.0
 * Requires PHP: 7.4
 * Author: FestingerVault
 * Author URI: https://festingervault.com
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI: https://festingervault.com
 * Text Domain: festingervault
 * Requires Plugins: action-scheduler
 **/
if (!defined('ABSPATH')) {
	die();
}

if (file_exists(__DIR__ . "/includes/lib/autoload.php")) {
	require_once __DIR__ . "/includes/lib/autoload.php";
	\FestingerVault\Plugin::get_instance(__FILE__);
	\FestingerVault\Upgrade::get_instance(__FILE__);
}
