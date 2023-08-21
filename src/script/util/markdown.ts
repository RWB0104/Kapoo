/**
 * 마크다운 유틸 모듈
 *
 * @author RWB
 * @since 2023.08.19 토 13:04:45
 */

import fs from 'fs';
import { join } from 'path';

import matter from 'gray-matter';

import { REGEX } from './common';

export type MarkdownType = 'posts' | 'projects';

export interface ConvertProps
{
	/**
	 * TOC
	 */
	toc: string;

	/**
	 * HTML
	 */
	html: string;
}

export interface TocProps
{
	/**
	 * 텍스트
	 */
	text: string;

	/**
	 * 태그
	 */
	tag: string;

	/**
	 * 깊이
	 */
	depth: number;
}

export interface FrontmatterProps
{
	/**
	 * 제목
	 */
	title: string;

	/**
	 * 요약
	 */
	excerpt: string;

	/**
	 * 썸네일
	 */
	coverImage: string;

	/**
	 * 날짜
	 */
	date: string;

	/**
	 * 타입
	 */
	type: MarkdownType;

	/**
	 * 카테고리
	 */
	category: string;

	/**
	 * 태그
	 */
	tag: string[];

	/**
	 * 그룹
	 */
	group?: string;

	/**
	 * 댓글 여부
	 */
	comment: boolean;

	/**
	 * 발행 여부
	 */
	publish: boolean;
}

export interface MarkdownInfoProps
{
	/**
	 * 이전 페이지
	 */
	prev: FrontmatterProps | null;

	/**
	 * 다음 페이지
	 */
	next: FrontmatterProps | null;

	/**
	 * 그룹 리스트
	 */
	group: FrontmatterProps[] | null;
}

export interface MarkdownProps
{
	/**
	 * 메타
	 */
	frontmatter: FrontmatterProps;

	/**
	 * 파일명
	 */
	name: string;

	/**
	 * 내용
	 */
	content?: string;

	/**
	 * URL
	 */
	url: string;

	/**
	 * TOC
	 */
	toc?: string;

	/**
	 * 정보
	 */
	info?: MarkdownInfoProps;
}

export interface MarkdownListProps
{
	/**
	 * 메타
	 */
	frontmatter: Omit<FrontmatterProps, 'excerpt' | 'type' | 'tag' | 'comment' | 'publish'>;

	/**
	 * URL
	 */
	url: string;
}

/**
 * 마크다운 리스트 반환 메서드
 *
 * @param {MarkdownType} type: 마크다운 타입
 *
 * @returns [MarkdownListProps[]] 마크다운 리스트
 */
export function getMarkdownList(type: MarkdownType): MarkdownListProps[]
{
	const pwd = join(process.cwd(), 'src/markdown');

	const files = fs.readdirSync(join(pwd, type))
		.filter((item) => REGEX.markdown.test(item))
		.map((i) => join(pwd, type, i));

	const list = files.map((i) => getMarkdownInfo(i));

	return list.filter(({ frontmatter: { publish } }) => publish)
		.sort((left, right) => (new Date(right.frontmatter.date).getTime() - new Date(left.frontmatter.date).getTime()))
		.map<MarkdownListProps>((i) => ({
			frontmatter: {
				category: i.frontmatter.category,
				coverImage: i.frontmatter.coverImage,
				date: i.frontmatter.date,
				title: i.frontmatter.title
			},
			url: i.url
		}));
}

/**
 * 마크다운 정보 반환 메서드
 *
 * @param {string} name: 파일명
 *
 * @returns {MarkdownProps} 마크다운 정보
 */
export function getMarkdownInfo(name: string): MarkdownProps
{
	const file = fs.readFileSync(name, 'utf-8');
	const urls = REGEX.markdownName.exec(name);

	// 정규식에 맞지 않는 경우
	if (!urls)
	{
		throw Error('올바르지 않은 파일');
	}

	const { data } = matter(file);

	const header = data as FrontmatterProps;

	const result: MarkdownProps = {
		frontmatter: header,
		name,
		url: `/${urls[1]}/${urls[2]}/${urls[3]}/${urls[4]}`
	};

	return result;
}