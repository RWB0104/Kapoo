import { getMarkdown, getMarkdownList } from '@kapoo/util/markdown';

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
		<div dangerouslySetInnerHTML={{ __html: markdown.content || '' }} />
	);
}

export async function generateStaticParams(): Promise<ProjectsDynamicPageParams[]>
{
	const list = getMarkdownList('projects');

	return list.map(({ names }) => ({ projects: names }));
}