import { AppPageShell } from '@/components/body/page-shell';
import useApiFetch from '@/hooks/use-api-fetch';
import { __ } from '@/lib/i18n';
import { useParams } from '@/router';
import { HistoryCollectionType } from '@/types/history';
import HistoryItems from './_components/history-items';

export default function Component() {
	const { page } = useParams('/history/:page?');
	const { data, isLoading } = useApiFetch<HistoryCollectionType>(
		'history/list',
		{
			page: Number(page ?? 1)
		}
	);
	return (
		<AppPageShell
			title={__('History')}
			isLoading={isLoading}
		>
			<HistoryItems data={data} />
		</AppPageShell>
	);
}
