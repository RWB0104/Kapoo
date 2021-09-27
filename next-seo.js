/**
 * SEO JavaScript
 *
 * @author RWB
 * @since 2021.05.26 Wed 16:45:19
 */

// 라이브러리 모듈
const fs = require('fs');
const { join } = require('path');
const matter = require('gray-matter');
const globby = require('globby');
const format = require('xml-formatter');

const slugRegex = /^(19|20\d{2})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])-(.*)$/;

const BASE_URL = 'https://blog.itcode.dev';
const CONTENT_DIR = join(process.cwd(), '_posts');
const FORMAT = {
	indentation: '	',
	collapseContent: true,
	lineSeparator: '\n'
};

seo();

/**
 * SEO 함수
 */
async function seo()
{
	console.log('==================================================');
	console.log('SEO 생성 스크립트 시작\n\n');

	console.log(' - 페이지 정보 수집');

	const pages = await globby([
		'./pages/**/*.tsx',
		'!./pages/_*.tsx',
		'!./pages/**/[*.tsx'
	]);

	const posts = getContents('posts').sort((left, right) => (new Date(right.date) > new Date(left.date) ? -1 : 1));
	const projects = getContents('projects').sort((left, right) => (new Date(right.date) > new Date(left.date) ? -1 : 1));

	const sitemap = {
		normal: {
			pages: [],
			posts: [],
			projects: []
		},
		html: {
			pages: [],
			posts: [],
			projects: []
		}
	};

	const rss = {
		normal: {
			pages: [],
			posts: [],
			projects: []
		},
		html: {
			pages: [],
			posts: [],
			projects: []
		}
	};

	console.log(' - 페이지 SEO 생성');

	pages.forEach(element =>
	{
		const pathHtml = element.replace('./pages/index.tsx', '').replace('./pages', '').replace('.tsx', '.html').replace('/index', '');
		const path = pathHtml.replace('.html', '');

		sitemap.normal.pages.push(getMenuSitemap(path));
		sitemap.html.pages.push(getMenuSitemap(pathHtml));

		// RSS는 channel 태그에 인덱스 페이지가 들어가므로 제외
		if (element !== './pages/index.tsx')
		{
			rss.normal.pages.push(getMenuRSS(element, element, path));
			rss.html.pages.push(getMenuRSS(element, element, pathHtml));
		}
	});

	console.log(' - 포스트 SEO 생성');

	posts.forEach(element =>
	{
		const slugs = slugRegex.exec(element.slug);

		const { sitemapNormal, sitemapHtml } = getSitemap(element, slugs);
		const { rssNormal, rssHtml } = getRSS(element, slugs);

		sitemap.normal.posts.push(sitemapNormal);
		sitemap.html.posts.push(sitemapHtml);

		rss.normal.posts.push(rssNormal);
		rss.html.posts.push(rssHtml);
	});

	console.log(' - 프로젝트 SEO 생성');

	projects.forEach(element =>
	{
		const slugs = slugRegex.exec(element.slug);

		const { sitemapNormal, sitemapHtml } = getSitemap(element, slugs);
		const { rssNormal, rssHtml } = getRSS(element, slugs);

		sitemap.normal.projects.push(sitemapNormal);
		sitemap.html.projects.push(sitemapHtml);

		rss.normal.projects.push(rssNormal);
		rss.html.projects.push(rssHtml);
	});

	console.log(' - SEO 파일 생성');

	const sitemapDoc = makeSitemap(sitemap);
	const rssDoc = makeRss(rss);

	console.log('   - 일반 SEO 파일 생성');

	fs.writeFileSync('./public/sitemap.xml', format(sitemapDoc.normal, FORMAT));
	fs.writeFileSync('./public/rss.xml', format(rssDoc.normal, FORMAT));

	console.log('   - HTML SEO 파일 생성');

	fs.writeFileSync('./public/sitemap-html.xml', format(sitemapDoc.html, FORMAT));
	fs.writeFileSync('./public/rss-html.xml', format(rssDoc.html, FORMAT));

	console.log(' - SEO 완료');
	console.log('==================================================');
}

