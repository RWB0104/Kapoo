/**
 * RSS 라우트
 *
 * @author RWB
 * @since 2024.05.02 Thu 13:30:03
 */

import { getMarkdownDetailListForGrid } from '@kapoo/blog-ui-pack/common';
import { RssItemProps, getBaseRss } from '@kapoo/common';

import { routers } from '../../common';

/**
 * RSS 라우트 GET 메서드
 *
 * @returns {Response} Response
 */
export function GET(): Response
{
	const postsList = getMarkdownDetailListForGrid('posts');
	const projectsList = getMarkdownDetailListForGrid('projects');
	const totalList = postsList.concat(projectsList);

	const date = new Date().toISOString();

	const rssList: RssItemProps[] = [
		{
			description: routers.home.subtitle,
			link: process.env.NEXT_PUBLIC_BASE_URL,
			pubDate: date,
			title: routers.home.title
		},
		{
			description: routers.posts.subtitle,
			link: `${process.env.NEXT_PUBLIC_BASE_URL}/posts`,
			pubDate: date,
			title: routers.posts.title
		},
		{
			description: routers.projects.subtitle,
			link: `${process.env.NEXT_PUBLIC_BASE_URL}/projects`,
			pubDate: date,
			title: routers.projects.title
		},
		{
			description: routers.comments.subtitle,
			link: `${process.env.NEXT_PUBLIC_BASE_URL}/comments`,
			pubDate: date,
			title: routers.comments.title
		}
	];

	totalList.forEach(({ meta: { title, excerpt, tag }, url }) => rssList.push({
		category: tag,
		description: excerpt,
		link: `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
		pubDate: date,
		title
	}));

	const rss = getBaseRss({
		description: process.env.NEXT_PUBLIC_DESCRIPTION,
		link: process.env.NEXT_PUBLIC_BASE_URL,
		title: process.env.NEXT_PUBLIC_TITLE
	}, rssList);

	return new Response(rss, { headers: { 'Content-Type': 'text/xml' } });
}