import { settingSchema } from '@/zod/setting';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { z } from 'zod';
import useApiFetch from './use-api-fetch';

export default function useSetting() {
	const {
		data: setting,
		isFetched,
		isLoading,
		isFetching
	} = useApiFetch<z.infer<typeof settingSchema>>(`setting/get`);
	const queryClient = useQueryClient();

	const clearCache = useCallback(() => {
		queryClient.invalidateQueries({
			queryKey: ['setting/get']
		});
	}, [queryClient]);

	return { setting, isFetched, isLoading, isFetching, clearCache };
}
