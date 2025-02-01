import useApiFetch from '@/hooks/use-api-fetch';
import { __ } from '@/lib/i18n';
import { ItemStatsResponse } from '@/types/item';
import { Drum, Grid2X2, Palette, ToyBrick } from 'lucide-react';
import ItemCard from './item-card';

export default function ItemStats() {
	const { data } = useApiFetch<ItemStatsResponse>('item/stats');
	return (
		<div className="grid grid-cols-2 gap-5 md:grid-cols-2 lg:gap-7">
			<ItemCard
				icon={Grid2X2}
				title={__('Total Products')}
				count={data ? data.total : 0}
			/>
			<ItemCard
				icon={Palette}
				title={__('Total Themes')}
				count={data ? data.themes : 0}
			/>
			<ItemCard
				icon={ToyBrick}
				title={__('Total Plugins')}
				count={data ? data.plugins : 0}
			/>
			<ItemCard
				icon={Drum}
				title={__('Total Kits')}
				count={data ? data.kits : 0}
			/>
		</div>
	);
}
