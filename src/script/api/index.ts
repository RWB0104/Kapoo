/**
 * API 모듈
 *
 * @author RWB
 * @since 2023.08.19 토 05:20:59
 */

import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';

export const QUERY_KEY = { SCREENER_VIDEO: 'screener-video' };

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