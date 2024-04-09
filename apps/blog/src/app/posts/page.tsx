/**
 * 게시글 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.03.31 Sun 04:53:40
 */

import PageTemplate from '@kapoo/blog-ui-pack/template/PageTemplate';
import { getMarkdownAllList } from '@kapoo/markdown-kit';
import Screener from '@kapoo/ui-pack/organism/Screener';
import SearchInput from '@kapoo/ui-pack/organism/SearchInput';
import Stack from '@mui/material/Stack';
import Link from 'next/link';

import { markdownPath } from '../../common';

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

			<SearchInput name='keyword' />

			<Stack>
				{markdown.map(({ token, fullname }) => <Link href={`/posts/${token.join('/')}`} key={fullname}>/posts/{token.join('/')}</Link>)}
			</Stack>
		</PageTemplate>
	);
}