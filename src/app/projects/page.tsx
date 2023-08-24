/**
 * 프로젝트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 Sat 20:09:24
 */

import { APP_INFO } from '@kapoo/env';
import ProjectsProvider from '@kapoo/organism/projects/ProjectsProvider';
import PageTemplate from '@kapoo/template/global/PageTemplate';
import ProjectsTemplate from '@kapoo/template/projects/ProjectsTemplate';
import { getMarkdownList } from '@kapoo/util/markdown';

import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
	authors: [{ name: 'RWB', url: 'https://github.com/RWB0104' }],
	description: '🖥️ 무언가 뚝딱뚝딱 하는 중...',
	icons: [ '/favicon.ico', { rel: 'shortcut icon', url: '/favicon.ico' }, { rel: 'apple-touch-icon', url: '/favicon.ico' }],
	openGraph: {
		description: '🖥️ 무언가 뚝딱뚝딱 하는 중...',
		images: '/thumb.png',
		locale: 'ko-KR',
		siteName: APP_INFO.title,
		title: `프로젝트 - ${APP_INFO.title}`,
		type: 'website',
		url: 'https://blog.itcode.dev/projects'
	},
	title: `프로젝트 - ${APP_INFO.title}`
};

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