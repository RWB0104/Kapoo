/**
 * RSS 라우트
 *
 * @author RWB
 * @since 2024.06.07 Fri 15:06:44
 */

import { RssItemProps, getBaseRss } from '@kapoo/common';
import { getMarkdownDetailList } from '@kapoo/markdown-kit';
import { MarkdownHeaderProps, getId } from '@kapoo/root-ui-pack/common';

import { routers } from '../../common';

/**
 * RSS 라우트 GET 메서드
 *
 * @returns {Response} Response
 */
export function GET(): Response
{
	const list = getMarkdownDetailList<MarkdownHeaderProps>('src/markdown')
		.filter(({ meta }) => !meta.disabled);

	const date = new Date().toISOString();

	const rssList: RssItemProps[] = [
		{
			description: routers.home.subtitle,
			link: process.env.NEXT_PUBLIC_BASE_URL,
			pubDate: date,
			title: routers.home.title
		},
		{
			description: routers.projects.subtitle,
			link: `${process.env.NEXT_PUBLIC_BASE_URL}/projects`,
			pubDate: date,
			title: routers.projects.title
		},
		{
			description: routers.guestbook.subtitle,
			link: `${process.env.NEXT_PUBLIC_BASE_URL}/guestbook`,
			pubDate: date,
			title: routers.guestbook.title
		}
	];

	list.forEach(({ meta: { title, subtitle, languages }, filename }) => rssList.push({
		category: languages,
		description: subtitle.join(' '),
		link: `${process.env.NEXT_PUBLIC_BASE_URL}/projects?id=${getId(filename)}`,
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