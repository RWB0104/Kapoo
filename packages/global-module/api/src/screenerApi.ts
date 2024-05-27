/**
 * 스크리너 API 모듈
 *
 * @author RWB
 * @since 2024.04.22 Mon 17:36:50
 */

import { useQuery, UseQueryResult, UseQueryOptions } from '@tanstack/react-query';

/**
 * 스크리너 리스트 반환 API 비동기 메서드
 *
 * @returns {Promise} 스크리너 리스트
 *
 * @throws {Response} 비동기 string 배열
 */
export async function getScreenerList(): Promise<string[]>
{
	const response = await fetch('https://datastore.itcode.dev/itcode/video');

	// 정상 응답일 경우
	if (response.ok)
	{
		const json = await response.json<string[]>();

		return json;
	}

	throw response;
}

/**
 * 스크리너 리스트 반환 API 훅 메서드
 *
 * @param {UseQueryOptions} options: UseQueryOptions
 *
 * @returns {UseQueryResult} 스크리너 리스트
 */
export function useGetScreenerList(options?: UseQueryOptions<string[], Error>): UseQueryResult<string[], Error>
{
	return useQuery({
		queryFn: getScreenerList,
		queryKey: [ 'useGetScreenerList' ],
		...options
	});
}