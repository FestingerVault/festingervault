import useDataCollection from '@/hooks/use-data-collection';
import { __ } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { useEffect, useState } from '@wordpress/element';
import { X } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '../ui/input';

type Props = {
	collection: ReturnType<typeof useDataCollection>;
};
export default function Search({ collection }: Props) {
	const [text, setText] = useState<string>(collection.search?.keyword ?? '');
	const debounced = useDebouncedCallback((value: string) => {
		collection.setSearch(value);
	}, 500);
	useEffect(() => {
		setText(collection.search?.keyword || '');
	}, [collection]);
	return (
		<div className="relative w-full sm:w-auto">
			<Input
				defaultValue={text}
				className={cn(
					'h-9 w-full pr-7 transition-[width] sm:w-[300px]'
				)}
				placeholder={__('Search Title')}
				onChange={(e) => {
					debounced(e.target.value);
				}}
			/>
			{text.length > 0 && (
				<X
					className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer opacity-100 transition-opacity hover:opacity-70"
					size={14}
					onClick={() => collection.setSearch('')}
				/>
			)}
		</div>
	);
}
