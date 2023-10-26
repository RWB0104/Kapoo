/**
 * 홈 신규 컨텐츠 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.09.10 Sun 01:33:46
 */

'use client';

import MarkdownList from '@kapoo/molecule/MarkdownList';
import { postsStore, projectsStore } from '@kapoo/store/markdown';
import { getNewist } from '@kapoo/util/common';
import { MarkdownListItemProps } from '@kapoo/util/markdown';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactNode, useMemo } from 'react';

/**
 * 홈 신규 컨텐츠 박스 organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function HomeNewistBox(): ReactNode
{
	const { markdown: postsMarkdown } = postsStore();
	const { markdown: projectsMarkdown } = projectsStore();

	const markdown: MarkdownListItemProps[] = useMemo(() =>
	{
		const list = [ ...postsMarkdown, ...projectsMarkdown ];

		return list.filter(({ frontmatter }) => getNewist(frontmatter.date))
			.sort((left, right) => (new Date(right.frontmatter.date).getTime() - new Date(left.frontmatter.date).getTime()));
	}, [ postsMarkdown, projectsMarkdown ]);

	return (
		<Stack data-component='HomeNewistBox' paddingBottom={4} paddingTop={4} spacing={8}>
			<Stack spacing={2}>
				<Typography fontWeight='bold' variant='h4'>✨ 신규 컨텐츠</Typography>
				<Typography color='GrayText'>2주 이내에 작성된 게시글/프로젝트의 목록입니다.</Typography>
			</Stack>

			<MarkdownList markdown={markdown} />
		</Stack>
	);
}