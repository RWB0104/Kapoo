/**
 * SEO 모듈
 *
 * @author RWB
 * @since 2021.05.26 Wed 16:45:19
 */

import { getContentList } from '@commons/api';
import { ContentProps, ContentTypeEnum, SeoProps } from '@commons/common';
import { BASE_URL, DESCRIPTION, TITLE } from '@commons/env';
import globby from 'globby';
import format from 'xml-formatter';

import fs from 'fs';

const FORMAT = {
	collapseContent: true,
	indentation: '\t',
	lineSeparator: '\n'
};

seo();

/**
 * SEO 함수
 */
async function seo()
{
	console.log('==================================================');
	console.log('SEO 생성 스크립트 시작');
	console.log();

	console.log('  - 페이지 정보 수집');

	const pages = await globby([
		'./pages/**/*.tsx',
		'!./pages/_*.tsx',
		'!./pages/**/[*.tsx'
	]);

	console.log(`    - ${pages.length}개 메뉴 페이지 수집`);

	const posts = await getContentList(ContentTypeEnum.POSTS, false);
	console.log(`    - ${posts.length}개 posts 페이지 수집`);

	const projects = await getContentList(ContentTypeEnum.PROJECTS, false);
	console.log(`    - ${projects.length}개 projects 페이지 수집`);

	console.log('    - ✅ 페이지 정보 수집 완료');
	console.log();

	console.log('  - SEO 텍스트 생성');

	const sitemap: SeoProps = {
		pages: [],
		posts: [],
		projects: []
	};

	const rss: SeoProps = {
		pages: [],
		posts: [],
		projects: []
	};

	pages.forEach((element) =>
	{
		const url = element.replace('./pages/index.tsx', '').replace('./pages', '').replace('/index.tsx', '').replace('.tsx', '');

		sitemap.pages.push(getMenuSitemap(url));
		rss.pages.push(getMenuRSS(element, url));
	});

	console.log(`    - ${pages.length}개 메뉴 페이지 SEO 텍스트 생성`);

	posts.forEach((content) =>
	{
		sitemap.posts.push(getSitemap(content));
		rss.posts.push(getRSS(content));
	});

	console.log(`    - ${posts.length}개 posts 페이지 SEO 텍스트 생성`);

	projects.forEach((content) =>
	{
		sitemap.projects.push(getSitemap(content));
		rss.projects.push(getRSS(content));
	});

	console.log(`    - ${projects.length}개 projects 페이지 SEO 텍스트 생성`);

	console.log('    - ✅ SEO 텍스트 생성 완료');
	console.log();

	console.log('  - SEO 파일 생성');

	const sitemapXml = makeSitemap(sitemap);
	const rssXml = makeRss(rss);

	const sitemapPath = './public/sitemap.xml';
	const rssPath = './public/rss.xml';

	fs.writeFileSync(sitemapPath, format(sitemapXml, FORMAT));
	console.log(`    - ${sitemapPath}`);
	console.log('   - ✅ sitemap.xml 생성 완료');

	fs.writeFileSync(rssPath, format(rssXml, FORMAT));
	console.log(`    - ${rssPath}`);
	console.log('   - ✅ rss.xml 생성 완료');
	console.log();

	console.log('SEO 생성 완료');
	console.log('==================================================');
}

/**
 * 사이트맵 텍스트 반환 함수
 *
 * @param {SeoProps} seo: SEO 객체
 *
 * @returns {string} 사이트맵 텍스트
 */
function makeSitemap(seo: SeoProps): string
{
	const { pages, posts, projects } = seo;

	return `
		<?xml version="1.0" encoding="UTF-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			${pages.join('\n')}
			${posts.join('\n')}
			${projects.join('\n')}
		</urlset>
	`;
}

/**
 * RSS 텍스트 반환 함수
 *
 * @param {SeoProps} seo: SEO 객체
 *
 * @returns {string} 사이트맵 텍스트
 */
