/**
 * 프로젝트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 Sat 20:09:24
 */

import ProjectsProvider from '@kapoo/organism/projects/ProjectsProvider';
import PageTemplate from '@kapoo/template/global/PageTemplate';
import ProjectsTemplate from '@kapoo/template/projects/ProjectsTemplate';
import { getMarkdownList } from '@kapoo/util/markdown';

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
			<ProjectsProvider projects={list} />
			<ProjectsTemplate />
		</PageTemplate>
	);
}