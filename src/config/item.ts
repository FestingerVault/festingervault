import { __ } from '@/lib/i18n';
import { EnumItemSlug, EnumItemType } from '@/zod/item';
import { z } from 'zod';

type TItemType = {
	slug: z.infer<typeof EnumItemSlug>;
	type: z.infer<typeof EnumItemType>;
	label: string;
	label_singular: string;
	description: string;
};

export const item_types: Array<TItemType> = [
	{
		slug: 'themes',
		type: 'wordpress-themes',
		label: __('Themes'),
		label_singular: __('Theme'),
		description: __('Tailored Premium WordPress themes')
	},
	{
		slug: 'plugins',
		type: 'wordpress-plugins',
		label: __('Plugins'),
		label_singular: __('Plugin'),
		description: __('Tailored Premium plugins')
	},
	{
		slug: 'template-kits',
		type: 'elementor-template-kits',
		label: __('Template Kits'),
		label_singular: __('Template Kit'),
		description: __('Template Kits')
	}
];