/**
 * 사이트맵 객체 반환 함수
 *
 * @param {{ normal: string, html: string }} sitemap: URL 객체
 *
 * @returns {{ normal: string, html: string }} 사이트맵 객체
 */
function makeSitemap(sitemap)
{
	const { normal, html } = sitemap;

	const normalSitemap = `
		<?xml version="1.0" encoding="UTF-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			${normal.pages.join('\n')}${normal.posts.join('\n')}${normal.projects.join('\n')}
		</urlset>
	`;

	const htmlSitemap = `
		<?xml version="1.0" encoding="UTF-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			${html.pages.join('\n')}${html.posts.join('\n')}${html.projects.join('\n')}
		</urlset>
	`;

	return {
		normal: format(normalSitemap, FORMAT),
		html: format(htmlSitemap, FORMAT)
	};
}

/**
 * RSS 객체 반환 함수
 *
 * @param {{ normal: string, html: string }} rss: URL 객체
 *
 * @returns {{ normal: string, html: string }} RSS 객체
 */
function makeRss(rss)
{
	const { normal, html } = rss;

	const normalRSS = `
		<?xml version="1.0" encoding="UTF-8"?>
		<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
			<channel>
				<title>𝝅번째 알파카의 개발 낙서장</title>
				<description>𝝅번째 알파카의 우당탕탕 개발 기록</description>
				<link>${BASE_URL}</link>
				<copyright>Copyright ⓒ RWB 2021.05</copyright>
				<language>ko-KR</language>
				<managingEditor>psj2716@gmail.com</managingEditor>
				<webMaster>psj2716@gmail.com</webMaster>
				<generator>Kapoo's next-seo.js</generator>
				<pubDate>${new Date('2021-05-26 23:36:57').toUTCString()}</pubDate>
				<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
				${normal.pages.join('\n')}
				${normal.posts.join('\n')}
				${normal.projects.join('\n')}
			</channel>
		</rss>
	`;

	const htmlRSS = `
		<?xml version="1.0" encoding="UTF-8"?>
		<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
			<channel>
				<title>𝝅번째 알파카의 개발 낙서장</title>
				<description>𝝅번째 알파카의 우당탕탕 개발 기록</description>
				<link>${BASE_URL}</link>
				<copyright>Copyright ⓒ RWB 2021.05</copyright>
				<language>ko-KR</language>
				<managingEditor>psj2716@gmail.com</managingEditor>
				<webMaster>psj2716@gmail.com</webMaster>
				<generator>Kapoo's next-seo.js</generator>
				<pubDate>${new Date('2021-05-26 23:36:57').toUTCString()}</pubDate>
				<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
				${html.pages.join('\n')}
				${html.posts.join('\n')}
				${html.projects.join('\n')}
			</channel>
		</rss>
	`;

	return {
		normal: format(normalRSS, FORMAT),
		html: format(htmlRSS, FORMAT)
	};
}

/**
 * 메뉴 페이지 사이트맵 아이템 반환 함수
 *
 * @param {string} path: URL
 *
 * @returns {string} 메뉴 페이지 사이트맵 아이템
 */
function getMenuSitemap(path)
{
	return `<url>
		<loc>${BASE_URL}${path}</loc>
		<priority>1.0</priority>
		<lastmod>${new Date().toISOString()}</lastmod>
		<changefreq>always</changefreq>
	</url>`;
}

/**
 * 메뉴 페이지 RSS 아이템 반환 함수
 *
 * @param {string} title: 제목
 * @param {string} excerpt: 내용
 * @param {string} path: URL
 *
 * @returns {string} 메뉴 페이지 RSS 아이템
 */
function getMenuRSS(title, excerpt, path)
{
	const link = `${BASE_URL}${path}`;

	return `<item>
		<title>${title.replace(/&/gi, '&amp;')}</title>
		<description>${excerpt.replace(/&/gi, '&amp;')}</description>
		<pubDate>${new Date().toUTCString()}</pubDate>
		<link>${link}</link>
		<guid isPermaLink="true">${link}</guid>
	</item>`;
}

