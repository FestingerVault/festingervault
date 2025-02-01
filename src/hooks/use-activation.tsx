import { __ } from '@/lib/i18n';
import { TActivationDetail } from '@/types/license';
import { useQueryClient } from '@tanstack/react-query';
import { Ban } from 'lucide-react';
import { useCallback, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import useApiFetch from './use-api-fetch';
import useApiMutation from './use-api-mutation';
import useNotice from './use-notice';

export default function useActivation() {
	const queryClient = useQueryClient();
	const { addNotice, removeNotice, flushNotice } = useNotice();
	const { data, isLoading, isFetching } =
		useApiFetch<TActivationDetail>(`license/detail`);
	const { isPending: isDeactivatePending, mutateAsync: deactivateAsync } =
		useApiMutation('license/deactivate');

	const clearCache = useCallback(() => {
		queryClient.invalidateQueries({
			queryKey: ['license/detail']
		});
	}, [queryClient]);
	const deactivate = useCallback(() => {
		toast.promise(deactivateAsync({}), {
			loading: __('Deactivating License'),
			success: __('License Deactivated Successfully'),
			error: __('Error Deactivating License'),
			finally() {
				queryClient.invalidateQueries({ queryKey: ['license/detail'] });
			}
		});
	}, [deactivateAsync, queryClient]);
	const activated = useMemo(() => data?.status !== 'not-activated', [data]);
	const active = useMemo(() => data?.status === 'active', [data]);
	const statusToNotice = useMemo(
		() => ({
			'not-activated': {
				icon: Ban,
				type: 'destructive',
				title: __('License not activated'),
				message: __(
					"You have not activated license on this installation. You won't be able to perform actions like installations, updates."
				)
			},
			'license-suspended': {
				icon: Ban,
				type: 'destructive',
				title: __('License Suspended'),
				message:
					data?.reason ??
					__(
						"Your license has been suspended. You won't be able to perform actions like installations, updates."
					)
			},
			'activation-suspended': {
				icon: Ban,
				type: 'destructive',
				title: __('Activation Suspended'),
				message:
					data?.reason ??
					__(
						"This domain activation has been suspended. You won't be able to perform actions like installations, updates."
					)
			},
			'domain-blocked': {
				icon: Ban,
				type: 'destructive',
				title: __('Domain Blocked'),
				message:
					data?.reason ??
					__(
						"This domain has been blocked. You won't be able to perform actions like installations, updates."
					)
			}
		}),
		[data]
	);
	useEffect(() => {
		if (data && !isLoading) {
			if (data?.status === 'not-activated') {
				addNotice({
					id: 'activation-status',
					icon: Ban,
					type: 'destructive',
					title: __('License not activated'),
					message: __(
						"You have not activated license on this installation. You won't be able to perform actions like installations, updates."
					)
				});
			} else {
				if (statusToNotice[data?.status] && data?.status !== 'active') {
					addNotice({
						...statusToNotice[data?.status],
						id: 'activation-status'
					});
				} else {
					removeNotice('activation-status');
				}
			}
		}
	}, [addNotice, data, flushNotice, isLoading, removeNotice, statusToNotice]);

	return {
		activated,
		active,
		data,
		isLoading,
		isFetching,
		clearCache,
		deactivate,
		isDeactivatePending
	};
}
