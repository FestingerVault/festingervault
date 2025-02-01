import { CollectionResponse } from './api';
import { TDemoContent, TPostItem, TPostMedia } from './item';

export type HistoryItemType = {
	id: number;
	type: 'download' | 'install' | 'update' | 'download_additional';
	media?: TPostMedia & TDemoContent;
	item: TPostItem;
	created: number;
};
export type HistoryCollectionType = CollectionResponse<HistoryItemType>;
