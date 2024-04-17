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
	 *
	 * @example yyyy-MM-dd-filename
	 */
	name: string;

	/**
	 * 파일 이름
	 *
	 * @example yyyy-MM-dd-filename.md
	 */
	filename: string;

	/**
	 * 전체 이름
	 *
	 * @example /root/workspace/src/dir/yyyy-MM-dd-filename.md
	 */
	fullname: string;

	/**
	 * 토큰
	 *
	 * @example [ 'yyyy', 'MM', 'dd', 'filename' ]
	 */
	token: string[];

	/**
	 * 경로
	 *
	 * @example src/dir
	 */
	path: string;

	/**
	 * 전체 경로
	 *
	 * @example /root/workspace/src/dir
	 */
	fullpath: string;

	/**
	 * 대상
	 *
	 * @example src/dir/yyyy-MM-dd-filename.md
	 */
	target: string;
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

	/**
	 * 인덱스
	 */
	idx: string;
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
 *
 * @returns {Promise} 비동기 MarkdownAllListItem[]
 */
export function getMarkdownAllList(path: string): MarkdownAllListItemProps[]
{
	const fullpath = join(process.cwd(), path);

	return readdirSync(fullpath)
		.filter((filename) => markdownRegex.fullname.test(filename))
		.map<MarkdownAllListItemProps>((filename) => ({
			filename,
			fullname: join(fullpath, filename),
			fullpath,
			name: markdownRegex.fullname.exec?.(filename)?.[1] || filename,
			path,
			target: join(path, filename),
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

	const idx = [ 0, 0, 0, 0, 0, 0 ];

	while (flag)
	{
		const match = markdownRegex.heading.exec(temp);

		// 일치하는 정규식이 없을 경우
		if (match === null)
		{
			break;
		}

		const level = match[1].trim().length;

		idx[level - 1] += 1;

		idx.fill(0, level, 6);

		list.push({
			idx: `${idx.filter((i) => i > 0).join('.')}.`,
			level,
			text: match[2].trim()
		});
	}

	return list;
}

/**
 * 마크다운 상세 정보 반환 메서드
 *
 * @param {string} target: 대상
 *
 * @returns {MarkdownDetailProps} 마크다운 상세 정보
 */
export function getMarkdownDetail<T = Record<string, string>>(target: string): MarkdownDetailProps<T>
{
	const names = markdownRegex.nameToken.exec(target);

	// 정규식과 일치하지 않는 경우
	if (names === null)
	{
		throw new Error(`[${target}] is Invalid markdown file name`);
	}

	const dir = join(process.cwd(), target);
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

/**
 * 전체 마크다운 상세정보 목록 반환 비동기 메서드
 *
 * @param {string} path: 경로
 *
 * @returns {MarkdownDetailProps[]} 마크다운 상세 정보 목록
 */
export function getMarkdownDetailList<T = Record<string, string>>(path: string): MarkdownDetailProps<T>[]
{
	return getMarkdownAllList(path).map<MarkdownDetailProps<T>>(({ target }) => getMarkdownDetail(target));
}