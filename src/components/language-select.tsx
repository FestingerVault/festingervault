import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover';
import { __ } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useState } from '@wordpress/element';
import { Languages } from 'lucide-react';
import { Button } from './ui/button';
const languages = [
	{
		value: 'english',
		label: __('English'),
		alias: 'EN'
	},
	{
		value: 'french',
		label: __('French'),
		alias: 'FR'
	}
];

export default function LanguageSelector() {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('english');
	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="justify-between gap-2"
				>
					<Languages size={16} />
					{value &&
						languages.find((lang) => lang.value === value)?.alias}
					<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandList>
						<CommandGroup>
							{languages.map((lang) => (
								<CommandItem
									key={lang.value}
									value={lang.value}
									onSelect={(currentValue) => {
										setValue(
											currentValue === value
												? ''
												: currentValue
										);
										setOpen(false);
									}}
								>
									{lang.label}
									<CheckIcon
										className={cn(
											'ml-auto h-4 w-4',
											value === lang.value
												? 'opacity-100'
												: 'opacity-0'
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
