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

const BASE_URL = 'https://rwb0104.github.io';
const CONTENT_DIR = join(process.cwd(), '_posts');
const FORMAT = {
	indentation: '	',
	collapseContent: true,
	lineSeparator: '\n'
};

seo();

/**
 * seo 생성 함수
 */
async function seo()
{
	console.log('==================================================');
	console.log('seo 파일 생성 시작\n\n');

	const page = await globby([
		'./pages/**/*.tsx',
		'!./pages/_*.tsx',
		'!./pages/**/[*.tsx'
	]);

	const posts = getContents('posts').sort((left, right) => (new Date(right.date) > new Date(left.date) ? -1 : 1));
	const projects = getContents('projects').sort((left, right) => (new Date(right.date) > new Date(left.date) ? -1 : 1));

	const pageUrl = page.reduce((acc, element) =>
	{
		const path = element.replace('./pages', '').replace('.tsx', '').replace('/index', '');

		acc += `<url>
			<loc>${BASE_URL}${path}</loc>
			<priority>0.5</priority>
			<lastmod>${new Date().toISOString()}</lastmod>
			<changefreq>weekly</changefreq>
		</url>
		`;

		return acc;
	}, '');

	console.log(' - 페이지 정보 조회 완료');

	let postUrl = '';
	let projectUrl = '';

	let postItem = '';
	let projectItem = '';

	posts.forEach(element =>
	{
		// 발행 대상일 경우
		if (element.publish)
		{
			const slugs = slugRegex.exec(element.slug);
			const tag = element.tag.reduce((acc, tags) =>
			{
				acc += element.category !== tags ? `<category>${tags}</category>\n` : '';
				return acc;
			}, `<category>${element.category}</category>\n`);

			postUrl += `<url>
				<loc>${BASE_URL}/${element.type}/${slugs[1]}/${slugs[2]}/${slugs[3]}/${slugs[4]}</loc>
				<priority>1.0</priority>
				<lastmod>${new Date(element.date).toISOString()}</lastmod>
				<changefreq>always</changefreq>
			</url>
			`;

			postItem += `<item>
				<title>${element.title.replace(/&/gi, '&amp;')}</title>
				<description>${element.excerpt.replace(/&/gi, '&amp;')}</description>
				<pubDate>${new Date(element.date).toUTCString().replace('GMT', '+0900')}</pubDate>
				<link>${BASE_URL}/${element.type}/${slugs[1]}/${slugs[2]}/${slugs[3]}/${slugs[4]}</link>
				<guid isPermaLink="true">${BASE_URL}/${element.type}/${slugs[1]}/${slugs[2]}/${slugs[3]}/${slugs[4]}</guid>
				${tag}
			</item>
			`;
		}
	});

	console.log(' - 게시글 정보 조회 완료');

	projects.forEach(element =>
	{
		// 발행 대상일 경우
		if (element.publish)
		{
			const tag = element.tag.reduce((acc, tags) =>
			{
				acc += element.category !== tags ? `<category>${tags}</category>\n` : '';
				return acc;
			}, `<category>${element.category}</category>\n`);

			projectUrl += `<url>
				<loc>${BASE_URL}/${element.type}/${element.slug}</loc>
				<priority>0.5</priority>
				<lastmod>${new Date(element.date).toISOString()}</lastmod>
				<changefreq>always</changefreq>
			</url>
			`;

			projectItem += `<item>
				<title>${element.title.replace(/&/gi, '&amp;')}</title>
				<description>${content.replace(/&/gi, '&amp;')}</description>
				<pubDate>${new Date(element.date).toUTCString().replace('GMT', '+0900')}</pubDate>
				<link>${BASE_URL}/${element.type}/${element.slug}</link>
				<guid isPermaLink="true">${BASE_URL}/${element.type}/${element.slug}</guid>
				${tag}
			</item>
			`;
		}
	});

	console.log(' - 프로젝트 정보 조회 완료');

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
	<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		${pageUrl.concat(postUrl, projectUrl).replace('\t', '')}
	</urlset>`;

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
	<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
		<channel>
			<title>Kapoo</title>
			<description>314159265359번째 알파카의 개발 낙서장</description>
			<link>https://rwb0104.github.io</link>
			<copyright>Copyright ⓒ RWB 2021.05</copyright>
			<language>ko-KR</language>
			<managingEditor>psj2716@gmail.com</managingEditor>
			<webMaster>psj2716@gmail.com</webMaster>
			<generator>Kapoo's next.seo.js</generator>
			<pubDate>${new Date('2021-05-26 23:36:57').toUTCString().replace('GMT', '+0900')}</pubDate>
			<lastBuildDate>${new Date().toUTCString().replace('GMT', '+0900')}</lastBuildDate>
			${postItem}
			${projectItem}
		</channel>
	</rss>`;

	fs.writeFileSync('./public/sitemap.xml', format(sitemap, FORMAT));
	fs.writeFileSync('./public/rss.xml', format(rss, FORMAT));

	console.log(' - seo 생성 완료');
	console.log('==================================================\n\n\n');
}

/**
 * 컨텐츠 제목 리스트 반환 함수
 *
 * @param {String} type: 타입
 *
 * @returns {String[]} 컨텐츠 제목 리스트
 */
function getContentSlugs(type)
{
	return fs.readdirSync(`${CONTENT_DIR}/${type}`);
}

/**
 * 컨텐츠 반환 함수
 *
 * @param {String} type: 타입
 * @param {String} slug: 게시물 제목
 *
 * @returns {Object} 컨텐츠 내용
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
 * @param {String} type: 타입
 *
 * @returns {JSON[]} 컨텐츠 리스트
 */
function getContents(type)
{
	return getContentSlugs(type).map((slug) => getContentBySlug(type, slug)).filter(post => post.publish);
}