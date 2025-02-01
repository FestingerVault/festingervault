import version_compare from '@/lib/version_compare';
import { CollectionResponse } from '@/types/api';
import { TThemePluginItem } from '@/types/item';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from '@wordpress/element';
import useApiFetch from './use-api-fetch';

export default function useInstalled() {
	const { data, isFetched, isLoading } =
		useApiFetch<CollectionResponse<TThemePluginItem>>(`update/list`);
	const queryClient = useQueryClient();
	const updateable = useMemo(
		() =>
			data?.data?.filter(
				(item) =>
					version_compare(
						item.version,
						item.installed_version ?? '',
						'gt'
					) === true
			),
		[data?.data]
	);
	const clearCache = useCallback(() => {
		queryClient.invalidateQueries({
			queryKey: ['update/list']
		});
	}, [queryClient]);
	return { list: data?.data, isLoading, isFetched, updateable, clearCache };
}
