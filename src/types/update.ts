import { EnumItemType } from '@/zod/item';
import { z } from 'zod';

export type AutoupdatePostSchema = {
	type: Exclude<z.infer<typeof EnumItemType>, 'template-kits'>;
	slug: string;
	enabled: boolean;
};
