import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { DataTableFilterableColumn, DataTableSearchableColumn } from "@/types/data-table";
import { type ColumnDef, type Table as TanstackTable, flexRender } from "@tanstack/react-table";
import { __ } from "@wordpress/i18n";
import React from "react";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";

/**
* Access more information on data-table at the ShadCN UI website @see https://ui.shadcn.com/docs/components/data-table
*/

type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[],
    table: TanstackTable<TData>,
    filterableColumns?: DataTableFilterableColumn<TData>[],
    searchableColumns?: DataTableSearchableColumn<TData>[],
};

export function DataTable<TData, TValue>({
    columns,
    table,
    searchableColumns = [],
    filterableColumns = [],
}: DataTableProps<TData, TValue>) {
    return (
        <div className="space-y-4">
            <DataTableToolbar table={table} filterableColumns={filterableColumns} searchableColumns={searchableColumns} />
            <div className="flex-shrink rounded-md border border-border bg-background">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {!header.isPlaceholder ?
                                             flexRender(header.column.columnDef.header, header.getContext()) 
                                             : null}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    {__("No results", 'festingervault')}.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}
