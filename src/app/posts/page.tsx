/**
 * 게시글 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 Sat 19:57:53
 */

import { APP_INFO } from '@kapoo/env';
import PostsProvider from '@kapoo/organism/posts/PostsProvider';
import PageTemplate from '@kapoo/template/global/PageTemplate';
import PostsTemplate from '@kapoo/template/posts/PostsTemplate';
import { getMarkdownList } from '@kapoo/util/markdown';

import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
	authors: [{ name: 'RWB', url: 'https://github.com/RWB0104' }],
	description: '✒️ 뭔가 끄적끄적 쓰는 중...',
	icons: [ '/favicon.ico', { rel: 'shortcut icon', url: '/favicon.ico' }, { rel: 'apple-touch-icon', url: '/favicon.ico' }],
	openGraph: {
		description: '✒️ 뭔가 끄적끄적 쓰는 중...',
		images: '/thumb.png',
		locale: 'ko-KR',
		siteName: APP_INFO.title,
		title: `게시글 - ${APP_INFO.title}`,
		type: 'website',
		url: 'https://blog.itcode.dev/posts'
	},
	title: `게시글 - ${APP_INFO.title}`
};

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