/**
 * 공통 인덱스 모듈
 *
 * @author RWB
 * @since 2024.04.05 Fri 14:21:09
 */

import { MarkdownDetailProps, getMarkdownDetailList } from '@kapoo/markdown-kit';

export type MarkdownType = 'posts' | 'projects';

export type MarkdownSlug = [ MarkdownType, string, string, string, string, string ];

export interface BlogMarkdownDetailGroupProps
{
	/**
	 * 제목
	 */
	title: string;

	/**
	 * URL
	 */
	url: string;
}

export interface BlogMarkdownDetailSideProps
{
	/**
	 * 제목
	 */
	title: string;

	/**
	 * URL
	 */
	url: string;

	/**
	 * 썸네일
	 */
	thumbnail: string;
}

export interface BlogMarkdownDetailProps<T = Record<string, string>> extends MarkdownDetailProps<T>
{
	/**
	 * URL
	 */
	url: string;

	/**
	 * 요약
	 */
	summary: string;

	/**
	 * 그룹
	 */
	group?: BlogMarkdownDetailGroupProps[];

	/**
	 * 이전 게시글
	 */
	prev?: BlogMarkdownDetailSideProps;

	/**
	 * 다음 게시글
	 */
	next?: BlogMarkdownDetailSideProps;
}

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
	posts: `${markdownBasePath}/posts`,
	projects: `${markdownBasePath}/projects`
};

/**
 * 사이드 마크다운 반환 메서드
 *
 * @param {MarkdownDetailProps} param0: MarkdownDetailProps
 *
 * @returns {BlogMarkdownDetailSideProps} 마크다운 상세
 */
function getMarkdownSide({ meta, urls }: MarkdownDetailProps<MarkdownHeaderProps>): BlogMarkdownDetailSideProps
{
	return {
		thumbnail: meta.coverImage,
		title: meta.title,
		url: `/${meta.type}/${urls.join('/')}`
	};
}

/**
 * 그리드용 마크다은 상세 리스트 반환 메서드
 *
 * @param {MarkdownType} type: 마크다운 타입
 *
 * @returns {BlogMarkdownDetailSideProps} 마크다운 상세
 */
export function getMarkdownDetailListForGrid(type: MarkdownType): BlogMarkdownDetailProps<MarkdownHeaderProps>[]
{
	return getMarkdownDetailList<MarkdownHeaderProps>(markdownPath[type])
		.map<BlogMarkdownDetailProps<MarkdownHeaderProps>>((item) =>
		{
			const summary = [
				item.meta.title,
				item.meta.excerpt,
				item.meta.category,
				...item.meta.tag
			].join('|||').toLowerCase();

			const url = `/${item.meta.type}/${item.urls.join('/')}`;

			return {
				...item,
				body: '',
				summary,
				toc: [],
				url
			};
		});
}

/**
 * slug별 마크다운 상세 반환 메서드
 *
 * @param {string[]} slug: slug
 *
 * @returns {BlogMarkdownDetailProps} 마크다운 상세
 */
export function getMarkdownDetailBySlug(slug: string[]): BlogMarkdownDetailProps<MarkdownHeaderProps>
{
	const type = slug[0];
	const filename = slug.slice(1, 5).join('-');

	const list = getMarkdownDetailList<MarkdownHeaderProps>(`${markdownBasePath}/${type}`);

	const currentIndex = list.findIndex(({ urls }) => urls.join('-') === filename);

	// 찾을 수 없을 경우
	if (currentIndex < 0)
	{
		throw Error(`${filename} can't find`);
	}

	const current = list[currentIndex];
	const prev = currentIndex + 1 < list.length ? getMarkdownSide(list[currentIndex + 1]) : undefined;
	const next = currentIndex - 1 < 0 ? undefined : getMarkdownSide(list[currentIndex - 1]);

	const groupList = list.filter(({ meta }) => meta.category === current.meta.category);
	const group = groupList.length > 0 ? groupList.map<BlogMarkdownDetailGroupProps>(({ meta, urls }) => ({
		title: meta.title,
		url: `/${meta.type}/${urls.join('/')}`
	})) : undefined;

	const summary = [
		current.meta.title,
		current.meta.excerpt,
		current.meta.category,
		...current.meta.tag
	];

	// 그룹이 유효할 경우
	if (current.meta.group)
	{
		summary.push(current.meta.group);
	}

	return {
		...current,
		group,
		next,
		prev,
		summary: summary.join('|||').toLowerCase(),
		url: `/${current.meta.type}/${current.urls.join('/')}`
	};
}