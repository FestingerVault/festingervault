type NumberedMetaType = {
	current_page: number;
	last_page: number;
	per_page: number;
	total: number;
};
type CursorMetaType = {
	next: string;
	previous: string;
	has_more: boolean;
};
export type TApiError = {
	error: true;
	message: string;
};

export type CollectionResponse<ResponseDataType> = {
	data: ResponseDataType[];
	meta?: NumberedMetaType;
};
export type CursorCollectionResponse<ResponseDataType> = {
	data: ResponseDataType[];
	meta?: CursorMetaType;
};
