import { AppPageShell } from '@/components/body/page-shell';
import FilterBar from '@/components/filter/filter-bar';
import Paging from '@/components/paging';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import useApiFetch from '@/hooks/use-api-fetch';
import useDataCollection, { FilterOption } from '@/hooks/use-data-collection';
import { __ } from '@/lib/i18n';
import { SlugToItemType } from '@/lib/type-to-slug';
import { cn } from '@/lib/utils';
import PostGridItem, {
	PostGridItemSkeleton
} from '@/pages/item/[slug]/-[page]/_components/PostGridItem';
import { useParams } from '@/router';
import { TPostItem, TPostItemCollection } from '@/types/item';
import { EnumItemSlug } from '@/zod/item';
import { decodeEntities } from '@wordpress/html-entities';
import { sprintf } from '@wordpress/i18n';
import { SearchX } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const sort_items: ReturnType<typeof useDataCollection>['sort'] = [
	{
		label: __('Updated'),
		value: 'updated'
	},
	{
		label: __('Title'),
		value: 'title'
	},
	{
		label: __('Popularity'),
		value: 'popularity'
	}
];
const path = '/item/:slug/:page?';
const paramsSchema = z.object({
	slug: EnumItemSlug.default('themes'),
	page: z.coerce.number().default(1)
});
function NoSearchResultFound() {
	const params = useParams(path);
	return (
		<Card className="col-span-1  md:col-span-3">
			<div className="flex flex-col items-center gap-4 px-4 py-10 sm:px-6">
				<div>
					<SearchX size={48} />
				</div>
				<div className="text-center text-sm italic text-muted-foreground">
					{__(
						"We couldn't find the item you're looking for, you can make a wish request"
					)}
				</div>
				<Button
					asChild
					variant="outline"
				>
					<Link to={`/requests?type=${params.slug}`}>
						{__('Add Request')}
					</Link>
				</Button>
			</div>
		</Card>
	);
}
export default function Component() {
	const params = paramsSchema.safeParse(useParams(path));
	if (params.error) {
		throw Error('Invalid Item Type');
	}
	const item_type = SlugToItemType(params.data.slug);
	const type = item_type.type;
	const page = params.data.page;
	const { data: terms, isLoading: isCategoriesLoading } = useApiFetch<
		TPostItem['terms']
	>('item/terms', {
		type
	});
	const filters = useMemo<FilterOption[]>(
		() =>
			terms
				? [
						{
							id: 'category',
							label: __('Category'),
							enabled: item_type.slug != 'template-kits',
							onBarView: true,
							isMulti: true,
							showAll: true,
							options: terms
								?.filter((i) => i.taxonomy === 'category')
								.sort((a, b) => a.slug.localeCompare(b.slug))
								.map((i) => ({
									label: decodeEntities(i.name),
									value: i.slug
								}))
						},
						{
							id: 'post_tag',
							label: __('Tag'),
							isMulti: true,
							options: terms
								?.filter((i) => i.taxonomy === 'post_tag')
								.sort((a, b) => a.slug.localeCompare(b.slug))
								.map((i) => ({
									label: decodeEntities(i.name),
									value: i.slug
								}))
						},
						{
							id: 'widget-ready',
							label: __('Widget Ready'),
							enabled: item_type.slug != 'template-kits',
							isMulti: false,
							options: terms
								?.filter((i) => i.taxonomy === 'widget-ready')
								.sort((a, b) => a.slug.localeCompare(b.slug))
								.map((i) => ({
									label: decodeEntities(i.name),
									value: i.slug
								}))
						},
						{
							id: 'compatible-with',
							label: __('Compatible With'),
							isMulti: false,
							options: terms
								?.filter(
									(i) => i.taxonomy === 'compatible-with'
								)
								.sort((a, b) => a.slug.localeCompare(b.slug))
								.map((i) => ({
									label: decodeEntities(i.name),
									value: i.slug
								}))
						},
						{
							id: 'files-included',
							label: __('Files Included'),
							enabled: item_type.slug != 'template-kits',
							isMulti: false,
							options: terms
								?.filter((i) => i.taxonomy === 'files-included')
								.sort((a, b) => a.slug.localeCompare(b.slug))
								.map((i) => ({
									label: decodeEntities(i.name),
									value: i.slug
								}))
						},
						{
							id: 'software-version',
							label: __('Software Versions'),
							isMulti: false,
							options: terms
								?.filter(
									(i) => i.taxonomy === 'software-version'
								)
								.sort((a, b) => a.slug.localeCompare(b.slug))
								.map((i) => ({
									label: decodeEntities(i.name),
									value: i.slug
								}))
						},
						{
							id: 'level',
							label: __('Access'),
							isMulti: true,
							onBarView: true,
							options: [
								{
									label: __('Bronze'),
									value: 'bronze'
								},
								{
									label: __('Silver'),
									value: 'silver'
								},
								{
									label: __('Gold'),
									value: 'gold'
								}
							]
						},
						{
							id: 'add_content',
							label: __('Additional Content'),
							isMulti: false,
							enabled: item_type.slug != 'template-kits',
							options: [
								{
									label: 'Yes',
									value: 'yes'
								},
								{
									label: 'No',
									value: 'no'
								}
							]
						}
					]
				: [],
		[terms, item_type]
	);
	const dataCollection = useDataCollection({
		options: filters,
		path: path,
		sort: sort_items
	});
	const {
		data,
		isLoading: isItemsLoading,
		isFetching
	} = useApiFetch<TPostItemCollection>('item/list', {
		type,
		page,
		filter: dataCollection.filter,
		sort: dataCollection.sorting,
		keyword: dataCollection.search?.keyword,
		per_page: Number(dataCollection.pagination?.per_page)
	});
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}, [data]);
	return (
		<AppPageShell
			title={item_type?.label}
			description={item_type?.description}
			isFetching={isFetching}
			isLoading={isItemsLoading || isCategoriesLoading}
			preloader={
				<div className="grid grid-cols-1 md:grid-cols-3">
					<PostGridItemSkeleton />
				</div>
			}
			breadcrump={[
				{
					label: item_type?.label,
					href: `/item/${type}`
				},
				{
					label: sprintf(__('Page %d'), Number(page))
				}
			]}
		>
			{data && (
				<>
					<FilterBar collection={dataCollection} />

					<div
						className={cn([
							'grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-7'
						])}
					>
						{data.data.length > 0 ? (
							data.data.map((item) => (
								<PostGridItem
									key={item.id}
									item={item}
								/>
							))
						) : (
							<NoSearchResultFound />
						)}
					</div>
					{data.meta && (
						<Paging
							currentPage={Number(page)}
							totalPages={data.meta?.last_page}
							urlGenerator={(_page: number) =>
								`/item/${item_type.slug}/${_page}?${dataCollection?.searchParams}`
							}
						/>
					)}
				</>
			)}
		</AppPageShell>
	);
}
