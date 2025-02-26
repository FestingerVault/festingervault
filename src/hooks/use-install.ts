import { __ } from '@/lib/i18n';
import VersionCompare from '@/lib/version_compare';
import { useNavigate } from '@/router';
import { TPostItem, TPostMedia } from '@/types/item';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
import { sprintf } from '@wordpress/i18n';
import { toast } from 'sonner';
import useActivation from './use-activation';
import useApiMutation from './use-api-mutation';
import useDownload from './use-download';
import useInstalled from './use-is-installed';

export type PluginInstallResponse = {
	message: string;
	link?: string;
	filename?: string;
};
export type PluginInstallSchema = {
	item_id: number | string;
	method: 'install' | 'update' | 'download' | string;
	path?: string;
	media_id?: number;
	slug?: string;
};

export default function useInstall() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { addDownloadTask } = useDownload();

	const { mutateAsync: installPlugin } = useApiMutation<
		PluginInstallResponse,
		PluginInstallSchema
	>('item/install');
	const { data: activation, can_install, can_download } = useActivation();

	const isInstallable = useCallback(
		(item: TPostItem) => ['theme', 'plugin'].includes(item.type),
		[]
	);
	const { list, clearCache: clearInstalledCache } = useInstalled();
	const isInstalled = useCallback(
		(item: TPostItem) => list?.find((i) => i.id === item.id),
		[list]
	);
	const isNewerVersion = useCallback(
		(item: TPostItem) => {
			const installed = isInstalled(item);
			if (installed) {
				return (
					VersionCompare(
						installed.version,
						installed.installed_version ?? '0.0.0',
						'gt'
					) === true
				);
			}
			return false;
		},
		[isInstalled]
	);
	const isRollBack = useCallback(
		(item: TPostItem, media: TPostMedia) => {
			const installed = isInstalled(item);
			if (installed && media) {
				return (
					VersionCompare(
						installed.installed_version ?? '0.0.0',
						media.version,
						'gt'
					) === true
				);
			}
			return false;
		},
		[isInstalled]
	);
	const clearCache = useCallback(() => {
		clearInstalledCache();
		queryClient.invalidateQueries({
			queryKey: ['license/detail']
		});
		queryClient.invalidateQueries({
			queryKey: ['item/detail']
		});
		queryClient.invalidateQueries({
			queryKey: ['history/list']
		});
	}, [clearInstalledCache, queryClient]);
	const checkActivation = useCallback(() => {
		if (typeof activation?.plan_type == 'undefined') {
			toast.error(__('License not activated'));
			navigate('/activation');
			return false;
		}
		return true;
	}, [activation, navigate]);
	const installItem = useCallback(
		(item: TPostItem, media: TPostMedia) =>
			new Promise<PluginInstallResponse>((resolve, reject) => {
				if (!checkActivation()) {
					reject(__('License not activated'));
				}
				if (!can_install) {
					reject(__('Installation not allowed'));
					toast.error(__('Installation not allowed'));
				}
				const is_rollback = isRollBack(item, media);
				const installed = isInstalled(item);
				const is_new = isNewerVersion(item);
				toast.promise(
					installPlugin({
						item_id: item.id,
						method: installed ? 'update' : 'install',
						media_id: media?.id,
						slug: installed?.slug
					}),
					{
						description: decodeEntities(item.title),
						loading: is_rollback
							? sprintf(
									__('Roll-Back to version %s'),
									media?.version
								)
							: installed
								? is_new
									? __('Updating')
									: __('Re-Installing')
								: __('Installing'),
						success(data) {
							clearCache();
							resolve(data);
							return __('Successful');
						},
						error(err) {
							reject(err);
							return err.message;
						}
					}
				);
			}),
		[
			checkActivation,
			can_install,
			isRollBack,
			isInstalled,
			isNewerVersion,
			installPlugin,
			clearCache
		]
	);
	const downloadItem = useCallback(
		(item: TPostItem, media: TPostMedia) =>
			new Promise<PluginInstallResponse>((resolve, reject) => {
				if (!checkActivation()) {
					reject(__('License not activated'));
				}
				if (!can_download) {
					reject(__('Download not allowed'));
					toast.error(__('Download not allowed'));
				}
				toast.promise(
					installPlugin({
						item_id: item.id,
						method: 'download',
						media_id: media?.id
					}),
					{
						description: decodeEntities(item.title),
						loading: __('Downloading'),
						success(data) {
							clearCache();
							resolve(data);
							if (data.link && data.filename) {
								addDownloadTask(data.link, data.filename);
								return __('Added item to download queue.');
							}
							return __('Error Initiating Download');
						},
						error(err) {
							reject(err);
							return err.message;
						}
					}
				);
			}),
		[
			addDownloadTask,
			can_download,
			checkActivation,
			clearCache,
			installPlugin
		]
	);

	return {
		isInstalled,
		isNewerVersion,
		isInstallable,
		isRollBack,
		installItem,
		downloadItem
	};
}
