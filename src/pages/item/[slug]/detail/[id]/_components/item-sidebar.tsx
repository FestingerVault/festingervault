import { Card, CardContent } from '@/components/ui/card';
import { __ } from '@/lib/i18n';
import { useParams } from '@/router';
import { TPostItem } from '@/types/item';
import millify from 'millify';
import CountUp from 'react-countup';
import ChangelogPreview from './changelog-preview';
import ItemDetail from './item-detail';
import ItemTerms from './item-terms';
import VirusTotalScan from './item-virus-total';
import ItemDisclaimer from './item-disclaimer';

type Props = {
	item: TPostItem;
};
export default function ItemSidebar({ item }: Props) {
	const params = useParams('/item/:slug/detail/:id/:tab?');
	return (
		<div className="flex flex-col gap-5 sm:gap-7">
			<Card>
				<CardContent className="grid grid-cols-2 divide-x text-center">
					<div className="p-2">
						<div className="text-2xl font-semibold">
							<CountUp
								start={0}
								end={item.download_count ?? 0}
								duration={2.75}
								formattingFn={(num) => millify(num)}
							/>
						</div>
						<div className="text-sm text-muted-foreground">
							{__('Downloads')}
						</div>
					</div>
					<div className="p-2">
						<div className="text-2xl">
							<CountUp
								start={0}
								end={item.install_count ?? 0}
								duration={2.75}
								formattingFn={(num) => millify(num)}
							/>
						</div>
						<div className="text-sm text-muted-foreground">
							{__('Installs')}
						</div>
					</div>
				</CardContent>
			</Card>
			<VirusTotalScan item={item} />
			<ItemDisclaimer />
			<ItemDetail item={item} />
			{item.media_count &&
				item.media_count > 0 &&
				params.tab != 'changelog' && <ChangelogPreview item={item} />}
			<ItemTerms
				title={__('Tags')}
				terms={item.terms.filter((i) => i.taxonomy === 'post_tag')}
			/>
			<ItemTerms
				title={__('Browsers')}
				terms={item.terms.filter(
					(i) => i.taxonomy === 'compatible-browser'
				)}
			/>
			<ItemTerms
				title={__('Compatible With')}
				terms={item.terms.filter(
					(i) => i.taxonomy === 'compatible-with'
				)}
			/>
			<ItemTerms
				title={__('Included Files')}
				terms={item.terms.filter(
					(i) => i.taxonomy === 'files-included'
				)}
			/>
			<ItemTerms
				title={__('Software Versions')}
				terms={item.terms.filter(
					(i) => i.taxonomy === 'software-version'
				)}
			/>
		</div>
	);
}
