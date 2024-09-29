import { __ } from '@/lib/i18n';
import { z } from 'zod';

export const EnumAccessLevel = z.enum(['gold', 'bronze', 'silver']);

export const EnumItemType = z.enum(
	['wordpress-themes', 'wordpress-plugins', 'elementor-template-kits'],
	{
		message: __('Unknown Item Type')
	}
);

export const EnumItemSlug = z.enum(['themes', 'plugins', 'template-kits'], {
	message: __('Unknown Item Slug')
});
