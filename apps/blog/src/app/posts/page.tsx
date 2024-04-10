/**
 * 게시글 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.03.31 Sun 04:53:40
 */

import { getMarkdownDetailBySlug, markdownPath } from '@kapoo/blog-ui-pack/common';
import MarkdownGrid from '@kapoo/blog-ui-pack/organism/MarkdownGrid';
import PageTemplate from '@kapoo/blog-ui-pack/template/PageTemplate';
import { getMarkdownAllList } from '@kapoo/markdown-kit';
import Screener from '@kapoo/ui-pack/organism/Screener';
import Container from '@mui/material/Container';

interface PathParams
{
	/**
	 * 페이지
	 */
	page: number;

	/**
	 * 카테고리
	 */
	category?: string[];

	/**
	 * 키워드
	 */
	keyword?: string;
}

type PageParams = NextPageProps<unknown, PathParams>;

/**
 * 게시글 페이지 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function PostsPage({ searchParams }: PageParams): JSX.Element
{
	const page = searchParams?.page || 1;

	const markdown = getMarkdownAllList(markdownPath.post)
		.map(({ token }) =>
		{
			const slug = [ 'posts', ...token ];
			return getMarkdownDetailBySlug(slug);
		});

	const filteredMarkdown = markdown.slice(0, page * 6);

	return (
		<PageTemplate title={process.env.NEXT_PUBLIC_TITLE}>
			<Screener />

			<Container>
				<MarkdownGrid list={filteredMarkdown} />
			</Container>
		</PageTemplate>
	);
}