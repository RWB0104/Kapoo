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
import remark from "remark";
import toc from "remark-toc";
import slug from "remark-slug";
import heading from "remark-autolink-headings";
import html from "remark-html";
import gfm from "remark-gfm";
import prism from "remark-prism";

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
 * @returns {Promise} 변환 Promise 객체
 */
export async function markdownToHtml(markdown)
{
	const headingOption = {
		linkProperties: {
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

	const result = await remark().use(toc, {parents: ["root", "blockquote"]}).use(slug).use(heading, headingOption).use(html).use(gfm).use(prism).process(markdown);

	return result.toString();
}