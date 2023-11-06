/**
 * SEO 모듈
 *
 * @author RWB
 * @since 2023.09.02 Sat 20:07:53
 */

import { APP_INFO, AUTHOR, PAGE_INFO } from '@kapoo/env';
import { POST_LIST, PROJECT_LIST } from '@kapoo/util/markdown';

import fs from 'fs';

import { XmlElement, XmlOptions, toXML } from 'jstoxml';

type SitemapChangefreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

interface SitemapProps
{
	/**
	 * 링크
	 */
	loc: string;

	/**
	 * 빈도
	 */
	changefreq: SitemapChangefreq;

	/**
	 * 중요도
	 */
	priority: number;

	/**
	 * 변경일
	 */
	lastmod: string;
}

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

interface SeoProps
{
	/**
	 * 사이트맵
	 */
	sitemap: SitemapProps[];

	/**
	 * RSS
	 */
	rss: RssItemProps[];
}

const options: XmlOptions = {
	attributesFilter: {
		'"': '&quot;',
		'&': '&amp;',
		"'": '&apos;',
		'<': '&lt;',
		'>': '&gt;'
	},
	header: true,
	indent: '\t'
};

/**
 * SEO 객체 반환 메서드
 *
 * @returns {SeoProps} SEO 객체
 */
function getSeo(): SeoProps
{
	const markdowns = [ ...POST_LIST, ...PROJECT_LIST ];

	const now = new Date().toISOString();

	const sitemapList: SitemapProps[] = [];
	const rssList: RssItemProps[] = [];

	Object.values(PAGE_INFO).forEach(({ title, description, url }) =>
	{
		sitemapList.push({
			changefreq: 'daily',
			lastmod: now,
			loc: `${APP_INFO.baseurl}${url}`,
			priority: 0.5
		});

		rssList.push({
			description,
			link: `${APP_INFO.baseurl}${url}`,
			pubDate: now,
			title
		});
	});

	markdowns.forEach(({ url, frontmatter }) =>
	{
		const date = new Date(frontmatter.date).toISOString();

		sitemapList.push({
			changefreq: 'always',
			lastmod: date,
			loc: `${APP_INFO.baseurl}${url}`,
			priority: 1
		});

		rssList.push({
			category: frontmatter.category,
			description: frontmatter.excerpt,
			link: `${APP_INFO.baseurl}${url}`,
			pubDate: date,
			title: frontmatter.title
		});
	});

	return {
		rss: rssList,
		sitemap: sitemapList
	};
}

/**
 * sitemap 생성 메서드
 */
function generateSitemap(): void
{
	const size = 100;

	const { sitemap } = getSeo();

	const list: SitemapProps[][] = [];

	while (sitemap.length > 0)
	{
		list.push(sitemap.splice(0, size));
	}

	list.forEach((item, i) =>
	{
		const json: XmlElement = {
			_attrs: { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' },
			_content: item.map((i) => ({ url: i })),
			_name: 'urlset'
		};

		const xml = toXML(json, options);

		fs.writeFileSync(`./public/sitemap-${i}.xml`, xml);
	});

	const json: XmlElement = {
		_attrs: { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' },
		_content: list.map((item, i) => ({ sitemap: { loc: `${APP_INFO.baseurl}/sitemap-${i}.xml` } })),
		_name: 'sitemapindex'
	};

	const xml = toXML(json, options);

	fs.writeFileSync('./public/sitemap-index.xml', xml);
}

/**
 * rss 생성 메서드
 */
function generateRSS(): void
{
	const { rss } = getSeo();

	const item = rss.map(({ title, description, pubDate, link, category }) => ({
		item: [
			{ title },
			{ description },
			{ pubDate },
			{ link },
			{
				_attrs: { isPermaLink: 'true' },
				_content: link,
				_name: 'guid'
			},
			{ category }
		]
	}));

	const json: XmlElement = {
		_attrs: {
			version: '2.0',
			'xmlns:atom': 'http://www.w3.org/2005/Atom'
		},
		_content: {
			channel: [
				{ copyright: 'Copyright ⓒ RWB 2021.05' },
				{ description: APP_INFO.description },
				{ generator: 'blog.itcode.dev SEO' },
				{ language: 'ko-KR' },
				{ lastBuildDate: new Date().toISOString() },
				{ link: APP_INFO.baseurl },
				{ managingEditor: AUTHOR.email },
				{ pubDate: new Date('2021-05-26T23:36:57').toISOString() },
				{ title: APP_INFO.title },
				{ webMaster: AUTHOR.email },
				[ ...item ]
			]
		},
		_name: 'rss'
	};

	const xml = toXML(json, options);

	fs.writeFileSync('./public/rss.xml', xml);
}

generateSitemap();
generateRSS();