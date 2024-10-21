import { Card, CardContent, CardHeader } from '@/components/ui/card';
import useApiFetch from '@/hooks/use-api-fetch';
import renderHtml from '@/lib/render-html';
import { DisclaimerType } from '@/types/disclaimer';
import { __ } from '@wordpress/i18n';

export default function ItemDisclaimer() {
	const { data } = useApiFetch<DisclaimerType>('disclaimer/get');
	return (
		data && (
			<Card>
				<CardHeader className="flex flex-row items-center justify-between border-b">
					{__('Legal Disclaimer')}
				</CardHeader>
				<CardContent className="flex flex-row flex-wrap gap-2">
					{renderHtml(data.content ?? '')}
				</CardContent>
			</Card>
		)
	);
}
