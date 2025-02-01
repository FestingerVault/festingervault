import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command';
import useDataCollection from '@/hooks/use-data-collection';
import { __ } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { CheckIcon, X } from 'lucide-react';
import { KeyboardEvent, useCallback, useMemo, useRef, useState } from 'react';
import { Badge } from '../ui/badge';
type ArrayItemType<T, K extends keyof T> = T[K] extends (infer U)[] ? U : never;
type Item = ArrayItemType<ReturnType<typeof useDataCollection>, 'options'>;
type Option = ArrayItemType<Item, 'options'>;
export type Props = {
	collection: ReturnType<typeof useDataCollection>;
	item: ArrayItemType<ReturnType<typeof useDataCollection>, 'options'>;
	intent: Record<string, string[]>;
	setIntent: (key: string, value: string[]) => void;
};
const displayedItems: number = 10;
export default function FilterItemList({ item, intent, setIntent }: Props) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [inputValue, setInputValue] = useState<string>('');
	const [isOpen, setOpen] = useState<boolean>(false);
	const selectedValues = useMemo(
		() => new Set<string>(intent[item.id]),
		[intent, item]
	);
	const filtered = useMemo(() => {
		const res = item.options
			?.filter((option) =>
				option.label.toLowerCase().includes(inputValue.toLowerCase())
			)
			.sort();
		return item.showAll === true ? res : res.slice(0, displayedItems);
	}, [inputValue, item]);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			const input = inputRef.current;
			if (!input) {
				return;
			}
			if (!isOpen) {
				setOpen(true);
			}
			if (event.key === 'Enter' && input.value !== '') {
				const optionToSelect = item.options.find(
					(option) => option.label === input.value
				);
				if (optionToSelect) {
					selectedValues.add(optionToSelect.value);
				}
			}

			if (event.key === 'Escape') {
				input.blur();
			}
		},
		[isOpen, item, selectedValues]
	);

	const handleBlur = useCallback(() => {
		setOpen(false);
	}, []);

	const handleSelectOption = useCallback(
		(selectedOption: Option, selected: boolean) => {
			if (selected) {
				selectedValues.delete(selectedOption.value);
			} else {
				if (item.isMulti === false) {
					selectedValues.clear();
				}
				selectedValues.add(selectedOption.value);
			}
			setIntent(item.id, Array.from(selectedValues));
			setTimeout(() => {
				inputRef?.current?.blur();
			}, 0);
		},
		[item, selectedValues, setIntent]
	);
	return (
		<div className="flex flex-col gap-2">
			{selectedValues.size > 0 && (
				<div className="flex flex-row flex-wrap gap-1">
					{Array.from(selectedValues).map((selected) => {
						const selectedItem = item.options.find(
							(option) => option.value === selected
						);
						return (
							<Badge
								key={selected}
								variant="default"
								className="group cursor-pointer gap-2 py-0"
								size="sm"
								onClick={() => {
									if (selectedItem) {
										handleSelectOption(selectedItem, true);
									}
								}}
							>
								<span>{selectedItem?.label}</span>
								<span className="scale-100 transition-transform group-hover:scale-75">
									<X className="w-4" />
								</span>
							</Badge>
						);
					})}
				</div>
			)}
			<Command
				onKeyDown={handleKeyDown}
				className="rounded-lg border"
			>
				{item.options.length > displayedItems && (
					<div>
						<CommandInput
							ref={inputRef}
							placeholder={__('Search')}
							onFocus={() => setOpen(true)}
							value={inputValue}
							onBlur={handleBlur}
							onValueChange={setInputValue}
						/>
					</div>
				)}

				<CommandList className="max-h-96">
					{filtered.length > 0 ? (
						<CommandGroup>
							{filtered.map((option) => {
								const isSelected = selectedValues.has(
									option.value
								);
								return (
									<CommandItem
										key={option.value}
										value={option.label}
										onMouseDown={(event) => {
											event.preventDefault();
											event.stopPropagation();
										}}
										onSelect={() =>
											handleSelectOption(
												option,
												isSelected
											)
										}
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
										<span>{option.label}</span>
									</CommandItem>
								);
							})}
						</CommandGroup>
					) : null}
				</CommandList>
			</Command>
		</div>
	);
}
