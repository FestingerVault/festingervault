import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Row, type Table } from '@tanstack/react-table';
import { useState } from '@wordpress/element';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

type DataTableBulkActionProps<TData> = {
	table: Table<TData>;
	actions: BulkActionType<TData>[];
};
export type BulkActionType<TData> = {
	id: string;
	label: string;
	action: (item: Row<TData>[]) => void;
};
export function DataTableBulkAction<TData>({
	table,
	actions
}: DataTableBulkActionProps<TData>) {
	const [selected, setSelected] = useState<string>();
	const onSubmit = () => {
		const models = table.getSelectedRowModel().rows;
		if (models.length > 0 && selected) {
			const callback = actions.find((action) => action.id === selected);
			if (callback) {
				callback.action(models);
			}
		}
	};
	return (
		<div className="flex flex-row gap-4">
			<Select onValueChange={setSelected}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Select Action" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{actions.map((action) => (
							<SelectItem
								key={action.id}
								value={action.id}
							>
								{action.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			<Button
				disabled={
					!selected || table.getSelectedRowModel().rows.length === 0
				}
				size="icon"
				variant="secondary"
				onClick={onSubmit}
			>
				<ArrowRight size={16} />
			</Button>
		</div>
	);
}
