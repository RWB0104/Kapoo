/**
 * Google API 모듈
 *
 * @author RWB
 * @since 2024.04.22 Mon 17:36:42
 */

import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

export type DataType = 'posts' | 'projects';

export interface GoogleAuthRequest
{
	/**
	 * 클라이언트 ID
	 */
	clientId: string;

	/**
	 * 클라이언트 시크릿
	 */
	clientSecret: string;

	/**
	 * Refresh Token
	 */
	refreshToken: string;
}

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
 * 구글 로그인 결과 반환 API 비동기 메서드
 *
 * @param {GoogleAuthRequest} param0: GoogleAuthRequest
 *
 * @returns {Promise} 비동기 GoogleAuth
 */
export async function postGoogleLogin({ clientId, clientSecret, refreshToken }: GoogleAuthRequest): Promise<GoogleAuth | undefined>
{
	const auth = await fetch('https://accounts.google.com/o/oauth2/token', {
		body: JSON.stringify({
			client_id: clientId,
			client_secret: clientSecret,
			grant_type: 'refresh_token',
			refresh_token: refreshToken
		}),
		method: 'POST'
	});

	// 인증 성공일 경우
	if (auth.ok)
	{
		const json = await auth.json<GoogleAuth>();

		return json;
	}

	return undefined;
}

/**
 * 인기 컨텐츠 목록 반환 API 비동기 메서드
 *
 * @param {DataType} type: 컨텐츠 타입
 * @param {GoogleAuth} auth: GoogleAuth
 *
 * @returns {PopularPage} 비동기 인기 컨텐츠 목록
 */
export async function postPopularData(type: DataType, auth: GoogleAuth): Promise<PopularPage | undefined>
{
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
		const json = await list.json<PopularPage>();

		return json;
	}

	return undefined;
}

/**
 * 구글 로그인 결과 반환 API 비동기 훅 메서드
 *
 * @param {UseMutationOptions} options: UseMutationOptions
 *
 * @returns {UseMutationResult} 구글 로그인 결과
 */
export function usePostGoogleLogin(options?: UseMutationOptions<GoogleAuth | undefined, unknown, GoogleAuthRequest>): UseMutationResult<GoogleAuth | undefined, unknown, GoogleAuthRequest>
{
	return useMutation<GoogleAuth | undefined, unknown, GoogleAuthRequest>({
		mutationFn: postGoogleLogin,
		mutationKey: [ 'usePostGoogleLogin' ],
		...options
	});
}

/**
 * 인기 컨텐츠 목록 반환 API 비동기 훅 메서드
 *
 * @param {GoogleAuthRequest} authParams: Google 인증 정보
 * @param {UseMutationOptions} options: UseMutationOptions
 *
 * @returns {UseMutationResult} 인기 컨텐츠 목록
 */
export function usePostPopularData(authParams: GoogleAuthRequest, options: UseMutationOptions<PopularPage | undefined, unknown, DataType>): UseMutationResult<PopularPage | undefined, unknown, DataType>
{
	return useMutation<PopularPage | undefined, unknown, DataType>({
		mutationFn: async (type) =>
		{
			const auth = await postGoogleLogin(authParams);

			// 인증이 유효할 경우
			if (auth)
			{
				return postPopularData(type, auth);
			}

			throw Error('Google 인증 에러');
		},
		mutationKey: [ 'usePostPopularData' ],
		...options
	});
}