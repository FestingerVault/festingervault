import Paging from '@/components/paging';
import SimpleTable, { SimpleColumnDef } from '@/components/table/simple-table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { __ } from '@/lib/i18n';
import { Link } from '@/router';
import { HistoryCollectionType, HistoryItemType } from '@/types/history';
import { useMemo } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
import moment from 'moment';

type Props = {
	data: HistoryCollectionType;
};
export default function HistoryItems({ data }: Props) {
	const columns = useMemo<SimpleColumnDef<HistoryItemType>[]>(
		() => [
			{
				id: 'title',
				label: __('Title'),
				className: 'w-full whitespace-nowrap text-muted-foreground',
				render({ row }) {
					return (
						<Link
							to="/item/:slug/detail/:id/:tab?"
							params={{ id: row.item.id, slug: row.item?.type }}
							className="flex flex-col gap-2"
						>
							<span>{decodeEntities(row?.item?.title)}</span>
							{row.type === 'download_additional' && (
								<span className="text-xs">
									{row.media?.title}
								</span>
							)}
						</Link>
					);
				}
			},
			{
				id: 'type',
				label: __('Type'),
				render({ row }) {
					return (
						<Badge
							variant="bronze"
							className="uppercase"
						>
							{row.type?.replace('_', ' ')}
						</Badge>
					);
				}
			},
			{
				id: 'date',
				label: __('Date'),
				className: 'whitespace-nowrap text-muted-foreground',
				render({ row }) {
					return moment
						.unix(row.created)
						.format('DD MMM, YYYY HH:mm a');
				}
			},
			{
				id: 'version',
				label: __('Version'),
				className: 'whitespace-nowrap text-muted-foreground',
				render({ row }) {
					return row?.media?.version ?? row?.item?.version;
				}
			}
		],
		[]
	);
	return (
		<Card>
			<CardContent>
				<div className="flex flex-col gap-7">
					<SimpleTable
						columns={columns}
						data={data?.data}
					/>
					{data?.meta && (
						<Paging
							currentPage={data?.meta.current_page}
							totalPages={Number(data?.meta?.last_page)}
							urlGenerator={(_page: number) =>
								`/history/${_page}`
							}
						/>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
