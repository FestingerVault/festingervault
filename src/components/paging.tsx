import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination';
import generatePaginationArray from '@/lib/generatePaginationArray';
import { useMemo } from '@wordpress/element';
type PagingProps = {
	totalPages: number;
	currentPage: number;
	urlGenerator: (path: string | number) => string;
	className?: string;
};
export default function Paging({
	totalPages = 1,
	currentPage = 1,
	urlGenerator,
	className = ''
}: PagingProps) {
	const paginationArray = useMemo(() => {
		return generatePaginationArray(currentPage, totalPages);
	}, [currentPage, totalPages]);
	if (totalPages < 2) {
		return null;
	}

	return (
		<>
			<Pagination className={className}>
				<PaginationContent className="flex-wrap">
					{currentPage > 1 && (
						<PaginationItem>
							<PaginationPrevious
								to={urlGenerator(currentPage - 1)}
							></PaginationPrevious>
						</PaginationItem>
					)}
					{paginationArray.map((item, index) => (
						<PaginationItem key={index}>
							{item.separator === false ? (
								<PaginationLink
									to={urlGenerator(item.page)}
									isActive={item.active}
								>
									{item.page}
								</PaginationLink>
							) : (
								<PaginationEllipsis />
							)}
						</PaginationItem>
					))}
					{currentPage < totalPages && (
						<PaginationItem>
							<PaginationNext
								to={urlGenerator(currentPage + 1)}
							></PaginationNext>
						</PaginationItem>
					)}
				</PaginationContent>
			</Pagination>
		</>
	);
}
