import { APP_INFO } from '@kapoo/env';
import ViewProvider from '@kapoo/organism/view/ViewProvider';
import PageTemplate from '@kapoo/template/global/PageTemplate';
import ViewTemplate from '@kapoo/template/view/ViewTemplate';
import { getMarkdown, getMarkdownList } from '@kapoo/util/markdown';

import { Metadata } from 'next';
import { ReactNode } from 'react';

export interface ProjectsDynamicPageParams
{
	projects: string[];
}

export interface ProjectsDynamicPageProps
{
	params: ProjectsDynamicPageParams;
}

export default function ProjectsDynamicPage({ params }: ProjectsDynamicPageProps): ReactNode
{
	const markdown = getMarkdown('projects', params.projects.join('-'));

	return (
		<PageTemplate>
			<ViewProvider markdown={markdown} />

			<ViewTemplate />
		</PageTemplate>
	);
}

export async function generateStaticParams(): Promise<ProjectsDynamicPageParams[]>
{
	const list = getMarkdownList('projects');

	return list.map(({ names }) => ({ projects: names }));
}

export async function generateMetadata({ params }: ProjectsDynamicPageProps): Promise<Metadata>
{
	const { frontmatter, url } = getMarkdown('projects', params.projects.join('-'));

	return {
		authors: [{ name: 'RWB', url: 'https://github.com/RWB0104' }],
		description: frontmatter.excerpt,
		icons: [ '/favicon.ico', { rel: 'shortcut icon', url: '/favicon.ico' }, { rel: 'apple-touch-icon', url: '/favicon.ico' }],
		metadataBase: new URL('https://blog.itcode.dev'),
		openGraph: {
			description: frontmatter.excerpt,
			images: frontmatter.coverImage,
			locale: 'ko-KR',
			siteName: APP_INFO.title,
			title: `${frontmatter.title} - ${APP_INFO.title}`,
			type: 'website',
			url: `https://blog.itcode.dev${url}`
		},
		title: `${frontmatter.title} - ${APP_INFO.title}`
	};
}