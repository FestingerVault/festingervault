import { removeEmptyParams } from '@/lib/utils';
import { Params, useNavigate, useParams } from '@/router';
import { useCallback, useMemo } from '@wordpress/element';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';

type FilterState = Record<string, string[]>;

type SortItem = {
	value: string;
	label: string;
};
type Option = {
	label: string;
	value: string;
	icon?: React.ComponentType<{ className?: string }>;
};

export type FilterOption = {
	id: string;
	label: string;
	values?: string[];
	options: Option[];
	isMulti?: boolean;
	showAll?: boolean;
	onBarView?: boolean;
	enabled?: boolean;
};
// Create schemas dynamically
const createFilterSchema = (options: FilterOption[]) => {
	const schemaShape: Record<string, z.ZodTypeAny> = {};
	options.forEach((option) => {
		if (option.enabled === false) {
			return;
		}
		schemaShape[option.id] = z.array(z.string()).optional();
	});
	return z.object(schemaShape);
};

const createSortSchema = (sort_items: SortItem[]) => {
	if (sort_items.length === 0)
		throw new Error('sort_items must have at least one item.');
	const sortValues = sort_items.map((item) => item.value) as [
		string,
		...string[]
	];
	return z.object({
		order_by: z.enum(sortValues).default(sortValues[0]),
		order: z.enum(['asc', 'desc']).default('desc')
	});
};

const paginationSchema = z.object({
	per_page: z.enum(['30', '60', '90']).default('30')
});
const searchSchema = z.object({ keyword: z.string().optional() });

// Utility functions
const serializeQuery = (items: FilterState): Record<string, string> => {
	return Object.fromEntries(
		Object.entries(items).map(([key, values]) => [
			key,
			values.sort().join(',')
		])
	);
};
type ParamsWith<T, Keys extends string[] = ['slug']> = {
	[K in keyof T]: Keys extends (keyof T[K])[] ? K : never;
}[keyof T];
type useCollectionProps = {
	options: FilterOption[];
	path: ParamsWith<Params, ['slug']>; // Only need Params that has `slug` params
	sort: SortItem[];
};
export default function useDataCollection({
	options,
	path,
	sort
}: useCollectionProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const filterSchema = useMemo(() => createFilterSchema(options), [options]);
	const sortSchema = useMemo(() => createSortSchema(sort), [sort]);
	const params = useParams(path);
	const navigate = useNavigate();
	const unserializeQuery = useCallback(
		(searchParams: URLSearchParams): FilterState => {
			const result: FilterState = {};
			Array.from(searchParams.entries()).forEach(([key, value]) => {
				const option = options.find((i) => i.id === key);
				if (option) {
					result[key] = value.split(',').filter((v) => v.length > 0);
				}
			});
			return result;
		},
		[options]
	);
	// Extract and validate initial state from search params
	const initialState = useMemo(() => {
		const unserialized = unserializeQuery(searchParams);
		const filterResult = filterSchema.safeParse(unserialized);
		const sortResult = sortSchema.safeParse(
			Object.fromEntries(searchParams)
		);

		const searchResult = searchSchema.safeParse(
			Object.fromEntries(searchParams)
		);
		const paginationResult = paginationSchema.safeParse(
			Object.fromEntries(searchParams)
		);
		return {
			filter: filterResult.success ? filterResult.data : {},
			sorting: sortResult.success ? sortResult.data : {},
			search: searchResult.success ? searchResult.data : {},
			pagination: paginationResult.success
				? paginationResult.data
				: { per_page: '30' }
		};
	}, [unserializeQuery, searchParams, filterSchema, sortSchema]);
	// Update URL with new filter and sorting parameters

	function setFilter(key: string, values: string[]) {
		const newItems = removeEmptyParams({
			...initialState.filter,
			[key]: values.length > 0 && values.sort()
		});
		resetPage();
		setSearchParams({
			...initialState.search,
			...serializeQuery(newItems),
			...initialState.sorting,
			...initialState.pagination
		});
	}
	function setFilters(values: FilterState) {
		resetPage();
		setSearchParams({
			...initialState.search,
			...serializeQuery(values),
			...initialState.sorting,
			...initialState.pagination
		});
	}

	function setSort(key: string, order: 'asc' | 'desc') {
		const newSorting = removeEmptyParams({
			order_by: key ?? null,
			order: order ?? 'asc'
		});
		setSearchParams({
			...initialState.search,
			...serializeQuery(initialState.filter),
			...newSorting,
			...initialState.pagination
		});
	}
	function setSearch(keyword: string) {
		resetPage();
		setSearchParams({
			...(keyword.length > 0 ? { keyword } : {}),
			...serializeQuery(initialState.filter),
			...initialState.sorting,
			...initialState.pagination
		});
	}
	function setPerPage(per_page: number | string) {
		resetPage();
		setSearchParams({
			...initialState.search,
			...serializeQuery(initialState.filter),
			...initialState.sorting,
			per_page: String(per_page)
		});
	}
	function clearFilter() {
		resetPage();
		setSearchParams({
			...initialState.sorting,
			...initialState.pagination
		});
	}
	function resetPage() {
		navigate(path, { params: { slug: params.slug } });
	}

	return {
		options,
		searchParams,
		sort,
		search: initialState.search,
		filter: initialState.filter,
		sorting: initialState.sorting,
		pagination: initialState.pagination,
		setFilter,
		setFilters,
		setSort,
		resetPage,
		setSearch,
		setPerPage,
		clearFilter
	};
}
