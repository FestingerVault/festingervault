import { __ } from '@/lib/i18n';
import { TThemePluginItem } from '@/types/item';
import { AutoupdatePostSchema } from '@/types/update';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
import { toast } from 'sonner';
import useActivation from './use-activation';
import useApiFetch from './use-api-fetch';
import useApiMutation from './use-api-mutation';
type SettingType = {
	themes?: string[];
	plugins?: string[];
};
export default function useAutoUpdate() {
	const {
		data: setting,
		isFetched,
		isLoading,
		isFetching
	} = useApiFetch<SettingType>(`update/setting/get`);
	const queryClient = useQueryClient();

	const clearCache = useCallback(() => {
		queryClient.invalidateQueries({
			queryKey: ['update/setting/get']
		});
	}, [queryClient]);
	const { activated, active } = useActivation();
	const { isPending: isPendingUpdate, mutateAsync: autoupdatePromise } =
		useApiMutation<never, AutoupdatePostSchema>('update/update-autoupdate');
	const changeStatus = useCallback(
		(item: TThemePluginItem, enabled: boolean = false) =>
			new Promise((resolve, reject) => {
				if (!activated) {
					toast.error(__('License not activated'), {
						description: decodeEntities(item.title)
					});
					return;
				}
				if (!active) {
					toast.error(__('License suspended'), {
						description: decodeEntities(item.title)
					});
					return;
				}
				toast.promise(
					autoupdatePromise({
						type: item.type,
						slug: item.slug,
						enabled: enabled
					}),
					{
						description: decodeEntities(item.title),
						loading: __('Updating Autoupdate setting'),
						success(data) {
							clearCache();
							resolve(data);
							return enabled
								? __('Autoupdate Enabled')
								: __('Autoupdate Disabled');
						},
						error: (err) => {
							reject(err);
							return __('Something went wrong. Try again later');
						}
					}
				);
			}),
		[activated, active, autoupdatePromise, clearCache]
	);
	return {
		setting,
		isFetched,
		isLoading: isLoading || isPendingUpdate,
		isFetching,
		clearCache,
		changeStatus
	};
}
