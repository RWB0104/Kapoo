/**
 * 공통 인덱스 모듈
 *
 * @author RWB
 * @since 2024.04.05 Fri 14:21:09
 */

import { MarkdownDetailProps, getMarkdownDetail } from '@kapoo/markdown-kit';

export type MarkdownType = 'posts' | 'projects';

export interface MarkdownHeaderProps
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
	date: number;

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

export interface BaseMetadataProps
{
	/**
	 * 타이틀
	 */
	title?: string;

	/**
	 * 설명
	 */
	description?: string;

	/**
	 * 키워드
	 */
	keywords?: string[];

	/**
	 * 경로
	 */
	url?: string;

	/**
	 * 썸네일 url
	 */
	thumbnail?: string;
}

export const markdownBasePath = 'src/markdown';

export const markdownPath = {
	post: `${markdownBasePath}/posts`,
	project: `${markdownBasePath}/projects`
};

/**
 * slug별 마크다운 상세 반환 메서드
 *
 * @param {string[]} slug: slug
 *
 * @returns {MarkdownDetailProps} 마크다운 상세
 */
export function getMarkdownDetailBySlug(slug: string[]): MarkdownDetailProps<MarkdownHeaderProps>
{
	const type = slug[0];
	const filename = slug.slice(1, 5).join('-');

	const dir = `${markdownBasePath}/${type}/${filename}.md`;

	return getMarkdownDetail<MarkdownHeaderProps>(dir);
}