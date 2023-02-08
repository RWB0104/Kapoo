/**
 * 쿼리 모듈
 *
 * @author RWB
 * @since 2023.02.07 Tue 12:41:32
 */

import { ContentType, ContentProps, CategoryProps } from '@kapoo/commons/common';
import { useInfiniteQuery, UseInfiniteQueryOptions, UseInfiniteQueryResult, useMutation, UseMutationOptions, UseMutationResult, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

export interface UseGetImageProps
{
	list: string[]
}

export interface UseGetContentsProps
{
	list: ContentProps[];
	count: number;
	total: number;
}

export interface GoogleAuth
{
	access_token: string
	expires_in: number
	scope: string
	token_type: string
}

export interface PopularPage
{
	dimensionHeaders?: {
		name: string
	}[]
	metricHeaders?: {
		name: string
		type: string
	}[]
	rows: {
		dimensionValues: {
			value: string
		}[]
		metricValues: {
			value: string
		}[]
	}[]
	totals?: {
		dimensionValues: {
			value: string
		}[]
		metricValues: {
			value: string
		}[]
	}
	rowCount?: number
	metadata?: {
		currencyCode: string
		timeZone: string
	}
	kind: string
}

export interface ContentFilterProps
{
	keyword?: string
	categories?: string[]
}

const DIV = 10;

/**
 * 구글 인증 결과 반환 훅 메서드
 *
 * @param {UseMutationOptions} options: UseMutationOptions 객체
 *
 * @returns {UseMutationResult} UseMutationResult 객체
 */
function useGoogleAuthorize(options?: UseMutationOptions<GoogleAuth | undefined, unknown, void>): UseMutationResult<GoogleAuth | undefined, unknown, void>
{
	return useMutation<GoogleAuth | undefined, unknown, void>([ 'useGoogleAuthorize' ], async () =>
	{
		const auth = await fetch('https://accounts.google.com/o/oauth2/token', {
			body: JSON.stringify({
				client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
				client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
				grant_type: 'refresh_token',
				refresh_token: process.env.NEXT_PUBLIC_REFRESH
			}),
			method: 'POST'
		});

		// 인증 성공일 경우
		if (auth.ok)
		{
			const json: GoogleAuth = await auth.json();

			return json;
		}

		return undefined;
	}, options);
}

/**
 * 구글 인기게시글 데이터 반환 훅 메서드
 *
 * @param {ContentType} type: ContentType 객체
 * @param {UseQueryOptions} options: UseQueryOptions 객체
 *
 * @returns {UseQueryResult} UseQueryResult 객체
 */
export function useGetGooglePopularData(type: ContentType, options?: UseQueryOptions<PopularPage | undefined>): UseQueryResult<PopularPage | undefined>
{
	const query = useGoogleAuthorize();

	return useQuery<PopularPage | undefined>([ 'useGetGooglePopularData', type ], async () =>
	{
		const auth = await query.mutateAsync();

		const list = await fetch('https://content-analyticsdata.googleapis.com/v1beta/properties/284521573:runReport?alt=json', {
			body: JSON.stringify({
				dateRanges: [
					{
						endDate: 'today',
						startDate: '30daysAgo'
					}
				],
				dimensionFilter: {
					filter: {
						fieldName: 'pagePath',
						stringFilter: {
							matchType: 'BEGINS_WITH',
							value: `/${type}/2`
						}
					}
				},
				dimensions: [
					{ name: 'pagePath' }
				],
				limit: '10',
				metricAggregations: [
					'TOTAL'
				],
				metrics: [
					{ name: 'active28DayUsers' }
				]
			}),
			headers: { Authorization: `${auth?.token_type} ${auth?.access_token}` },
			method: 'POST'
		});

		// 인증 성공일 경우
		if (list.ok)
		{
			const json: PopularPage = await list.json();

			return json;
		}

		return undefined;
	}, options);
}

/**
 * 컨텐츠 리스트 반환 훅 메서드
 *
 * @param {ContentType} type: ContentType 객체
 * @param {ContentFilterProps} filter: ContentFilterProps 객체
 * @param {UseQueryOptions} options: UseQueryOptions 객체
 *
 * @returns {UseQueryResult} UseQueryResult 객체
 */
export function useGetContents(type: ContentType, filter?: ContentFilterProps, options?: UseQueryOptions<ContentProps[]>): UseQueryResult<ContentProps[]>
{
	return useQuery<ContentProps[]>([ 'useGetContents', type ], async () =>
	{
		const list = await fetch(`/${type}.json`);
		let json = (await list.json()).list as ContentProps[];

		// 필터가 유효할 경우
		if (filter)
		{
			const { keyword, categories } = filter;

			// 카테고리가 유효할 경우
			if (categories && categories.length > 0)
			{
				json = json.filter(({ header }) => categories.includes(header.category));
			}

			// 키워드가 유효할 경우
			if (keyword && keyword.length > 1)
			{
				json = json.filter(({ header }) => header.title.includes(keyword) || header.tag.includes(keyword));
			}
		}

		return json;
	}, options);
}

/**
 * 인피니티 스크롤 컨텐츠 반환 훅 메서드
 *
 * @param {ContentType} type: ContentType 객체
 * @param {ContentFilterProps} filter: ContentFilterProps 객체
 * @param {UseInfiniteQueryOptions} options: UseInfiniteQueryOptions 객체
 *
 * @returns {UseInfiniteQueryResult} UseInfiniteQueryResult 객체
 */
export function useGetInfiniteContents(type: ContentType, filter?: ContentFilterProps, options?: UseInfiniteQueryOptions<UseGetContentsProps>): UseInfiniteQueryResult<UseGetContentsProps>
{
	return useInfiniteQuery<UseGetContentsProps>([ 'useGetInfiniteContents', type ], async ({ pageParam = 1 }) =>
	{
		const list = await fetch(`/${type}.json`);
		let json = (await list.json()).list as ContentProps[];

		// 필터가 유효할 경우
		if (filter)
		{
			const { keyword, categories } = filter;

			// 카테고리가 유효할 경우
			if (categories && categories.length > 0)
			{
				json = json.filter(({ header }) => categories.includes(header.category));
			}

			// 키워드가 유효할 경우
			if (keyword && keyword.length > 1)
			{
				json = json.filter(({ header }) => header.title.includes(keyword) || header.tag.includes(keyword));
			}
		}

		return {
			count: pageParam,
			list: json.slice((pageParam - 1) * DIV, pageParam * DIV),
			total: Math.ceil(json.length / DIV)
		};
	}, {
		getNextPageParam: ({ count, total }) => (count === total ? undefined : count + 1),
		getPreviousPageParam: ({ count }) => (count === 1 ? undefined : count - 1),
		...options
	});
}

/**
 * 카테고리 리스트 반환 훅 메서드
 *
 * @param {ContentType} type: ContentType 객체
 * @param {UseInfiniteQueryOptions} options: UseInfiniteQueryOptions 객체
 *
 * @returns {UseInfiniteQueryResult} UseInfiniteQueryResult 객체
 */
export function useGetCategories(type: ContentType, options?: UseQueryOptions<CategoryProps[]>): UseQueryResult<CategoryProps[]>
{
	return useQuery<CategoryProps[]>([ 'useGetCategories', type ], async () =>
	{
		const list = await fetch(`/${type}-category.json`);
		const json = (await list.json()).list as CategoryProps[];

		return json;
	}, options);
}

/**
 * 인기 컨텐츠 리스트 반환 훅 메서드
 *
 * @param {ContentType} type: ContentType 객체
 * @param {ContentProps[]} contents: 컨텐츠 리스트
 * @param {PopularPage} popularContents: 구글 인기 게시글 데이터
 * @param {UseQueryOptions} options: UseQueryOptions 객체
 *
 * @returns {UseQueryResult} UseQueryResult 객체
 */
export function useGetPopularContents(type: ContentType, contents?: ContentProps[], popularContents?: PopularPage, options?: UseQueryOptions<ContentProps[]>): UseQueryResult<ContentProps[]>
{
	return useQuery<ContentProps[]>([ 'useGetPopularContents', type ], async () =>
	{
		// 컨텐츠, 인기 게시글이 모두 유효할 경우
		if (contents && popularContents)
		{
			const urls: string[] = popularContents.rows.map((item) => item.dimensionValues[0].value.replace(/.html$/, '')) || [];

			return urls.reduce((acc, item) =>
			{
				const target = contents?.find((content) => `/${content.header.type}/${content.url[1]}/${content.url[2]}/${content.url[3]}/${content.url[4]}` === item);

				// 일치하는 데이터가 있을 경우
				if (target)
				{
					acc.push(target);
				}

				return acc;
			}, [] as ContentProps[]);
		}

		return [];
	}, { enabled: contents !== undefined && popularContents !== undefined, ...options });
}

/**
 * 이미지 리스트 반환 훅 메서드
 *
 * @param {UseQueryOptions} options: UseQueryOptions 객체
 *
 * @returns {UseQueryResult} UseQueryResult 객체
 */
export function useGetImage(options?: UseQueryOptions<UseGetImageProps>): UseQueryResult<UseGetImageProps>
{
	return useQuery<UseGetImageProps>([ 'useGetImage' ], async () =>
	{
		const list = await fetch('/image.json');
		const json = await list.json() as UseGetImageProps;

		return json;
	}, options);
}