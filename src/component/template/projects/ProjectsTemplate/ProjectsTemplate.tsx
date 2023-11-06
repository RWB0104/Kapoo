/**
 * 프로젝트 template 컴포넌트
 *
 * @author RWB
 * @since 2023.08.23 Wed 18:50:17
 */

import ProjectsListTemplate from '@kapoo/template/projects/ProjectsListTemplate';
import ProjectsScreenerTemplate from '@kapoo/template/projects/ProjectsScreenerTemplate';
import { MarkdownListItemProps } from '@kapoo/util/markdown';

import Stack from '@mui/material/Stack';
import { ReactNode } from 'react';

export interface ProjectsTemplateProps
{
	/**
	 * 마크다운 리스트
	 */
	markdownList: MarkdownListItemProps[];
}

/**
 * 프로젝트 template 컴포넌트 JSX 반환 메서드
 *
 * @param {ProjectsTemplateProps} param0: ProjectsTemplateProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function ProjectsTemplate({ markdownList }: ProjectsTemplateProps): ReactNode
{
	return (
		<Stack alignItems='center' data-component='ProjectsTemplate' spacing={10}>
			<ProjectsScreenerTemplate />
			<ProjectsListTemplate markdownList={markdownList} />
		</Stack>
	);
}