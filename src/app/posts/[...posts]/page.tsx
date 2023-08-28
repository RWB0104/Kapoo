import { getMarkdown, getMarkdownList } from '@kapoo/util/markdown';

import { ReactNode } from 'react';

export interface PostsDynamicPageParams
{
	posts: string[];
}

export interface PostsDynamicPageProps
{
	params: PostsDynamicPageParams;
}

export default function PostsDynamicPage({ params }: PostsDynamicPageProps): ReactNode
{
	const markdown = getMarkdown('posts', params.posts.join('-'));

	return (
		<div dangerouslySetInnerHTML={{ __html: markdown.content || '' }} />
	);
}

export async function generateStaticParams(): Promise<PostsDynamicPageParams[]>
{
	const list = getMarkdownList('posts');

	return list.map(({ names }) => ({ posts: names }));
}