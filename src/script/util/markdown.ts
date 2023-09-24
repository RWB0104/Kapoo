/**
 * 마크다운 유틸 모듈
 *
 * @author RWB
 * @since 2023.08.19 Sat 13:04:45
 */

import fs from 'fs';
import { join } from 'path';

import matter from 'gray-matter';

import { REGEX, getNewist } from './common';

export type MarkdownType = 'posts' | 'projects';
export type FrontmatterForListProps = Omit<FrontmatterProps, 'type' | 'tag' | 'comment' | 'publish' | 'info'>;

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

	/**
	 * 최신 여부
	 */
	isNew: boolean;
}

export interface MarkdownListItemProps extends Pick<MarkdownProps, 'names' | 'url'>
{
	/**
	 * 메타
	 */
	frontmatter: FrontmatterForListProps;
}

export interface MarkdownInfoProps
{
	/**
	 * 이전 페이지
	 */
	prev: MarkdownListItemProps | null;

	/**
	 * 다음 페이지
	 */
	next: MarkdownListItemProps | null;

	/**
	 * 그룹 리스트
	 */
	group: MarkdownListItemProps[] | null;
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
	names: string[];

	/**
	 * 내용
	 */
	content?: string;

	/**
	 * URL
	 */
	url: string;

	/**
	 * 정보
	 */
	info?: MarkdownInfoProps;
}

const MARKDOWN_DIR = join(process.cwd(), 'src/markdown');

/**
 * 마크다운 리스트 반환 메서드
 *
 * @param {MarkdownType} type: 마크다운 타입
 *
 * @returns [MarkdownListItemProps[]] 마크다운 리스트
 */
export function getMarkdownList(type: MarkdownType): MarkdownListItemProps[]
{
	const files = fs.readdirSync(join(MARKDOWN_DIR, type))
		.filter((item) => REGEX.markdown.test(item))
		.map((i) => join(MARKDOWN_DIR, type, i));

	const list = files.map((i) => getMarkdownForList(i));

	return list
		.filter(({ frontmatter: { publish } }) => publish)
		.sort((left, right) => (new Date(right.frontmatter.date).getTime() - new Date(left.frontmatter.date).getTime()))
		.map<MarkdownListItemProps>(({ frontmatter, url, names }) => ({
			frontmatter: {
				category: frontmatter.category,
				coverImage: frontmatter.coverImage,
				date: frontmatter.date,
				excerpt: frontmatter.excerpt,
				group: frontmatter.group,
				isNew: getNewist(frontmatter.date),
				title: frontmatter.title
			},
			names,
			url
		}));
}

/**
 * 리스트용 마크다운 반환 메서드
 *
 * @param {string} fullpath: 파일 경로
 *
 * @returns {MarkdownProps} 리스트용 마크다운
 */
export function getMarkdownForList(fullpath: string): MarkdownProps
{
	const file = fs.readFileSync(fullpath, 'utf-8');
	const urls = REGEX.markdownName.exec(fullpath);

	// 정규식에 맞지 않는 경우
	if (!urls)
	{
		throw Error('올바르지 않은 파일');
	}

	const { data, content } = matter(file);
	const frontmatter = data as FrontmatterProps;

	const url = `/${frontmatter.type}/${urls[1]}/${urls[2]}/${urls[3]}/${urls[4]}`;

	const result: MarkdownProps = {
		content,
		frontmatter,
		names: urls.slice(1, 5),
		url
	};

	return result;
}

/**
 * 마크다운 정보 반환 메서드
 *
 * @param {MarkdownType} type: 마크다운 타입
 * @param {string} filename: 마크다운 파일명
 *
 * @returns {MarkdownInfoProps} 마크다운 정보
 */
export function getMarkdownInfo(type: MarkdownType, filename: string): MarkdownInfoProps
{
	const list = getMarkdownList(type);
	const markdown = list.find((i) => i.names.join('-') === filename);

	if (!markdown)
	{
		throw Error('올바르지 않은 마크다운');
	}

	const currentIndex = list.findIndex(({ url }) => url === markdown.url);

	const groupList = list.filter(({ frontmatter }) => frontmatter.group && frontmatter.group === markdown.frontmatter.group);

	const group = groupList.length > 0 ? groupList : null;
	const next = currentIndex === 0 ? null : list[currentIndex - 1];
	const prev = currentIndex === list.length - 1 ? null : list[currentIndex + 1];

	return {
		group,
		next,
		prev
	};
}

/**
 * 마크다운 반환 메서드
 *
 * @param {MarkdownType} type: 마크다운 타입
 * @param {string} filename: 마크다운 파일명
 *
 * @returns {MarkdownProps} 마크다운
 */
export function getMarkdown(type: MarkdownType, filename: string): MarkdownProps
{
	const fullpath = join(MARKDOWN_DIR, type, `${filename}.md`);

	const result = getMarkdownForList(fullpath);
	result.info = getMarkdownInfo(type, filename);

	return result;
}