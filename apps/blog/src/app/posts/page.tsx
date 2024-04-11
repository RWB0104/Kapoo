/**
 * 게시글 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.03.31 Sun 04:53:40
 */

import MarkdownPageTemplate from '@kapoo/blog-ui-pack/template/MarkdownPageTemplate';

import { getMetadata } from '../../common';

export const metadata = getMetadata({
	title: '게시글',
	url: '/posts'
});

/**
 * 게시글 페이지 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function PostsPage(): JSX.Element
{
	return (
		<MarkdownPageTemplate title={process.env.NEXT_PUBLIC_TITLE} type='posts' />
	);
}