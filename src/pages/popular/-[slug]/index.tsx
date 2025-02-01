import { AppPageShell } from '@/components/body/page-shell';
import useApiFetch from '@/hooks/use-api-fetch';
import { _x } from '@/lib/i18n';
import { SlugToItemType } from '@/lib/type-to-slug';
import { cn } from '@/lib/utils';
import PostGridItem from '@/pages/item/[slug]/-[page]/_components/PostGridItem';
import { useParams } from '@/router';
import { TPostItemCollection } from '@/types/item';
import { EnumItemSlug } from '@/zod/item';
import { sprintf } from '@wordpress/i18n';

export default function Component() {
	const { slug: _slug } = useParams('/popular/:slug?');
	const slug = EnumItemSlug.exclude(['template-kit'])
		.default('theme')
		.parse(_slug);
	const item_type = SlugToItemType(slug);
	const { data, isLoading, isFetching } = useApiFetch<TPostItemCollection>(
		`popular/${item_type.slug}`
	);
	return (
		<AppPageShell
			title={sprintf(
				_x('Popular %s', 'Popular Themes/Poluar Plugins'),
				item_type.label
			)}
			isLoading={isLoading}
			isFetching={isFetching}
			breadcrump={[
				{
					label: sprintf(
						_x('Popular %s', 'Popular Themes/Poluar Plugins'),
						item_type.label
					)
				}
			]}
		>
			<div
				className={cn([
					'grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-7'
				])}
			>
				{data &&
					data.data.map((item) => (
						<PostGridItem
							key={item.id}
							item={item}
						/>
					))}
			</div>
		</AppPageShell>
	);
}
