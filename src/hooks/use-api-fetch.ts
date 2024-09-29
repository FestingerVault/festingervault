import { siteConfig } from '@/config/site';
import { TApiError } from '@/types/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import apiFetch from '@wordpress/api-fetch';

export default function useApiFetch<
	ResponseDataType,
	PostDataType = Record<string, unknown> | never,
	TError = TApiError
>(path: string, data?: PostDataType, enabled: boolean = true) {
	const query = useQuery<PostDataType, TError, ResponseDataType>({
		queryKey: [path, data].filter((item) => item),
		queryFn: () =>
			apiFetch({
				path: `${siteConfig.slug}/v1/${path}`,
				method: 'POST',
				data
			}),
		placeholderData: keepPreviousData,
		enabled
	});

	return query;
}
