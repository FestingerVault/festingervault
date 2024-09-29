import { __ } from '@/lib/i18n';
import { z } from 'zod';

export const BookmarkPostCollectionSchema = z.object({
	id: z.number().optional(),
	title: z
		.string()
		.min(1, __('Title cannot be empty'))
		.max(30, __('Title cannot of more than 30 characters')),
	summary: z
		.string()
		.max(90, __('Summary cannot of more than 90 characters'))
		.nullable()
		.optional(),
	public: z.boolean().default(true)
});
export const BookmarkItemSchema = z.object({
	cid: z.number(),
	id: z.number()
});
