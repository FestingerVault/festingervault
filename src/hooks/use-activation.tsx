import { store } from '@/components/store';
import { __ } from '@/lib/i18n';
import { ActivationDetailType } from '@/types/license';
import { useQueryClient } from '@tanstack/react-query';
import { useStore } from '@tanstack/react-store';
import { Ban } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import useApiFetch from './use-api-fetch';
import useNotice from './use-notice';

export default function useActivation() {
	const queryClient = useQueryClient();
	const activated = useStore(store, (state) => state.activated);
	const { addNotice, removeNotice } = useNotice();
	const { data, isLoading, isFetching } =
		useApiFetch<ActivationDetailType>(`license/detail`);
	const clearCache = useCallback(() => {
		queryClient.invalidateQueries({
			queryKey: ['license/detail']
		});
	}, [queryClient]);
	useEffect(() => {
		if (data && !isLoading) {
			if (data?.status === 'not-activated') {
				store.setState((state) => ({
					...state,
					activated: false
				}));
				addNotice({
					id: String(data.status),
					icon: Ban,
					type: 'destructive',
					title: __('License not activated'),
					message: __(
						"You have not activated license on this WordPress installation. You won't be able to perform actions like installations, updates."
					)
				});
			} else {
				store.setState((state) => ({
					...state,
					activated: true
				}));
				removeNotice(String(data.status));
			}
		}
	}, [addNotice, data, isLoading, removeNotice]);
	useEffect(() => {
		if (!isLoading) {
			store.setState((state) => ({
				...state,
				license: data
			}));
		}
	}, [data, isLoading]);

	return { activated, data, isLoading, isFetching, clearCache };
}
