/**
 * 게시글 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 Sat 19:57:53
 */

import PostsProvider from '@kapoo/organism/posts/PostsProvider';
import PageTemplate from '@kapoo/template/global/PageTemplate';
import PostsTemplate from '@kapoo/template/posts/PostsTemplate';
import { getMarkdownList } from '@kapoo/util/markdown';

import { ReactNode } from 'react';

/**
 * 게시글 페이지 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function PostsPage(): ReactNode
{
	const list = getMarkdownList('posts');

	return (
		<PageTemplate>
			<PostsProvider posts={list} />

			<PostsTemplate />
		</PageTemplate>
	);
}