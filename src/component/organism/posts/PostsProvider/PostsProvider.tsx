/**
 * 게시글 프로바이더 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.20 일 02:05:41
 */

'use client';

import { postsStore } from '@kapoo/store/markdown';
import { MarkdownListProps } from '@kapoo/util/markdown';

import { useEffect } from 'react';

export interface PostsProviderProps
{
	/**
	 * 게시글
	 */
	posts: MarkdownListProps[];
}

/**
 * 게시글 프로바이더 organism 컴포넌트 JSX 반환 메서드
 *
 * @param {PostsProviderProps} param0: PostsProviderProps 객체
 */
export default function PostsProvider({ posts }: PostsProviderProps): null
{
	const { setMarkdown } = postsStore();

	useEffect(() =>
	{
		setMarkdown(posts);
	}, [ posts ]);

	return null;
}