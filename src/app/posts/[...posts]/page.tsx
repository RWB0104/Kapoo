import { APP_INFO } from '@kapoo/env';
import ViewProvider from '@kapoo/organism/view/ViewProvider';
import PageTemplate from '@kapoo/template/global/PageTemplate';
import ViewTemplate from '@kapoo/template/view/ViewTemplate';
import { getMarkdown, getMarkdownList } from '@kapoo/util/markdown';

import { Metadata } from 'next';
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
		<PageTemplate>
			<ViewProvider markdown={markdown} />

			<ViewTemplate />
		</PageTemplate>
	);
}

export async function generateStaticParams(): Promise<PostsDynamicPageParams[]>
{
	const list = getMarkdownList('posts');

	return list.map(({ names }) => ({ posts: names }));
}

export async function generateMetadata({ params }: PostsDynamicPageProps): Promise<Metadata>
{
	const { frontmatter, url } = getMarkdown('posts', params.posts.join('-'));

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