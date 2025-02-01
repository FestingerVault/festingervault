import { DataTable } from '@/components/data-table';
import { BulkActionType } from '@/components/data-table-bulk-action';
import { Skeleton } from '@/components/ui/skeleton';
import useActivation from '@/hooks/use-activation';
import useApiMutation from '@/hooks/use-api-mutation';
import useAutoUpdate from '@/hooks/use-auto-update';
import { useDataTable } from '@/hooks/use-data-table';
import {
	PluginInstallResponse,
	PluginInstallSchema
} from '@/hooks/use-install';
import useInstalled from '@/hooks/use-is-installed';
import useTaskQueue from '@/hooks/use-task-queue';
import { __ } from '@/lib/i18n';
import { TApiError } from '@/types/api';
import {
	DataTableFilterableColumn,
	DataTableSearchableColumn
} from '@/types/data-table';
import { TThemePluginItem } from '@/types/item';
import { ColumnDef } from '@tanstack/react-table';
import { useCallback, useMemo } from '@wordpress/element';
import { toast } from 'sonner';
import { getColumns } from './columns';

const filterableColumns: DataTableFilterableColumn<TThemePluginItem>[] = [
	{
		id: 'type',
		title: __('Type'),
		options: [
			{
				label: __('Themes'),
				value: 'themes'
			},
			{
				label: __('Plugins'),
				value: 'plugins'
			}
		]
	}
];
const searchableColumns: DataTableSearchableColumn<TThemePluginItem>[] = [
	{ id: 'title', placeholder: __('Search downloads...') }
];
type UpdateTableProps = {
	data: TThemePluginItem[];
};
export function UpdatesTableSkeleton() {
	return (
		<div className="space-y-4">
			<Skeleton className="h-8 w-[150px] lg:w-[250px]" />
			<Skeleton className="h-64 w-full" />
		</div>
	);
}

export default function UpdatesTable({ data }: UpdateTableProps) {
	const { mutateAsync: installPlugin } = useApiMutation<
		PluginInstallResponse,
		PluginInstallSchema
	>('item/install');
	const { changeStatus } = useAutoUpdate();
	const { clearCache } = useInstalled();
	const { addTask } = useTaskQueue();
	const { activated, active } = useActivation();
	const ifCanDoBulkAction = useCallback(() => {
		return new Promise((resolve, reject) => {
			if (!activated) {
				toast.error(__('License not activated'));
				reject(__('License not activated'));
			} else if (!active) {
				toast.error(__('License suspended'));
				reject(__('License suspended'));
			} else {
				resolve('yes');
			}
		});
	}, [activated, active]);
	const bulkActions: BulkActionType<TThemePluginItem>[] = [
		{
			id: 'update',
			label: __('Update'),
			action: async (items) => {
				ifCanDoBulkAction().then(() => {
					items.forEach(({ original: item }) => {
						addTask(() => {
							return new Promise((resolve, reject) => {
								toast.promise(
									installPlugin({
										item_id: item.id,
										method: 'update'
									}),
									{
										description: item.title,
										loading: __('Updating'),
										success(data) {
											resolve(data);
											clearCache();
											return __('Success');
										},
										error(err: TApiError) {
											reject(err);
											return err.message ?? __('Error');
										}
									}
								);
							});
						});
					});
				});
			}
		},
		{
			id: 'reinstall',
			label: __('Re-Install'),
			action: (items) => {
				ifCanDoBulkAction().then(() => {
					items.forEach(({ original: item }) => {
						addTask(() => {
							return new Promise((resolve, reject) => {
								toast.promise(
									installPlugin({
										item_id: item.id,
										method: 'install'
									}),
									{
										description: item.title,
										loading: __('Re-installing'),
										success() {
											resolve(item);
											clearCache();
											return __('Re-Install Success');
										},
										error(err) {
											reject(err);
											return (
												err.message ??
												__('Error Installing')
											);
										}
									}
								);
							});
						});
					});
				});
			}
		},
		{
			id: 'autoupdate',
			label: __('Enable Auto-Update'),
			action: (items) => {
				ifCanDoBulkAction().then(() => {
					items.forEach(({ original: item }) => {
						addTask(() => {
							return changeStatus(item, true);
						});
					});
				});
			}
		},
		{
			id: 'disable-autoupdate',
			label: __('Disable Auto-Update'),
			action: (items) => {
				ifCanDoBulkAction().then(() => {
					items.forEach(({ original: item }) => {
						addTask(() => {
							return changeStatus(item, false);
						});
					});
				});
			}
		}
	];
	const columns = useMemo<ColumnDef<TThemePluginItem, unknown>[]>(
		() => getColumns(),
		[]
	);
	const { table } = useDataTable({
		data: data,
		columns
	});
	return (
		<DataTable
			table={table}
			columns={columns}
			searchableColumns={searchableColumns}
			filterableColumns={filterableColumns}
			bulkActions={bulkActions}
		/>
	);
}
