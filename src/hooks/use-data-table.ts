import type {
	DataTableFilterableColumn,
	DataTableSearchableColumn
} from '@/types/data-table';
import {
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
	type ColumnFiltersState,
	type PaginationState,
	type SortingState,
	type VisibilityState
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from '@wordpress/element';

interface UseDataTableProps<TData, TValue> {
	/**
	 * The data for the table.
	 * @default []
	 * @type TData[]
	 */
	data: TData[];

	/**
	 * The columns of the table.
	 * @default []
	 * @type ColumnDef<TData, TValue>[]
	 */
	columns: ColumnDef<TData, TValue>[];

	/**
	 * The searchable columns of the table.
	 * @default []
	 * @type {id: keyof TData, title: string}[]
	 * @example searchableColumns={[{ id: "title", title: "titles" }]}
	 */
	searchableColumns?: DataTableSearchableColumn<TData>[];

	/**
	 * The filterable columns of the table. When provided, renders dynamic faceted filters, and the advancedFilter prop is ignored.
	 * @default []
	 * @type {id: keyof TData, title: string, options: { label: string, value: string, icon?: React.ComponentType<{ className?: string }> }[]}[]
	 * @example filterableColumns={[{ id: "status", title: "Status", options: ["todo", "in-progress", "done", "canceled"]}]}
	 */
	filterableColumns?: DataTableFilterableColumn<TData>[];
}
export function useDataTable<TData, TValue>({
	data,
	columns
}: UseDataTableProps<TData, TValue>) {
	// Table states
	const [rowSelection, setRowSelection] = useState({});
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		{}
	);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10
	});
	const pagination = useMemo(
		() => ({
			pageIndex,
			pageSize
		}),
		[pageIndex, pageSize]
	);
	// Handle server-side sorting
	const [sorting, setSorting] = useState<SortingState>([]);
	useEffect(() => {
		// reset selected rows when paging state changes
		setRowSelection({});
	}, [pagination]);

	const table = useReactTable({
		data,
		columns,
		autoResetAll: false,
		state: {
			pagination,
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters
		},
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		keepPinnedRows: false
	});

	return { table };
}
