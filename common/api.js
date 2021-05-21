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
import html from "remark-html";
import gfm from "remark-gfm";
import prism from "remark-prism";

const POST_DIR = join(process.cwd(), "_posts");

/**
 * 게시물 제목 리스트 반환 함수
 *
 * @param {String} type: 타입
 *
 * @returns {String[]} 게시물 제목 리스트
 */
export function getPostSlugs(type)
{
	return fs.readdirSync(`${POST_DIR}/${type}`);
}

/**
 * 게시물 반환 함수
 *
 * @param {String} slug: 게시물 제목
 * @param {String[]} fields: 메타데이터 필드
 *
 * @returns
 */
export function getPostBySlug(type, slug)
{
	const realSlug = slug.replace(/\.md$/, "");
	const fullPath = join(`${POST_DIR}/${type}`, `${realSlug}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");
	const { data, content } = matter(fileContents);

	return {
		...data,
		slug: realSlug,
		content: content
	};
}

/**
 * 게시물 리스트 반환 함수
 *
 * @param {String} type: 타입
 *
 * @returns {JSON[]} 게시물 리스트
 */
export function getPosts(type)
{
	return getPostSlugs(type).map((slug) => getPostBySlug(type, slug)).filter(post => post.publish);
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
	const result = await remark().use(html).use(gfm).use(prism).process(markdown);

	return result.toString();
}