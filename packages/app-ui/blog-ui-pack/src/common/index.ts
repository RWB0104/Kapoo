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

const blogMarkdownRegex = { token: /(19|20\d{2})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])-(.*).md/ };

export function getUrl(name: string, type?: MarkdownType): string
{
	let target = name;

	if (!name.endsWith('.md'))
	{
		target += '.md';
	}

	const regex = blogMarkdownRegex.token.exec(target);

	if (!regex)
	{
		throw Error(`${target} can't find`);
	}

	return `${type ? `/${type}` : ''}/${regex.slice(1, 5).join('/')}`;
}

/**
 * 사이드 마크다운 반환 메서드
 *
 * @param {MarkdownDetailProps} param0: MarkdownDetailProps
 *
 * @returns {BlogMarkdownDetailSideProps} 마크다운 상세
 */
function getMarkdownSide({ filename, meta }: MarkdownDetailProps<MarkdownHeaderProps>): BlogMarkdownDetailSideProps
{
	const url = getUrl(filename, meta.type);

	return {
		thumbnail: meta.coverImage,
		title: meta.title,
		url
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

			const url = getUrl(item.filename, item.meta.type);

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
	const name = slug.slice(1, 5).join('-');

	const list = getMarkdownDetailList<MarkdownHeaderProps>(`${markdownBasePath}/${type}`);

	const currentIndex = list.findIndex(({ filename }) => filename === `${name}.md`);

	// 찾을 수 없을 경우
	if (currentIndex < 0)
	{
		throw Error(`${name} can't find`);
	}

	const current = list[currentIndex];
	const prev = currentIndex + 1 < list.length ? getMarkdownSide(list[currentIndex + 1]) : undefined;
	const next = currentIndex - 1 < 0 ? undefined : getMarkdownSide(list[currentIndex - 1]);

	const groupList = list.filter(({ meta }) => meta.group && meta.group === current.meta.group);

	const group = groupList.length > 0 ? groupList.map<BlogMarkdownDetailGroupProps>(({ filename, meta }) => ({
		title: meta.title,
		url: getUrl(filename, meta.type)
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
		url: getUrl(current.filename, current.meta.type)
	};
}