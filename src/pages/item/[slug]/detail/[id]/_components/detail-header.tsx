import { Grid } from '@/components/ui/grid';
import { Skeleton } from '@/components/ui/skeleton';
import { __, _x } from '@/lib/i18n';
import placeholder from '@/lib/placeholder';
import { TPostItem } from '@/types/item';
import { decodeEntities } from '@wordpress/html-entities';
import { sprintf } from '@wordpress/i18n';
import { Calendar, CheckCircle2 } from 'lucide-react';
import moment from 'moment';
export function ItemDetailHeaderSkeleton() {
	return (
		<div className="relative flex flex-col items-center gap-3 p-6 py-12">
			<Grid size={50} />
			<div>
				<Skeleton className="aspect-video h-52 rounded-md" />
			</div>
			<Skeleton className="h-5 w-52" />
		</div>
	);
}
type Props = {
	item: TPostItem;
};
export default function ItemDetailHeader({ item }: Props) {
	return (
		<div className="relative flex flex-col items-center gap-3 p-6 py-12">
			<Grid size={50} />
			<div>
				<img
					src={item.image ?? placeholder(item.title)}
					className="aspect-video h-52 rounded-md"
				/>
			</div>
			<h1 className="text-xl">{decodeEntities(item.title)}</h1>
			{item.is_forked && item.product_url != '' && (
				<div className="space-x-1 text-sm text-muted-foreground">
					<span>{__('Forked From')}</span>
					<a
						href={item.product_url}
						className="text-foreground"
						target="_blank"
						rel="noreferrer"
					>
						{decodeEntities(item.original_title)}
					</a>
				</div>
			)}
			<div className="flex flex-row gap-5 text-sm text-muted-foreground">
				<div className="">
					{sprintf(
						_x('In %s', 'In Category Name'),
						item.terms
							?.filter((term) => term.taxonomy === 'fv_category')
							.map((term) => decodeEntities(term.name))
							.join(', ')
					)}
				</div>
				<div className="flex flex-row items-center gap-1 text-green-600">
					{moment
						.unix(item.updated)
						.isBefore(moment().add(1, 'week')) ? (
						<>
							<CheckCircle2 size={18} />{' '}
							<span>{__('Recently Updated')}</span>
						</>
					) : (
						<>
							<Calendar size={18} />
							<span>{moment.unix(item.updated).fromNow()}</span>
						</>
					)}
				</div>
				{item.additional_content_count &&
				item.additional_content_count > 0 ? (
					<div className="flex flex-row items-center gap-1 text-green-600">
						<CheckCircle2 size={18} />
						<span>{__('Demo Included')}</span>
					</div>
				) : null}
			</div>
		</div>
	);
}
