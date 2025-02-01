import { __ } from '@/lib/i18n';

export const ActivationStatusToString = {
	active: __('Active'),
	inactive: __('Inactive'),
	expired: __('Expired'),
	'license-suspended': __('Suspended'),
	'activation-suspended': __('Suspended'),
	'domain-blocked': __('Blocked')
};
