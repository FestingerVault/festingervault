import { TPostItem } from './item';

export type BookmarkCollectionType = {
	id: number;
	title: string;
	summary: string;
	public: boolean;
	created: number;
	count?: number;
};
export type BookmarkCollectionDetailSchema = {
	id: number;
	page?: number;
};
export type BookmarkCollectionItemType = {
	id: number;
	group?: BookmarkCollectionType;
	post: TPostItem;
};
