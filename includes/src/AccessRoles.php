<?php
namespace FestingerVault;

class AccessRoles
{
    /**
     * @var static
     */
    private static $instance = null;

    public function __construct()
    {
        add_action('init', [$this, 'capability']);
    }

    public function capability()
    {
        $capability = 'access_' . Constants::ADMIN_PAGE_ID;

        $cache_key = Constants::SLUG . '_roles_cache';
        $license_detail = get_transient($cache_key);
        if (!$license_detail) {
            $license_detail = Helper::engine_post('license/activations');
            if (!is_wp_error($license_detail)) {
                set_transient(
                    $cache_key,
                    $license_detail,
                    30 * MINUTE_IN_SECONDS
                );
            }
        }
        $roles = ['administrator' => true];
        if (!is_wp_error($license_detail) && !empty($license_detail['roles'])) {
            $settings = get_option(
                Constants::SETTING_KEY,
                Constants::DEFAULT_SETTINGS
            );
            $enabled_roles =
            isset($settings['roles']) && is_array($settings['roles'])
            ? $settings['roles']
            : [];

            foreach (Helper::get_roles() as $role => $label) {
                $roles[$role] = in_array($role, $enabled_roles, true);
            }
        }
        foreach ($roles as $role_name => $should_have_cap) {
            $role = get_role($role_name);
            if ($role) {
                $has_cap = $role->has_cap($capability);

                if ($should_have_cap && !$has_cap) {
                    $role->add_cap($capability, true);
                } elseif (!$should_have_cap && $has_cap) {
                    $role->remove_cap($capability);
                }
            }
        }
    }

    public static function get_instance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }
}
