/**
 * API 모듈
 *
 * @author RWB
 * @since 2023.08.19 토 05:20:59
 */

import { postsStore } from '@kapoo/store/markdown';
import { MarkdownListProps } from '@kapoo/util/markdown';

import { UseInfiniteQueryOptions, UseInfiniteQueryResult, UseQueryOptions, UseQueryResult, useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const QUERY_KEY = { GET_POSTS: 'get-posts', SCREENER_VIDEO: 'screener-video' };

export interface UseGetPostsParamProps
{
	/**
	 * 키워드
	 */
	keyword?: string;

	/**
	 * 카테고리
	 */
	category?: string[];
}

export interface UseGetPostsProps
{
	/**
	 * 리스트
	 */
	list: MarkdownListProps[];

	/**
	 * 현재 페이지
	 */
	currentPage: number;

	/**
	 * 전체 페이지
	 */
	totalPage: number;

	/**
	 * 전체 데이터 갯수
	 */
	totalCount: number;
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

export function useGetPosts(useGetPostsProps?: UseGetPostsParamProps, options?: UseInfiniteQueryOptions<UseGetPostsProps>): UseInfiniteQueryResult<UseGetPostsProps>
{
	const { markdown } = postsStore();

	return useInfiniteQuery<UseGetPostsProps>([ QUERY_KEY.GET_POSTS, useGetPostsProps ], async ({ pageParam = 1 }) =>
	{
		const start = (pageParam - 1) * 10;
		const end = start + 10;

		return {
			currentPage: pageParam,
			list: markdown.slice(start, end),
			totalCount: markdown.length,
			totalPage: Math.ceil(markdown.length / 10)
		};
	}, {
		getNextPageParam: ({ currentPage, totalPage }) => (currentPage === totalPage ? undefined : currentPage + 1),
		getPreviousPageParam: ({ currentPage }) => (currentPage === 1 ? undefined : currentPage - 1),
		...options
	});
}