/**
 * 일반 사이트맵 아이템 반환 함수
 *
 * @param {JSON} url: 페이지 정보
 *
 * @returns {JSON} 사이트맵 아이템
 */
function getSitemap(url, slugs)
{
	return {
		normal : `<url>
			<loc>${BASE_URL}/${url.type}/${slugs[1]}/${slugs[2]}/${slugs[3]}/${slugs[4]}</loc>
			<priority>1.0</priority>
			<lastmod>${new Date(url.date).toISOString()}</lastmod>
			<changefreq>always</changefreq>
		</url>`,
		html: `<url>
			<loc>${BASE_URL}/${url.type}/${slugs[1]}/${slugs[2]}/${slugs[3]}/${slugs[4]}.html</loc>
			<priority>1.0</priority>
			<lastmod>${new Date(url.date).toISOString()}</lastmod>
			<changefreq>always</changefreq>
		</url>`
	};
}

/**
 * 일반 RSS 아이템 반환 함수
 *
 * @param {JSON} item: 페이지 정보
 *
 * @returns {JSON} RSS 아이템
 */
function getRSS(item, slugs)
{
	const link = `${BASE_URL}/${item.type}/${slugs[1]}/${slugs[2]}/${slugs[3]}/${slugs[4]}`;
	const linkHtml = `${BASE_URL}/${item.type}/${slugs[1]}/${slugs[2]}/${slugs[3]}/${slugs[4]}.html`;
	const tags = getRSSTags(item).join('\n');

	return {
		normal : `<item>
			<title>${item.title.replace(/&/gi, '&amp;')}</title>
			<description>${item.excerpt.replace(/&/gi, '&amp;')}</description>
			<pubDate>${new Date(item.date).toUTCString()}</pubDate>
			<link>${link}</link>
			<guid isPermaLink="true">${link}</guid>
			${tags}
		</item>`,
		html : `<item>
			<title>${item.title.replace(/&/gi, '&amp;')}</title>
			<description>${item.excerpt.replace(/&/gi, '&amp;')}</description>
			<pubDate>${new Date(item.date).toUTCString()}</pubDate>
			<link>${linkHtml}</link>
			<guid isPermaLink="true">${linkHtml}</guid>
			${tags}
		</item>`
	};
}

/**
 * RSS 태그 반환 함수
 *
 * @param {string} item
 *
 * @returns {string[]} 태그
 */
function getRSSTags(item)
{
	const tag = [];

	tag.push(`<category>${item.category}</category>`);

	item.tag.forEach(e =>
	{
		// 태그가 카테고리와 다른 값이고, 중복되지 않을 경우
		if (item.category !== e && tag.indexOf(e) == -1)
		{
			tag.push(`<category>${e}</category>`);
		}
	});

	return tag;
}

/**
 * 컨텐츠 제목 리스트 반환 함수
 *
 * @param {string} type: 타입
 *
 * @returns {string[]} 컨텐츠 제목 리스트
 */
function getContentSlugs(type)
{
	return fs.readdirSync(`${CONTENT_DIR}/${type}`).filter(e => e.search(/.md$/));
}

/**
 * 컨텐츠 반환 함수
 *
 * @param {string} type: 타입
 * @param {string} slug: 게시물 제목
 *
 * @returns {{ [key: string]: any }} 컨텐츠 내용
 */
function getContentBySlug(type, slug)
{
	const realSlug = slug.replace(/\.md$/, '');
	const fullPath = join(`${CONTENT_DIR}/${type}`, `${realSlug}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');
	const { data, content } = matter(fileContents);

	return {
		...data,
		slug: realSlug,
		content: content
	};
}

/**
 * 컨텐츠 리스트 반환 함수
 *
 * @param {string} type: 타입
 *
 * @returns {JSON[]} 컨텐츠 리스트
 */
function getContents(type)
{
	return getContentSlugs(type).map((slug) => getContentBySlug(type, slug)).filter(post => post.publish);
}