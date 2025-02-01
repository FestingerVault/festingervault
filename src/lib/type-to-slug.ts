import { item_types } from '@/config/item';
import { TItemTypeEnum, TItemTypeSlugEnum } from '@/types/item';

export function TypeToItemType(type: TItemTypeEnum) {
	const item_type = item_types.find((i) => i.type === type);
	return item_type;
}
export function SlugToItemType(slug: TItemTypeSlugEnum | string) {
	const item_type = item_types.find((i) => i.slug === slug);
	return item_type;
}
export function TypeToSlug(type: TItemTypeEnum) {
	const item_type = TypeToItemType(type);
	return item_type?.slug;
}
export function SlugToType(slug: TItemTypeSlugEnum) {
	const item_type = SlugToItemType(slug);
	return item_type?.type;
}
