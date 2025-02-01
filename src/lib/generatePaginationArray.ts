type PageItemType = {
	page: number | string;
	separator: boolean;
	active: boolean;
};
export default function generatePaginationArray(
	currentPage: number,
	totalPages: number,
	pageBufferSize: number = 1
): Array<PageItemType> {
	const pagerList: PageItemType[] = [];
	let left = Math.max(1, currentPage - pageBufferSize);
	let right = Math.min(currentPage + pageBufferSize, totalPages);
	const addPage = (
		page: number | string,
		separator = false,
		unshift = false
	) => {
		if (unshift) {
			pagerList.unshift({
				page,
				separator,
				active: currentPage === page
			});
		} else {
			pagerList.push({ page, separator, active: currentPage === page });
		}
	};
	if (currentPage - 1 <= pageBufferSize) {
		right = Math.min(totalPages, 1 + pageBufferSize * 2);
	}
	if (totalPages - currentPage <= pageBufferSize) {
		left = Math.max(1, totalPages - pageBufferSize * 2);
	}
	for (let i = left; i <= right; i += 1) {
		addPage(i);
	}

	if (left !== 1) {
		addPage('...', true, true);
		addPage(1, false, true);
	}
	if (right !== totalPages) {
		addPage('...', true);
		addPage(totalPages);
	}
	return pagerList;
}
