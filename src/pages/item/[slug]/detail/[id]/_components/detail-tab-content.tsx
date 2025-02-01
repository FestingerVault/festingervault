import { __ } from '@/lib/i18n';
import { useParams } from '@/router';
import { TPostItem } from '@/types/item';
import { DetailTabType } from '../-[tab]';

type Props = {
	item: TPostItem;
	tabs: DetailTabType;
};
export default function DetailTabContent({ tabs }: Props) {
	const params = useParams('/item/:slug/detail/:id/:tab?');
	const active =
		tabs.find((tab) => tab.id === params.tab)?.id ?? 'description';
	const tab = tabs.find((tab) => tab.id === active);
	const Component = tab?.el ?? (() => <div>{__('Invalid Tab?')}</div>);
	return <Component />;
}
