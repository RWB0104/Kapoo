/**
 * RSS 생성 JavaScript
 *
 * @author RWB
 * @since 2021.05.26 Wed 16:45:19
 */

// 라이브러리 모듈
const fs = require("fs");
const { join } = require("path");
const matter = require("gray-matter");
const remark = require("remark");
const html = require("remark-html");
const gfm = require("remark-gfm");
const prism = require("remark-prism");
const globby = require("globby");
const format = require("xml-formatter");

const BASE_URL = "https://rwb0104.github.io";
const CONTENT_DIR = join(process.cwd(), "_posts");
const FORMAT = {
	indentation: "	",
	collapseContent: true,
	lineSeparator: "\n"
};

genSitemap();
genRss();

/**
 * 사이트맵 생성 함수
 */
async function genSitemap()
{
	console.log("=========================");
	console.log("sitemap.xml 생성 중...");
	console.log("=========================\n\n\n");

	const page = await globby([
		"./pages/**/*.js",
		"!./pages/_*.js",
		"!./pages/**/[slug].js"
	]);

	const posts = getContents("posts");
	const projects = getContents("projects");

	const pageUrl = page.reduce((acc, element) =>
	{
		const path = element.replace("./pages", "").replace(".js", "/").replace("/index", "");

		acc += `<url>
			<loc>${BASE_URL}${path}</loc>
			<priority>1.00</priority>
			<lastmod>${new Date().toISOString()}</lastmod>
			<changefreq>weekly</changefreq>
		</url>
		`;

		return acc;
	}, "");

	const postsUrl = posts.reduce((acc, element) =>
	{
		// 발행 대상일 경우
		if (element.publish)
		{
			acc += `<url>
				<loc>${BASE_URL}/${element.type}/${element.slug}/</loc>
				<priority>0.5</priority>
				<lastmod>${new Date(element.date).toISOString()}</lastmod>
				<changefreq>monthly</changefreq>
			</url>
			`;
		}

		return acc;
	}, []);

	const projectsUrl = projects.reduce((acc, element) =>
	{
		// 발행 대상일 경우
		if (element.publish)
		{
			acc += `<url>
				<loc>${BASE_URL}/${element.type}/${element.slug}/</loc>
				<priority>0.5</priority>
				<lastmod>${new Date(element.date).toISOString()}</lastmod>
				<changefreq>monthly</changefreq>
			</url>
			`;
		}

		return acc;
	}, []);

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
	<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		${pageUrl.concat(postsUrl, projectsUrl).replace("\t", "")}
	</urlset>`;

	fs.writeFileSync("./public/sitemap.xml", format(sitemap, FORMAT));

	console.log("=========================");
	console.log("./public/sitemap.xml 생성 완료");
	console.log("=========================");
}

/**
 * RSS 생성 함수
 */
export function genRss()
{
	console.log("=========================");
	console.log("rss.xml 생성 중...");
	console.log("=========================\n\n\n");

	const posts = getContents("posts");
	const projects = getContents("projects");

	const postsItem = posts.reduce((acc, element) =>
	{
		// 발행 대상일 경우
		if (element.publish)
		{
			const content = markdownToHtml(element.content).replace(/&/g, "&amp;").replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/"/gi, "&quot;");
			const tag = element.tag.reduce((acc, element) =>
			{
				acc += `<category>${element}</category>\n`;
				return acc;
			}, `<category>${element.category}</category>\n`);

			acc += `<item>
				<title>${element.title}</title>
				<description>${content}</description>
				<pubDate>${new Date(element.date).toISOString()}</pubDate>
				<link>${BASE_URL}/${element.type}/${element.slug}/</link>
				<guid isPermaLink="true">${BASE_URL}/${element.type}/${element.slug}/</guid>
				<category>${element.category}</category>
				${tag}
			</item>
			`;
		}

		return acc;
	}, []);

	const projectsItem = projects.reduce((acc, element) =>
	{
		// 발행 대상일 경우
		if (element.publish)
		{
			const content = markdownToHtml(element.content).replace(/&/g, "&amp;").replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/"/gi, "&quot;");
			const tag = element.tag.reduce((acc, element) =>
			{
				acc += `<category>${element}</category>\n`;
				return acc;
			}, `<category>${element.category}</category>\n`);

			acc += `<item>
				<title>${element.title}</title>
				<description>${content}</description>
				<pubDate>${new Date(element.date).toISOString()}</pubDate>
				<link>${BASE_URL}/${element.type}/${element.slug}/</link>
				<guid isPermaLink="true">${BASE_URL}/${element.type}/${element.slug}/</guid>
				<category>${element.category}</category>
				${tag}
			</item>
			`;
		}

		return acc;
	}, []);

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
	<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
		<channel>
			<title>Kapoo</title>
			<description>314159265359번째 알파카의 개발 낙서장</description>
			<link>https://rwb0104.github.io//</link>
			<atom:link href="https://rwb0104.github.io/feed.xml" rel="self" type="application/rss+xml"/>
			<pubDate>${new Date("2021-05-26 23:36:57").toISOString()}</pubDate>
			<lastBuildDate>${new Date().toISOString()}</lastBuildDate>
		</channel>
		${postsItem}
		${projectsItem}
	</rss>`;

	fs.writeFileSync("./public/rss.xml", format(rss, FORMAT));

	console.log("=========================");
	console.log("./public/rss.xml 생성 완료");
	console.log("=========================");
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
	const realSlug = slug.replace(/\.md$/, "");
	const fullPath = join(`${CONTENT_DIR}/${type}`, `${realSlug}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");
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

/**
 * Markdown HTML 변환 및 반환 함수
 *
 * @returns {Promise} 변환 Promise 객체
 */
function markdownToHtml(markdown)
{
	const result = remark().use(html).use(gfm).use(prism).processSync(markdown);

	return result.toString();
}