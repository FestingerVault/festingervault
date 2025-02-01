import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover';
import useDataCollection from '@/hooks/use-data-collection';
import { __, _x } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { sprintf } from '@wordpress/i18n';
import { CheckIcon } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

export type FilterItemProps = {
	collection: ReturnType<typeof useDataCollection>;
	item: ReturnType<typeof useDataCollection>['options'][0];
};
export default function FilterItem({ item, collection }: FilterItemProps) {
	const selectedValues = new Set<string>(collection.filter[item.id]);
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="h-9 border-dashed"
				>
					<PlusCircledIcon className="mr-2 h-4 w-4" />
					{item.label}
					{selectedValues?.size > 0 && (
						<>
							<Separator
								orientation="vertical"
								className="mx-2 h-4"
							/>
							<Badge
								variant="secondary"
								className="rounded-sm px-1 font-normal lg:hidden"
							>
								{selectedValues.size}
							</Badge>
							<div className="hidden space-x-1 lg:flex">
								{selectedValues.size > 2 ? (
									<Badge
										variant="secondary"
										className="rounded-sm px-1 font-normal"
									>
										{sprintf(
											_x(
												'%d selected',
												'Number of selected filter items'
											),
											selectedValues.size
										)}
									</Badge>
								) : (
									item.options
										.filter((option) =>
											selectedValues.has(option.value)
										)
										.map((option) => (
											<Badge
												variant="secondary"
												key={option.value}
												className="rounded-sm px-1 font-normal"
											>
												{option.label}
											</Badge>
										))
								)}
							</div>
						</>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="w-[200px] p-0"
				align="start"
			>
				<Command>
					{item.options.length > 10 && (
						<CommandInput placeholder={__('Search')} />
					)}
					<CommandList>
						<CommandEmpty>{__('No results found.')}</CommandEmpty>
						<CommandGroup>
							{item.options.map((option) => {
								const isSelected = selectedValues.has(
									option.value
								);
								return (
									<CommandItem
										key={option.value}
										onSelect={() => {
											if (isSelected) {
												selectedValues.delete(
													option.value
												);
											} else {
												if (item.isMulti === false) {
													selectedValues.clear();
												}
												selectedValues.add(
													option.value
												);
											}
											const filterValues =
												Array.from(selectedValues);

											collection.setFilter(
												item.id,
												filterValues
											);
										}}
									>
										<div
											className={cn(
												'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
												isSelected
													? 'bg-primary text-primary-foreground'
													: 'opacity-50 [&_svg]:invisible'
											)}
										>
											<CheckIcon
												className={cn('h-4 w-4')}
											/>
										</div>
										{option.icon && (
											<option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
										)}
										<span>{option.label}</span>
									</CommandItem>
								);
							})}
						</CommandGroup>
						{selectedValues.size > 0 && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem
										onSelect={() =>
											collection.setFilter(item.id, [])
										}
										className="justify-center text-center"
									>
										{__('Clear Filter')}
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
