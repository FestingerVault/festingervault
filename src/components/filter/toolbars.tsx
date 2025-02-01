import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import useDataCollection from '@/hooks/use-data-collection';
import { __ } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { SelectLabel } from '@radix-ui/react-select';
import { SortAsc, SortDesc } from 'lucide-react';
import { Button } from '../ui/button';

export type Props = {
	label: string;
	collection: ReturnType<typeof useDataCollection>;
};

export default function FilterToolbar({ label, collection }: Props) {
	return (
		<div className="flex  flex-row flex-wrap items-center gap-4">
			<Select
				value={collection.sorting.order_by}
				onValueChange={(value) =>
					collection.setSort(value, collection.sorting.order)
				}
			>
				<SelectTrigger className="h-9 w-[180px]">
					<SelectValue placeholder={label} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel className="p-2 text-sm text-muted-foreground">
							{__('Order By')}
						</SelectLabel>
						{collection.sort.map((item) => (
							<SelectItem
								key={item.value}
								value={item.value}
							>
								{item.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			<Button
				variant="outline"
				size="icon"
				onClick={() =>
					collection.setSort(
						collection.sorting.order_by,
						collection.sorting.order === 'asc' ? 'desc' : 'asc'
					)
				}
				className="h-9"
			>
				<SortAsc
					className={cn(
						'h-[1.2rem] w-[1.2rem] scale-0 transition-all',
						collection.sorting?.order === 'asc' && 'scale-100'
					)}
				/>
				<SortDesc
					className={cn(
						'absolute h-[1.2rem] w-[1.2rem] scale-0 transition-all',
						collection.sorting?.order !== 'asc' && 'scale-100'
					)}
				/>
			</Button>
		</div>
	);
}
