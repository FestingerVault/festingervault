import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { __ } from '@/lib/i18n';
import type {
	DataTableFilterableColumn,
	DataTableSearchableColumn
} from '@/types/data-table';
import { Cross2Icon } from '@radix-ui/react-icons';
import { type Table } from '@tanstack/react-table';
import { BulkActionType, DataTableBulkAction } from './data-table-bulk-action';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
	filterableColumns?: DataTableFilterableColumn<TData>[];
	searchableColumns?: DataTableSearchableColumn<TData>[];
	bulkActions?: BulkActionType<TData>[];
}

export function DataTableToolbar<TData>({
	table,
	filterableColumns = [],
	searchableColumns = [],
	bulkActions = []
}: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;

	return (
		<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
			<div className="flex flex-1 flex-wrap items-center space-x-2">
				{searchableColumns.length > 0 &&
					searchableColumns.map(
						(column) =>
							table.getColumn(
								column.id ? String(column.id) : ''
							) && (
								<Input
									key={String(column.id)}
									placeholder={column.placeholder}
									value={
										(table
											.getColumn(String(column.id))
											?.getFilterValue() as string) ?? ''
									}
									onChange={(event) =>
										table
											.getColumn(String(column.id))
											?.setFilterValue(event.target.value)
									}
									className="h-8 w-[150px] bg-background lg:w-[250px]"
								/>
							)
					)}

				{filterableColumns.length > 0 &&
					filterableColumns.map(
						(column) =>
							table.getColumn(
								column.id ? String(column.id) : ''
							) && (
								<DataTableFacetedFilter
									key={String(column.id)}
									column={table.getColumn(
										column.id ? String(column.id) : ''
									)}
									title={column.title}
									options={column.options}
								/>
							)
					)}
				{isFiltered && (
					<Button
						aria-label="Reset filters"
						variant="ghost"
						onClick={() => table.resetColumnFilters()}
						className="h-8 px-2 lg:px-3"
					>
						{__('Reset')}
						<Cross2Icon className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
			<div>
				<DataTableBulkAction
					actions={bulkActions}
					table={table}
				/>
			</div>
		</div>
	);
}
