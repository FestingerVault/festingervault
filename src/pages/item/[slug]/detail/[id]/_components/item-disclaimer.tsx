import { Card, CardContent, CardHeader } from '@/components/ui/card';
import useApiFetch from '@/hooks/use-api-fetch';
import renderHtml from '@/lib/render-html';
import { DisclaimerType } from '@/types/disclaimer';
import { TPostItem } from '@/types/item';
import { __ } from '@wordpress/i18n';
type Props = {
	item: TPostItem;
};
export default function ItemDisclaimer({ item }: Props) {
	const { data } = useApiFetch<DisclaimerType>(
		'disclaimer/get',
		{},
		!!item.copyright === false
	);
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between border-b">
				{__('Legal Disclaimer')}
			</CardHeader>
			<CardContent className="flex flex-row flex-wrap gap-2">
				{renderHtml(item.copyright ?? data?.content)}
			</CardContent>
		</Card>
	);
}
