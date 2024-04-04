/**
 * 마크다운 모듈
 *
 * @author RWB
 * @since 2024.04.03 Wed 09:45:54
 */

'use server';

import matter, { GrayMatterFile } from 'gray-matter';

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

import { markdownRegex } from './regex';

export interface MarkdownAllListItem
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
}

export interface MarkdownToc
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

export interface MarkdownDetail<T = Record<string, string>>
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
	toc: MarkdownToc[];
}

/**
 * 전체 마크다운 목록 반환 비동기 메서드
 *
 * @param {string} path: 경로
 *
 * @returns {Promise} 비동기 MarkdownAllListItem[]
 */
export async function getMarkdownAllList(path: string): Promise<MarkdownAllListItem[]>
{
	const dir = join(process.cwd(), path);

	return readdirSync(dir)
		.filter((filename) => markdownRegex.fullname.test(filename))
		.map<MarkdownAllListItem>((filename) => ({
			filename,
			fullname: join(dir, filename),
			name: markdownRegex.fullname.exec?.(filename)?.[1] || filename
		}));
}

export async function getMarkdownToc(body: string): Promise<MarkdownToc[]>
{
	const flag = true;
	const list: MarkdownToc[] = [];

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

export async function getMarkdownDetail<T = Record<string, string>>(fullname: string): Promise<MarkdownDetail<T>>
{
	const names = markdownRegex.nameToken.exec(fullname);

	// 정규식과 일치하지 않는 경우
	if (names === null)
	{
		throw new Error(`[${fullname}] is Invalid markdown file name`);
	}

	const file = await readFileSync(fullname, 'utf-8');

	const { data, content } = matter(file);

	const toc = await getMarkdownToc(content);

	return {
		body: content,
		meta: data as T,
		toc,
		urls: names.slice(1, 5)
	};
}