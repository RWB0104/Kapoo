/**
 * RSS 라우트
 *
 * @author RWB
 * @since 2024.05.02 Thu 13:30:03
 */

import { getMarkdownDetailListForGrid } from '@kapoo/blog-ui-pack/common';
import { author } from '@kapoo/common';
import { NextRequest, NextResponse } from 'next/server';

import { routers } from '../../common';

interface RssItemProps
{
	/**
	 * 제목
	 */
	title: string;

	/**
	 * 설명
	 */
	description: string;

	/**
	 * 발행일자
	 */
	pubDate: string;

	/**
	 * 링크
	 */
	link: string;

	/**
	 * 카테고리
	 */
	category?: string;
}

/**
 * RSS 라우트 GET 메서드
 *
 * @param {NextRequest} req: NextRequest
 * @param {NextResponse} res: NextResponse
 *
 * @returns {Response} Response
 */
export function GET(req: NextRequest, res: NextResponse<Response>): Response
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

	totalList.forEach(({ meta: { title, excerpt }, url }) => rssList.push({
		description: excerpt,
		link: `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
		pubDate: date,
		title
	}));

	const item = rssList.map((i) =>
	{
		let { title } = i;
		title = title.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;')
			.replace(/&/g, '&amp;');

		const desc = i.description.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;')
			.replace(/&/g, '&amp;');

		return `
			<item>
				<title>${title}</title>
				<description>${desc}</description>
				<pubDate>${i.pubDate}</pubDate>
				<link>${i.link}</link>
				<guid isPermaLink="true">${i.link}</guid>
				${i.category ? `<category>${i.category}</category>` : ''}
			</item>
		`;
	});

	const xmlContent = `
	<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
		<channel>
			<copyright>Copyright ⓒ ${author.nickname} 2021.05</copyright>
			<description>${process.env.NEXT_PUBLIC_DESCRIPTION}</description>
			<generator>blog.itcode.dev</generator>
			<language>ko-KR</language>
			<lastBuildDate>${date}</lastBuildDate>
			<link>${process.env.NEXT_PUBLIC_BASE_URL}</link>
			<managingEditor>${author.email}</managingEditor>
			<pubDate>2021-05-26T23:36:57.000Z</pubDate>
			<title>${process.env.NEXT_PUBLIC_TITLE}</title>
			<webMaster>${author.email}</webMaster>
			${item}
		</channel>
	</rss>
	`;

	return new Response(xmlContent, { headers: { 'Content-Type': 'text/xml' } });
}