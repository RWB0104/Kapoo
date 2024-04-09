/**
 * 게시글 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.03.31 Sun 04:53:40
 */

import MarkdownCard from '@kapoo/blog-ui-pack/organism/MarkdownCard';
import PageTemplate from '@kapoo/blog-ui-pack/template/PageTemplate';
import { getMarkdownAllList } from '@kapoo/markdown-kit';
import Screener from '@kapoo/ui-pack/organism/Screener';
import Stack from '@mui/material/Stack';

import { getMarkdownDetailBySlug, markdownPath } from '../../common';

interface PathParams
{
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
	const markdown = getMarkdownAllList(markdownPath.post);

	return (
		<PageTemplate title={process.env.NEXT_PUBLIC_TITLE}>
			<Screener />

			<Stack>
				{markdown.map(({ token }) =>
				{
					const slug = [ 'posts', ...token ];
					const { meta } = getMarkdownDetailBySlug(slug);

					return (
						<MarkdownCard
							category={meta.category}
							description={meta.excerpt}
							href={slug.join('/')}
							key={slug.join('/')}
							thumbnail={meta.coverImage}
							timestamp={meta.date}
							title={meta.title}
						/>
					);
				})}
			</Stack>
		</PageTemplate>
	);
}