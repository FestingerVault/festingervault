import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet';
import useDataCollection from '@/hooks/use-data-collection';
import { __ } from '@/lib/i18n';
import { removeEmptyParams } from '@/lib/utils';
import { useCallback, useState } from '@wordpress/element';
import { SlidersHorizontal } from 'lucide-react';
import FilterItemList from './filter-item-list';
type Props = {
	collection: ReturnType<typeof useDataCollection>;
};
export default function FilterSheet({ collection }: Props) {
	const [intentFilter, setIntentFilter] = useState<Record<string, string[]>>(
		collection.filter
	);
	const setFilter = useCallback((key: string, values: string[]) => {
		setIntentFilter((prev) =>
			removeEmptyParams({
				...prev,
				[key]: values
			})
		);
	}, []);
	const openChange = (open: boolean) => {
		if (open === false) {
			setIntentFilter(() => ({}));
		}
	};
	const enabledFilters = collection.options.filter(
		(option) => option.enabled !== false
	);
	return (
		enabledFilters && (
			<Sheet onOpenChange={openChange}>
				<SheetTrigger asChild>
					<Button
						variant="outline"
						className="flex flex-row gap-2"
					>
						{__('Filters')} <SlidersHorizontal size={16} />
					</Button>
				</SheetTrigger>
				<SheetContent className="overflow-y-auto">
					<SheetHeader>
						<SheetTitle>{__('Apply Filters')}</SheetTitle>
						<SheetDescription>
							{__(
								'Select Filters to fine tune your search results.'
							)}
						</SheetDescription>
					</SheetHeader>
					<div className="py-4">
						{collection.options && (
							<Accordion
								type="single"
								collapsible
								defaultValue={enabledFilters[0]?.id}
								className="w-full"
							>
								{enabledFilters.map((option) => {
									return (
										<AccordionItem
											value={option.id}
											key={option.id}
										>
											<AccordionTrigger>
												{option.label} [
												{`${intentFilter[option.id]?.length ?? 0}/${option.options.length}`}
												]
											</AccordionTrigger>
											<AccordionContent>
												<FilterItemList
													collection={collection}
													item={option}
													intent={intentFilter}
													setIntent={setFilter}
												/>
											</AccordionContent>
										</AccordionItem>
									);
								})}
							</Accordion>
						)}
					</div>
					<SheetFooter>
						<SheetClose asChild>
							<Button
								onClick={() => {}}
								variant="secondary"
							>
								{__('Cancel')}
							</Button>
						</SheetClose>
						<SheetClose asChild>
							<Button
								onClick={() => {
									collection.setFilters(intentFilter);
								}}
							>
								{__('Apply Filters')}
							</Button>
						</SheetClose>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		)
	);
}
