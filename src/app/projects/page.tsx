/**
 * 프로젝트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 토 20:09:24
 */

import PageTemplate from '@kapoo/template/global/PageTemplate';
import ProjectsScreenerTemplate from '@kapoo/template/projects/ProjectsScreenerTemplate';
import { getMarkdownList } from '@kapoo/util/markdown';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

/**
 * 프로젝트 페이지 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ProjectsPage(): ReactNode
{
	const list = getMarkdownList('projects');

	return (
		<PageTemplate>
			<ProjectsScreenerTemplate />

			{list.map((i) => (
				<Stack key={i.url}>
					<Typography>{i.frontmatter.title}</Typography>
				</Stack>
			))}
		</PageTemplate>
	);
}