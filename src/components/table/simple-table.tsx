import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';
import { ReactElement, ReactNode } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '../ui/table';

type ColumnRenderProps<TData> = {
	row: TData;
	columnId: string;
};
export type SimpleColumnDef<TData> = {
	id: string;
	label?: string;
	className?: ClassValue;
	render:
		| string
		| ((props: ColumnRenderProps<TData>) => ReactElement | ReactNode);
};
type Props<TData> = {
	columns: Array<SimpleColumnDef<TData>>;
	data: Array<{ id: string | number } & TData>;
};
export default function SimpleTable<TData>({ columns, data }: Props<TData>) {
	return (
		<Table className="group table-auto">
			<TableHeader>
				<TableRow className="group/head text-left font-semibold hover:bg-inherit">
					{columns.map((column) => (
						<TableHead
							key={column.id}
							className={cn(
								'group/head-cell border-b px-4 pb-4 text-left first:pl-0 last:pr-0',
								column.className
							)}
						>
							{column.label}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody className="group/body">
				{data &&
					data?.map((row) => (
						<TableRow
							className="group/body-row hover:bg-inherit"
							key={row.id}
						>
							{columns.map((column) => (
								<TableCell
									key={`${column.id}_${row.id}`}
									className={cn(
										'group/body-row-cell border-b p-4 first:pl-0 last:pr-0 group-last/body-row:border-b-0 group-last/body-row:pb-0',
										column.className
									)}
								>
									{typeof column.render === 'function'
										? column.render({
												row,
												columnId: column.id
											})
										: column.render}
								</TableCell>
							))}
						</TableRow>
					))}
			</TableBody>
		</Table>
	);
}
