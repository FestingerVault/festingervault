import { TItemTypeEnum, TTerm, TTermCollectionResponse } from '@/types/item';
import { useCallback, useEffect, useState } from 'react';
import useApiFetch from './use-api-fetch';

export default function useGetTerms(type: TItemTypeEnum) {
	const [termStack, setTerms] = useState<Array<TTerm>>([]);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [cursor, setCursor] = useState<string>(null);

	const { data, isPending } = useApiFetch<TTermCollectionResponse>(
		'item/terms',
		{ cursor, type }
	);
	const getData = useCallback(() => {
		if (data) {
			setCursor(data.meta?.next);
			setHasMore(data.meta?.has_more);
			setTerms((prev) => [...prev, ...data.data]);
		}
	}, [data]);
	useEffect(() => {
		setTerms([]);
		setCursor(null);
		setHasMore(true); // Optional: reset pagination
	}, [type]);
	useEffect(() => {
		if (hasMore) {
			getData();
		}
	}, [getData, hasMore]);
	return { data: hasMore ? null : termStack, isPending };
}
