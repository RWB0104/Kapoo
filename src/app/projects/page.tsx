/**
 * 프로젝트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 Sat 20:09:24
 */

import { PAGE_INFO } from '@kapoo/env';
import PageTemplate from '@kapoo/template/global/PageTemplate';
import ProjectsTemplate from '@kapoo/template/projects/ProjectsTemplate';
import { getMetadata } from '@kapoo/util/common';
import { PROJECT_LIST } from '@kapoo/util/markdown';

import { ReactNode } from 'react';

export const metadata = getMetadata(PAGE_INFO.projects.title, PAGE_INFO.projects.description, undefined, PAGE_INFO.projects.url);

/**
 * 프로젝트 페이지 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ProjectsPage(): ReactNode
{
	return (
		<PageTemplate>
			<ProjectsTemplate markdownList={PROJECT_LIST} />
		</PageTemplate>
	);
}