function makeRss(seo: SeoProps): string
{
	const { pages, posts, projects } = seo;

	return `
		<?xml version="1.0" encoding="UTF-8"?>
		<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
			<channel>
				<title>${TITLE}</title>
				<description>${DESCRIPTION}</description>
				<link>${BASE_URL}</link>
				<copyright>Copyright ⓒ RWB 2021.05</copyright>
				<language>ko-KR</language>
				<managingEditor>psj2716@gmail.com</managingEditor>
				<webMaster>psj2716@gmail.com</webMaster>
				<generator>Kapoo's next-seo.js</generator>
				<pubDate>${new Date('2021-05-26 23:36:57').toUTCString()}</pubDate>
				<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
				${pages.join('\n')}
				${posts.join('\n')}
				${projects.join('\n')}
			</channel>
		</rss>
	`;
}

/**
 * 메뉴 페이지 사이트맵 아이템 반환 함수
 *
 * @param {string} url: URL
 *
 * @returns {string} 메뉴 페이지 사이트맵 아이템
 */
function getMenuSitemap(url: string): string
{
	return `
		<url>
			<loc>${BASE_URL}${url}</loc>
			<priority>1.0</priority>
			<lastmod>${new Date().toISOString()}</lastmod>
			<changefreq>always</changefreq>
		</url>
	`;
}

/**
 * 메뉴 페이지 RSS 텍스트 반환 함수
 *
 * @param {string} title: 컨텐츠 객체
 * @param {string} url: 경로
 *
 * @returns {string} 메뉴 페이지 RSS 텍스트
 */
function getMenuRSS(title: string, url: string): string
{
	const link = `${BASE_URL}${url}`;

	return `
		<item>
			<title>${title.replace(/&/gi, '&amp;')}</title>
			<description>${title.replace(/&/gi, '&amp;')}</description>
			<pubDate>${new Date().toUTCString()}</pubDate>
			<link>${link}</link>
			<guid isPermaLink="true">${link}</guid>
		</item>
	`;
}

/**
 * 사이트맵 텍스트 반환 함수
 *
 * @param {ContentProps} item: 컨텐츠 객체
 *
 * @returns {string} 사이트맵 텍스트
 */
function getSitemap(item: ContentProps)
{
	const { url, header } = item;
	const { type, date } = header;

	return `
		<url>
			<loc>${BASE_URL}/${type}/${url.slice(1, 5).join('/')}</loc>
			<priority>1.0</priority>
			<lastmod>${new Date(date).toISOString()}</lastmod>
			<changefreq>always</changefreq>
		</url>
	`;
}

/**
 * RSS 텍스트 반환 함수
 *
 * @param {ContentProps} item: 컨텐츠 객체
 *
 * @returns {string} RSS 텍스트
 */
function getRSS(item: ContentProps): string
{
	const { url, header } = item;
	const { title, date, excerpt, type } = header;

	const link = `${BASE_URL}/${type}/${url.slice(1, 5).join('/')}`;
	const tags = getRSSTags(item);

	return `
		<item>
			<title>${title.replace(/&/gi, '&amp;')}</title>
			<description>${excerpt}</description>
			<pubDate>${new Date(date).toUTCString()}</pubDate>
			<link>${link}</link>
			<guid isPermaLink="true">${link}</guid>
			${tags.join('\n')}
		</item>
	`;
}

/**
 * RSS 태그 리스트 반환 함수
 *
 * @param {ContentProps} item
 *
 * @returns {string[]} RSS 태그 리스트
 */
function getRSSTags(item: ContentProps): string[]
{
	const { category, tag } = item.header;

	const list: string[] = [];
	list.push(`<category>${category}</category>`);

	tag.forEach((item) =>
	{
		// 태그가 카테고리와 다른 값이고, 중복되지 않을 경우
		if (category !== item)
		{
			list.push(`<category>${item}</category>`);
		}
	});

	return list;
}