import useActivation from '@/hooks/use-activation';
import useBulk from '@/hooks/use-bulk';
import { __ } from '@/lib/i18n';
import { TPostItem } from '@/types/item';
import { ShoppingBag } from 'lucide-react';
import { Button, ButtonProps } from './ui/button';

type Props = {
	item: TPostItem;
} & ButtonProps;

export default function BulkButton({ item }: Props) {
	const { addItem, hasItem, removeItem } = useBulk();
	const { activated, active, can_bulk_download, can_bulk_install } =
		useActivation();

	return (
		(can_bulk_download || can_bulk_install) && (
			<Button
				variant={hasItem(item.id) ? 'secondary' : 'outline'}
				size="icon"
				className="flex items-center gap-2"
				disabled={!activated || !active}
				title={
					hasItem(item.id) === true
						? __('Remove from bulk')
						: __('Add to Bulk')
				}
				onClick={() => {
					if (hasItem(item.id) === true) {
						removeItem(item.id);
					} else {
						addItem({
							id: Number(item.id),
							type: item.type,
							image: item.thumbnail ?? item.image,
							title: item.title,
							version: item.version
						});
					}
				}}
			>
				<ShoppingBag width={16} />
			</Button>
		)
	);
}
