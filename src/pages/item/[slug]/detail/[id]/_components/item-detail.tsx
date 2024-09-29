import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { __ } from '@/lib/i18n';
import { TPostItem } from '@/types/item';
import { decodeEntities } from '@wordpress/html-entities';
import moment from 'moment';
import { ReactElement, useMemo } from 'react';

type Props = {
	item: TPostItem;
};
type Row = {
	label: string;
	el: () => React.ReactNode | ReactElement;
	enabled?: boolean;
};
export default function ItemDetail({ item }: Props) {
	const items = useMemo<Row[]>(
		() => [
			{ label: __('Version'), el: () => item.version },
			{ label: __('Slug'), el: () => item.slug },
			{ label: __('Status'), el: () => 'Functional' },
			{
				label: __('Updated'),
				el: () => moment.unix(item.updated).format('MMM D, YYYY')
			},
			{
				label: __('Published'),
				el: () => moment.unix(item.created).format('MMM D, YYYY')
			},
			{
				label: __('Author'),
				el: () =>
					item.terms
						.filter((i) => i.taxonomy === 'item_author')
						.map((i) => decodeEntities(i.name))
						.join(', '),
				enabled:
					item.terms.filter((i) => i.taxonomy === 'item_author')
						.length > 0
			},
			{
				label: __('Columns'),
				el: () =>
					item.terms
						.filter((i) => i.taxonomy === 'columns')
						.map((i) => decodeEntities(i.name))
						.join(', '),
				enabled:
					item.terms.filter((i) => i.taxonomy === 'columns').length >
					0
			},
			{
				label: __('Gutenberg Optimized'),
				el: () =>
					item.terms
						.filter((i) => i.taxonomy === 'gutenberg-optimized')
						.map((i) => decodeEntities(i.name))
						.join(', '),
				enabled:
					item.terms.filter(
						(i) => i.taxonomy === 'gutenberg-optimized'
					).length > 0
			},
			{
				label: __('High Resolution'),
				el: () =>
					item.terms
						.filter((i) => i.taxonomy === 'high-resolution')
						.map((i) => decodeEntities(i.name))
						.join(', '),
				enabled:
					item.terms.filter((i) => i.taxonomy === 'high-resolution')
						.length > 0
			},
			{
				label: __('Widget Ready'),
				el: () =>
					item.terms
						.filter((i) => i.taxonomy === 'widget-ready')
						.map((i) => decodeEntities(i.name))
						.join(', '),
				enabled:
					item.terms.filter((i) => i.taxonomy === 'widget-ready')
						.length > 0
			},
			{
				label: __('Access'),
				el: () => <span className="capitalize">{item.access}</span>
			}
		],
		[item]
	);

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between border-b">
				{__('Details')}
			</CardHeader>
			<CardContent className="space-y-3">
				{items.map(
					({ label, el: Element, enabled }) =>
						enabled !== false && (
							<div
								key={label}
								className="grid grid-cols-3 gap-3 text-sm font-light"
							>
								<div className="col-span-1 text-muted-foreground">
									{label}
								</div>
								<div className="col-span-2">
									<Element />
								</div>
							</div>
						)
				)}
			</CardContent>
		</Card>
	);
}
