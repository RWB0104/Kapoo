/**
 * 프로젝트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.03.31 Sun 04:54:47
 */

import PageTemplate from '@kapoo/blog-ui-pack/template/PageTemplate';
import { getMarkdownAllList } from '@kapoo/markdown-kit';
import Screener from '@kapoo/ui-pack/organism/Screener';
import Stack from '@mui/material/Stack';
import Link from 'next/link';

import { markdownPath } from '../../common';

/**
 * 프로젝트 페이지 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function ProjectsPage(): JSX.Element
{
	const markdown = getMarkdownAllList(markdownPath.project);

	return (
		<PageTemplate title={process.env.NEXT_PUBLIC_TITLE}>
			<Screener />

			<Stack>
				{markdown.map(({ token, fullname }) => <Link href={`/projects/${token.join('/')}`} key={fullname}>/projects/{token.join('/')}</Link>)}
			</Stack>
		</PageTemplate>
	);
}