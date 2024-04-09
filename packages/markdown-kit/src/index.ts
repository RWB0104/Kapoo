/**
 * 마크다운 인덱스 모듈
 *
 * @author RWB
 * @since 2024.04.03 Wed 09:45:54
 */

import matter from 'gray-matter';

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

export interface MarkdownAllListItemProps
{
	/**
	 * 이름
	 */
	name: string;

	/**
	 * 파일 이름
	 */
	filename: string;

	/**
	 * 전체 이름
	 */
	fullname: string;

	/**
	 * 토큰
	 */
	token: string[];

	/**
	 * 경로
	 */
	path: string;

	/**
	 * 전체 경로
	 */
	fullpath: string;

	/**
	 * 사용자 파라미터
	 */
	params: string[];
}

export interface MarkdownTocProps
{
	/**
	 * 레벨
	 */
	level: number;

	/**
	 * 내용
	 */
	text: string;
}

export interface MarkdownDetailProps<T = Record<string, string>>
{
	/**
	 * 메타
	 */
	meta: T;

	/**
	 * 내용
	 */
	body: string;

	/**
	 * URL 배열
	 */
	urls: string[];

	/**
	 * TOC
	 */
	toc: MarkdownTocProps[];
}

export const markdownRegex = {
	codeBlock: /```[^]*?```/gim,
	fullname: /^(.*?).md$/,
	heading: /^(#{1,6}) (.+)$/gm,
	nameToken: /(19|20\d{2})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])-(.*).md/
};

/**
 * 전체 마크다운 목록 반환 비동기 메서드
 *
 * @param {string} path: 경로
 * @param {string[]} params: 사용자 파라미터
 *
 * @returns {Promise} 비동기 MarkdownAllListItem[]
 */
export function getMarkdownAllList(path: string, params: string[] = []): MarkdownAllListItemProps[]
{
	const fullpath = join(process.cwd(), path);

	return readdirSync(fullpath)
		.filter((filename) => markdownRegex.fullname.test(filename))
		.map<MarkdownAllListItemProps>((filename) => ({
			filename,
			fullname: join(fullpath, filename),
			fullpath,
			name: markdownRegex.fullname.exec?.(filename)?.[1] || filename,
			params,
			path,
			token: markdownRegex.nameToken.exec?.(filename)?.slice(1, 5) || []
		}))
		.sort((a, b) => b.filename.localeCompare(a.filename));
}

/**
 * 마크다운 TOC 반환 메서드
 *
 * @param {string} body: 마크다운 내용
 *
 * @returns {MarkdownTocProps[]} 마크다운 TOC 배열
 */
export function getMarkdownToc(body: string): MarkdownTocProps[]
{
	const flag = true;
	const list: MarkdownTocProps[] = [];

	const temp = body.replace(markdownRegex.codeBlock, '');

	while (flag)
	{
		const match = markdownRegex.heading.exec(temp);

		// 일치하는 정규식이 없을 경우
		if (match === null)
		{
			break;
		}

		list.push({
			level: match[1].trim().length,
			text: match[2].trim()
		});
	}

	return list;
}

/**
 * 마크다운 상세정보 반환 메서드
 *
 * @param {string} fullname: 전체 경로
 *
 * @returns {MarkdownDetailProps} 마크다운 상세 정보
 */
export function getMarkdownDetail<T = Record<string, string>>(fullname: string): MarkdownDetailProps<T>
{
	const names = markdownRegex.nameToken.exec(fullname);

	// 정규식과 일치하지 않는 경우
	if (names === null)
	{
		throw new Error(`[${fullname}] is Invalid markdown file name`);
	}

	const dir = join(process.cwd(), fullname);
	const file = readFileSync(dir, 'utf-8');

	const { data, content } = matter(file);

	const toc = getMarkdownToc(content);

	return {
		body: content,
		meta: data as T,
		toc,
		urls: names.slice(1, 5)
	};
}