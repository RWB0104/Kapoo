/**
 * 쿼리 모듈
 *
 * @author RWB
 * @since 2023.02.07 Tue 12:41:32
 */

import { ContentType, ContentProps } from '@kapoo/commons/common';
import { useInfiniteQuery, UseInfiniteQueryOptions, UseInfiniteQueryResult, useMutation, UseMutationOptions, UseMutationResult, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

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
				client_id: '22130300203-s47tft38ah28e6o2jsv5144vqn1cl32p.apps.googleusercontent.com',
				client_secret: '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',
				grant_type: 'refresh_token',
				refresh_token: '1//04SoK9dOIeQQDCgYIARAAGAQSNwF-L9IrNkGEGZ5xuJSsDuT5NbSMUWBd9sFrbtdv3hegoJZmQqSITRMCVMy1y71_DJZl4TsMEac'
			}),
			method: 'POST'
		});

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

	return useQuery<PopularPage | undefined>([ 'useGetGooglePopularData' ], async () =>
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
 * @param {UseQueryOptions} options: UseQueryOptions 객체
 *
 * @returns {UseQueryResult} UseQueryResult 객체
 */
export function useGetContents(type: ContentType, options?: UseQueryOptions<ContentProps[]>): UseQueryResult<ContentProps[]>
{
	return useQuery<ContentProps[]>([ 'useGetContents', type ], async () =>
	{
		const list = await fetch(`/${type}.json`);
		const json = (await list.json()).list as ContentProps[];

		return json;
	}, options);
}

/**
 * 인피니티 스크롤 컨텐츠 반환 훅 메서드
 *
 * @param {ContentType} type: ContentType 객체
 * @param {UseInfiniteQueryOptions} options: UseInfiniteQueryOptions 객체
 *
 * @returns {UseInfiniteQueryResult} UseInfiniteQueryResult 객체
 */
export function useGetInfiniteContents(type: ContentType, options?: UseInfiniteQueryOptions<UseGetContentsProps>): UseInfiniteQueryResult<UseGetContentsProps>
{
	return useInfiniteQuery<UseGetContentsProps>('useGetInfiniteContents', async ({ pageParam = 1 }) =>
	{
		const list = await fetch(`/${type}.json`);
		const json = (await list.json()).list as ContentProps[];

		return {
			count: pageParam,
			list: json.splice((pageParam - 1) * DIV, pageParam * DIV),
			total: Math.ceil(json.length / DIV)
		};
	}, {
		getNextPageParam: ({ count, total }) => (count === total ? undefined : count + 1),
		getPreviousPageParam: ({ count }) => (count === 1 ? undefined : count - 1),
		...options
	});
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
		if (contents && popularContents)
		{
			const urls: string[] = popularContents.rows.map((item) => item.dimensionValues[0].value.replace(/.html$/, '')) || [];

			return urls?.reduce((acc, item) =>
			{
				const target = contents?.find((content) => `/${content.header.type}/${content.url[1]}/${content.url[2]}/${content.url[3]}/${content.url[4]}` === item);

				if (target)
				{
					acc.push(target);
				}

				return acc;
			}, [] as ContentProps[]) || [];
		}

		return [];
	}, { enabled: contents !== undefined && popularContents !== undefined, ...options });
}