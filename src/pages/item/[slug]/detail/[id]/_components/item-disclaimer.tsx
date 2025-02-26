import { Card, CardContent, CardHeader } from '@/components/ui/card';
import useApiFetch from '@/hooks/use-api-fetch';
import renderHtml from '@/lib/render-html';
import { DisclaimerType } from '@/types/disclaimer';
import { TPostItem } from '@/types/item';
import { __ } from '@wordpress/i18n';
import Linkify from 'linkify-react';

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
			<CardContent className="break-words text-sm">
				<Linkify
					options={{
						target: '_blank',
						rel: 'noopener noreferrer',
						className: 'underline'
					}}
				>
					{renderHtml(item.copyright ?? data?.content)}
				</Linkify>
			</CardContent>
		</Card>
	);
}
