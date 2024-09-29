import { AppPageShell } from '@/components/body/page-shell';
import useInstalled from '@/hooks/use-is-installed';
import { __ } from '@/lib/i18n';
import UpdatesTable, {
	UpdatesTableSkeleton
} from './_components/updates-table';
export default function Component() {
	const { list, isLoading } = useInstalled();
	return (
		<AppPageShell
			title={__('Updates')}
			isLoading={isLoading}
			preloader={<UpdatesTableSkeleton />}
			breadcrump={[
				{
					label: __('Updates')
				}
			]}
		>
			{list && <UpdatesTable data={list} />}
		</AppPageShell>
	);
}
