import CollectionButton from '@/components/collection-button';
import InstallButton from '@/components/install-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import useActivation from '@/hooks/use-activation';
import useBulk from '@/hooks/use-bulk';
import { __, _x } from '@/lib/i18n';
import placeholder from '@/lib/placeholder';
import { TypeToItemType } from '@/lib/type-to-slug';
import { cn } from '@/lib/utils';
import { TItemAccessLevelEnum, TPostItem, TTerm } from '@/types/item';
import { decodeEntities } from '@wordpress/html-entities';
import { sprintf } from '@wordpress/i18n';
import { Clock, Eye, Info, ShoppingBag } from 'lucide-react';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
export function PostGridItemSkeleton() {
	return (
		<Card>
			<CardHeader className="aspect-video overflow-hidden rounded-t-sm p-0 sm:p-0">
				<Skeleton className="aspect-video rounded-none rounded-t-sm" />
			</CardHeader>
			<CardContent className="mt-4 space-y-2 pb-0">
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-3/4" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-3/4" />
			</CardContent>
		</Card>
	);
}
type Props = {
	item: TPostItem;
};
export default function PostGridItem({ item }: Props) {
	const navigate = useNavigate();
	const { addItem, hasItem, removeItem } = useBulk();
	const { activated, active } = useActivation();

	const item_type = TypeToItemType(item.type);
	return (
		<Card className="group/item flex flex-col justify-between transition-all duration-300">
			<div>
				<CardHeader className="group/image relative aspect-video overflow-hidden rounded-t-sm bg-slate-400 p-0 sm:p-0">
					<Link to={`/item/${item_type?.slug}/detail/${item.id}`}>
						<img
							src={item.image ?? placeholder(item.title)}
							className="aspect-video rounded-t-sm object-cover"
						/>
					</Link>
					{item.version && (
						<Badge
							className={cn([
								'absolute bottom-1 flex items-center gap-1 rounded-sm uppercase transition-opacity group-hover/image:opacity-80',
								'left-1'
							])}
							variant="background"
							title={__('Version')}
						>
							{item.version}
						</Badge>
					)}
					{item.terms
						?.filter((term) => term.taxonomy === 'fv_access_level')
						.map((term: TTerm<TItemAccessLevelEnum>) => (
							<Badge
								key={term.id}
								className={cn([
									'absolute bottom-1 flex items-center gap-1 rounded-sm uppercase transition-opacity',
									'right-1 border-0'
								])}
								variant={term.slug}
							>
								{decodeEntities(term.name)}
							</Badge>
						))}
				</CardHeader>
				<CardContent className="space-y-1">
					<CardTitle className="leading-normal">
						<Link to={`/item/${item_type?.slug}/detail/${item.id}`}>
							{decodeEntities(item.title)}
						</Link>
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
					</CardTitle>
					<CardDescription className="line-clamp-2">
						{sprintf(
							_x('In %s', 'In Category Name'),
							item.terms
								?.filter(
									(term) => term.taxonomy === 'fv_category'
								)
								.map((term) => decodeEntities(term.name))
								.join(', ')
						)}
					</CardDescription>
					<div className="flex items-center gap-2 text-gray-400">
						<div className="flex items-center gap-1 text-xs">
							<Clock width={11} />
							<span>{moment.unix(item.updated).fromNow()}</span>
						</div>
						<div className="flex items-center gap-1 text-xs">
							<Info width={11} /> {item.version}
						</div>
					</div>
				</CardContent>
			</div>
			<CardFooter>
				<div className="flex flex-row items-center gap-2 pt-3">
					<InstallButton item={item} />
					<Button
						variant="outline"
						size="icon"
						className="flex items-center gap-2"
						onClick={() => {
							navigate(
								`/item/${item_type?.slug}/detail/${item.id}`
							);
						}}
					>
						<Eye width={16} />
					</Button>
					<Button
						variant={hasItem(item.id) ? 'secondary' : 'outline'}
						size="icon"
						className="flex items-center gap-2"
						disabled={!activated || !active}
						title={
							hasItem(item.id) === true
								? __('Remove from bulk')
								: __('Add to Bulk')
						}
						onClick={() => {
							if (hasItem(item.id) === true) {
								removeItem(item.id);
							} else {
								addItem({
									id: Number(item.id),
									type: item.type,
									image: item.thumbnail ?? item.image,
									title: item.title,
									version: item.version
								});
							}
						}}
					>
						<ShoppingBag width={16} />
					</Button>
					<CollectionButton
						item={item}
						size="icon"
					></CollectionButton>

					{/* <Button
						variant="outline"
						size="icon"
						className="flex items-center gap-2"
						onClick={() => {
							//navigate(`/item/${item.type}/detail/${item.id}`);
						}}
					>
						<Ellipsis width={16} />
					</Button> */}
				</div>
			</CardFooter>
		</Card>
	);
}
