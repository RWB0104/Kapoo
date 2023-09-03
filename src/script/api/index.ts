/**
 * API 모듈
 *
 * @author RWB
 * @since 2023.08.19 Sat 05:20:59
 */

import { MarkdownType } from '@kapoo/util/markdown';

import { UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';

export const QUERY_KEY = {
	GOOGLE_AUTHORIZE: 'google-authorize',
	GOOGLE_POPULAR_DATA: 'google-popular-data',
	SCREENER_VIDEO: 'screener-video'
};

export interface GoogleAuth
{
	/**
	 * access 토큰
	 */
	access_token: string;

	/**
	 * 만료일
	 */
	expires_in: number;

	/**
	 * 스코프
	 */
	scope: string;

	/**
	 * 토큰 종류
	 */
	token_type: string;
}

export interface DimensionHeader
{
	/**
	 * 이름
	 */
	name: string;
}

export interface MetricHeader
{
	/**
	 * 이름
	 */
	name: string;

	/**
	 * 타입
	 */
	type: string;
}

export interface PopularPageValue
{
	/**
	 * 값
	 */
	value: string;
}

export interface PopularPageObject
{
	/**
	 * 디멘션 값
	 */
	dimensionValues: PopularPageValue[];

	/**
	 * 메트릭 값
	 */
	metricValues: PopularPageValue[];
}

export interface PopularMetadata
{
	/**
	 * 코드
	 */
	currencyCode: string;

	/**
	 * 타임존
	 */
	timeZone: string;
}

export interface PopularPage
{
	/**
	 * 디멘션 헤더
	 */
	dimensionHeaders?: DimensionHeader[];

	/**
	 * 메트릭 헤더
	 */
	metricHeaders?: MetricHeader[];

	/**
	 * 데이터
	 */
	rows: PopularPageObject[];

	/**
	 * 전체
	 */
	totals?: PopularPageObject;

	/**
	 * 데이터 갯수
	 */
	rowCount?: number;

	/**
	 * 메타데이터
	 */
	metadata?: PopularMetadata;

	/**
	 * 종류
	 */
	kind: string;
}

/**
 * 스크리너 비디오 반환 API 메서드
 *
 * @param {UseQueryOptions} options: UseQueryOptions 객체
 *
 * @returns {UseQueryResult} UseQueryResult 객체
 */
export function useScreenerVideo(options?: UseQueryOptions<string[], Response>): UseQueryResult<string[], Response>
{
	return useQuery<string[], Response>([ QUERY_KEY.SCREENER_VIDEO ], async () =>
	{
		const response = await fetch('https://datastore.itcode.dev/itcode/video');

		// 정상 응답일 경우
		if (response.ok)
		{
			const json = await response.json();

			return json as string[];
		}

		throw response;
	}, options);
}

/**
 * 구글 인증 결과 반환 훅 메서드
 *
 * @param {UseMutationOptions} options: UseMutationOptions 객체
 *
 * @returns {UseMutationResult} UseMutationResult 객체
 */
function useGoogleAuthorize(options?: UseMutationOptions<GoogleAuth | undefined, unknown, void>): UseMutationResult<GoogleAuth | undefined, unknown, void>
{
	return useMutation<GoogleAuth | undefined, unknown, void>([ QUERY_KEY.GOOGLE_AUTHORIZE ], async () =>
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
 * @param {MarkdownType} type: MarkdownType 객체
 * @param {UseQueryOptions} options: UseQueryOptions 객체
 *
 * @returns {UseQueryResult} UseQueryResult 객체
 */
export function useGetGooglePopularData(type: MarkdownType, options?: UseQueryOptions<PopularPage | undefined>): UseQueryResult<PopularPage | undefined>
{
	const query = useGoogleAuthorize();

	return useQuery<PopularPage | undefined>([ QUERY_KEY.GOOGLE_POPULAR_DATA, type ], async () =>
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
				limit: 6,
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