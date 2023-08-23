/**
 * 프로젝트 프로바이더 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.23 Wed 18:48:04
 */

'use client';

import { projectsStore } from '@kapoo/store/markdown';
import { MarkdownListItemProps } from '@kapoo/util/markdown';

import { useEffect } from 'react';

export interface ProjectsProviderProps
{
	/**
	 * 프로젝트
	 */
	projects: MarkdownListItemProps[];
}

/**
 * 프로젝트 프로바이더 organism 컴포넌트 JSX 반환 메서드
 *
 * @param {ProjectsProviderProps} param0: ProjectsProviderProps 객체
 */
export default function ProjectsProvider({ projects }: ProjectsProviderProps): null
{
	const { setMarkdown } = projectsStore();

	useEffect(() =>
	{
		setMarkdown(projects);
	}, [ projects ]);

	return null;
}