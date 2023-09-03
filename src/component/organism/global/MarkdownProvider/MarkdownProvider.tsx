/**
 * 마크다운 프로바이더 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.09.03 Sun 23:35:25
 */

'use client';

import { postsStore, projectsStore } from '@kapoo/store/markdown';
import { MarkdownListItemProps } from '@kapoo/util/markdown';

import { useEffect } from 'react';

export interface MarkdownProviderProps
{
	/**
	 * 게시글 리스트
	 */
	posts: MarkdownListItemProps[];

	/**
	 * 프로젝트 리스트
	 */
	projects: MarkdownListItemProps[];
}

/**
 * 마크다운 프로바이더 organism 컴포넌트 메서드
 */
export default function MarkdownProvider({ posts, projects }: MarkdownProviderProps): null
{
	const { setMarkdown: setPostsMarkdown } = postsStore();
	const { setMarkdown: setProjectsMarkdown } = projectsStore();

	useEffect(() =>
	{
		setPostsMarkdown(posts);
	}, [ posts, setPostsMarkdown ]);

	useEffect(() =>
	{
		setProjectsMarkdown(projects);
	}, [ projects, setProjectsMarkdown ]);

	return null;
}