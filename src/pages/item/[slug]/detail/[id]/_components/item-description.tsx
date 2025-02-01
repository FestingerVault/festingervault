import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { __ } from '@/lib/i18n';
import renderHtml from '@/lib/render-html';
import { TPostItem } from '@/types/item';
import DemoContentPreview from './demo-content-preview';

type Props = {
	item: TPostItem;
};
export default function ItemDescription({ item }: Props) {
	return (
		<div className="flex flex-col gap-5 sm:gap-7">
			<Card>
				<CardHeader className="border-b p-5 sm:p-7">
					{__('Description')}
				</CardHeader>
				<CardContent className="item-description p-5 text-sm leading-relaxed sm:p-7">
					{renderHtml(item.summary ?? '')}
				</CardContent>
			</Card>
			{item.additional_content_count &&
			item.additional_content_count > 0 ? (
				<DemoContentPreview item={item} />
			) : null}
		</div>
	);
}
