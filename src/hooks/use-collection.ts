import useApiMutation from '@/hooks/use-api-mutation';
import { __ } from '@/lib/i18n';
import { CollectionResponse, TApiError } from '@/types/api';
import { BookmarkCollectionType } from '@/types/bookmark';
import { TPostItem } from '@/types/item';
import {
	BookmarkItemSchema,
	BookmarkPostCollectionSchema
} from '@/zod/bookmark';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
import { sprintf } from '@wordpress/i18n';
import { toast } from 'sonner';
import { z } from 'zod';
import useActivation from './use-activation';
import useApiFetch from './use-api-fetch';

const ERROR_MESSAGES = {
	MAX_COLLECTION_LIMIT: __('You have reached your max collection limit.'),
	MAX_COLLECTION_ITEMS: __(
		'You have reached your items per collection limit.'
	)
};
export default function useBookmark() {
	const queryClient = useQueryClient();
	const { activated } = useActivation();
	const clearCache = useCallback(() => {
		queryClient.invalidateQueries({
			queryKey: ['collection/list']
		});
		queryClient.invalidateQueries({
			queryKey: ['collection/items']
		});
		queryClient.invalidateQueries({
			queryKey: ['item/list']
		});
		queryClient.invalidateQueries({
			queryKey: ['item/detail']
		});
	}, [queryClient]);
	const { mutateAsync: addItemAsync } = useApiMutation<
		Record<string, string>,
		z.infer<typeof BookmarkItemSchema>,
		TApiError
	>('collection/item/add');
	const { mutateAsync: removeCollectionAsync } = useApiMutation<
		Record<string, string>,
		Pick<z.infer<typeof BookmarkPostCollectionSchema>, 'id'>,
		TApiError
	>('collection/delete');
	const { mutateAsync: addCollectionAsync } = useApiMutation<
		Record<string, string>,
		z.infer<typeof BookmarkPostCollectionSchema>,
		TApiError
	>('collection/add');
	const { data: collections } = useApiFetch<
		CollectionResponse<BookmarkCollectionType>
	>('collection/list', null, activated);
	const addItemToCollection = useCallback(
		(item: TPostItem, collection: BookmarkCollectionType) =>
			new Promise((resolve, reject) => {
				const isAdd =
					item.collections?.includes(collection.id) === false;
				toast.promise(
					addItemAsync({ cid: collection.id, id: Number(item.id) }),
					{
						description: decodeEntities(item.title),
						loading: sprintf(
							isAdd
								? __('Adding to collection %s')
								: __('Removing from collection %s'),
							collection.title
						),
						error: (err: TApiError) => {
							reject(err);
							return ERROR_MESSAGES[err.message]
								? ERROR_MESSAGES[err.message]
								: sprintf(
										isAdd
											? __(
													'Error adding %s to collection'
												)
											: __(
													'Error removing from collection %s'
												),
										collection.title
									);
						},
						success: (data) => {
							clearCache();
							resolve(data);
							return sprintf(
								isAdd
									? __('Added to collection %s')
									: __('Removed from collection %s'),
								collection.title
							);
						}
					}
				);
			}),
		[addItemAsync, clearCache]
	);
	const addNewCollection = useCallback(
		(
			collection: z.infer<typeof BookmarkPostCollectionSchema>,
			update: boolean = false
		) =>
			new Promise((resolve, reject) => {
				const postData =
					BookmarkPostCollectionSchema.safeParse(collection);
				if (postData.success) {
					toast.promise(addCollectionAsync(postData.data), {
						description: update
							? decodeEntities(collection.title)
							: __('Add New Collection'),
						loading: update
							? __('Updating Collection')
							: __('Creating Collection'),
						error: (err: TApiError) => {
							reject(err);
							return ERROR_MESSAGES[err.message]
								? ERROR_MESSAGES[err.message]
								: __('Error');
						},
						success: (data) => {
							clearCache();
							resolve(data);
							return update
								? __('Collection Updated')
								: __('Collection Added');
						}
					});
				}
			}),
		[clearCache, addCollectionAsync]
	);
	const removeCollection = useCallback(
		(collection: z.infer<typeof BookmarkPostCollectionSchema>) =>
			new Promise((resolve, reject) => {
				const postData =
					BookmarkPostCollectionSchema.safeParse(collection);
				if (postData.success) {
					toast.promise(
						removeCollectionAsync({ id: collection.id }),
						{
							description: decodeEntities(collection.title),
							loading: __('Removing Collection'),
							error: (err: TApiError) => {
								reject(err);
								return __('Error Removing Collection');
							},
							success: (data) => {
								clearCache();
								resolve(data);
								return __('Collection Removed');
							}
						}
					);
				}
			}),
		[removeCollectionAsync, clearCache]
	);

	return {
		collections,
		addItemToCollection,
		addNewCollection,
		removeCollection
	};
}
