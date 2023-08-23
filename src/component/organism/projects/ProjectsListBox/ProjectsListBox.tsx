/**
 * 프로젝트 리스트 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.23 Wed 18:47:09
 */

'use client';

import MarkdownList, { MarkdownListRenderer } from '@kapoo/organism/global/MarkdownList';
import { projectsStore } from '@kapoo/store/markdown';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReactNode, useCallback } from 'react';

/**
 * 프로젝트 리스트 박스 organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ProjectsListBox(): ReactNode
{
	const { markdown } = projectsStore();

	const render: MarkdownListRenderer = useCallback((i) => <Typography>{i.frontmatter.title}</Typography>, []);

	return (
		<Box data-component='ProjectsListBox'>
			<MarkdownList markdown={markdown} render={render} />
		</Box>
	);
}