/**
 * API JavaScript
 *
 * @author RWB
 * @since 2021.05.08 Sat 20:13:57
 */

// 라이브러리 모듈
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import unified from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import slug from "remark-slug";
import gfm from "remark-gfm";
import prism from "remark-prism";
import rehypeParse from "rehype-parse";
import rehypeToc from "rehype-toc";
import rehypeStr from "rehype-stringify";
import headings from "rehype-autolink-headings";
import mathjax from "rehype-mathjax";
import math from "remark-math";
import katex from "rehype-katex";
import raw from "rehype-raw";

const CONTENT_DIR = join(process.cwd(), "_posts");

/**
 * 컨텐츠 제목 리스트 반환 함수
 *
 * @param {String} type: 타입
 *
 * @returns {String[]} 컨텐츠 제목 리스트
 */
export function getContentSlugs(type)
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
export function getContentBySlug(type, slug)
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
export function getContents(type)
{
	return getContentSlugs(type).map((slug) => getContentBySlug(type, slug)).filter(post => post.publish);
}

/**
 * 메인 이미지 리스트 반환 함수
 *
 * @returns {JSON[]} 메인 이미지 리스트
 */
export function getMainImages()
{
	return fs.readdirSync(join(process.cwd(), "public", "assets", "images", "main"));
}

/**
 * Markdown HTML 변환 및 반환 함수
 *
 * @param {String} body: 내용
 *
 * @returns {Promise} 변환 Promise 객체
 */
export async function markdownToHtml(body)
{
	const tocOptions = {
		nav: true,
		cssClasses: {
			toc: "toc-wrap",
			link: "toc-link"
		}
	};

	const headingOptions = {
		properties: {
			className: [ "head-link" ]
		},
		content: {
			type: "element",
			tagName: "span",
			children: [
				{
					type: "text",
					value: "🔗"
				}
			]
		}
	};

	console.dir(unified().use(remarkParse).use(remarkRehype).use(rehypeStr).processSync(body));

	const t = await unified().use(remarkParse).use(math).use(slug).use(prism, {
		plugins: [
			"autolinker",
			"command-line",
			"data-uri-highlight",
			"diff-highlight",
			"inline-color",
			"keep-markup",
			"line-numbers"
		  ]
	}).use(remarkRehype, { allowDangerousHtml: true }).use(raw).use(katex).use(rehypeStr).use(gfm).use(rehypeToc, tocOptions).use(headings, headingOptions).process(body);

	return t.toString();
}