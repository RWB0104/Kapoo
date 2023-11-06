/**
 * 프로젝트 리스트 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.23 Wed 18:49:21
 */

import MarkdownBox from '@kapoo/organism/markdown/MarkdownBox';
import { MarkdownListItemProps } from '@kapoo/util/markdown';

import Container from '@mui/material/Container';
import { ReactNode } from 'react';

export interface ProjectsListTemplateProps
{
	/**
	 * 마크다운 리스트
	 */
	markdownList: MarkdownListItemProps[];
}

/**
 * 프로젝트 리스트 박스 organism 컴포넌트 JSX 반환 메서드
 *
 * @param {ProjectsListTemplateProps} param0: ProjectsListTemplateProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function ProjectsListTemplate({ markdownList }: ProjectsListTemplateProps): ReactNode
{
	return (
		<Container data-component='ProjectsListTemplate'>
			<MarkdownBox markdownList={markdownList} />
		</Container>
	);
}