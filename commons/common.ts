/**
 * 공통 모듈
 *
 * @author RWB
 * @since 2021.07.12 Mon 15:52:40
 */

export enum Theme
{
	DARK = 'dark',
	LIGHT = 'light'
}

export interface DateProps
{
	year: string,
	month: string,
	day: string,
	week: string,
	hour: string,
	minute: string,
	second: string
}

export interface ContentHeaderProps
{
	title: string,
	excerpt: string,
	coverImage: string,
	date: string,
	type: string,
	category: string,
	tag: string[],
	group?: string,
	comment: boolean,
	publish: boolean,
	isNew: boolean
}

export interface ContentProps
{
	header: ContentHeaderProps,
	name: string,
	content?: string,
	url: string[],
	toc?: string,
	meta?: {
		prev?: ContentProps | null,
		next?: ContentProps | null,
		group?: ContentProps[]
	}
}

export interface ContentPageProps
{
	props: ContentProps
}

export interface PathsProps
{
	paths: RoutesProps[],
	fallback: boolean
}

export interface RoutesProps
{
	params: {
		[ key: string ]: string[]
	}
}

export interface ConvertProps
{
	toc: string,
	html: string
}

export interface TocProps
{
	text: string,
	tag: string,
	depth: number
}

export interface CategoryProps
{
	name: string,
	count: number,
	flag?: boolean | null
}

export interface SeoProps
{
	pages: string[],
	posts: string[],
	projects: string[]
}

export const CONTENT_DIV = 10;

export const CONTENT_REGX = /^((19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])-)(.*)(.md)$/;
export const MD_REGX = /\.md$/;
export const NAME_REGX = /^(19|20\d{2})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])-(.*)$/;
export const COMMENT_REGX = /<span class="token comment">([\s\S]*?)<\/span>/;

/**
 * 입력한 크기의 랜덤 인덱스 반환 함수
 *
 * @param {number} size: 배열 크기
 *
 * @return {number} 랜덤 인덱스
 */
export function getRandomIndex(size: number): number
{
	return Math.floor(Math.random() * size);
}

/**
 * 날짜 및 시간 정보 반환 함수
 *
 * @param {string} raw: 날짜 및 시간 문자열 (yyyy-MM-ddTHH:mm:ss)
 *
 * @returns {DateProps} DateProps
 */
export function getDateDetail(raw: string | undefined): DateProps
{
	const date = raw === undefined ? new Date() : new Date(raw);
	const weeks = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];

	return {
		year: date.getFullYear().toString(),
		month: (date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : `0${(date.getMonth() + 1)}`,
		day: (date.getDate() + 1) > 9 ? date.getDate().toString() : `0${date.getDate()}`,
		week: weeks[date.getDay()],
		hour: date.getHours() > 9 ? date.getHours().toString() : `0${date.getHours()}`,
		minute: date.getMinutes() > 9 ? date.getMinutes().toString() : `0${date.getMinutes()}`,
		second: date.getSeconds() > 9 ? date.getSeconds().toString() : `0${date.getSeconds()}`
	};
}

/**
 * 작성일 반환 함수
 *
 * @param {Date} date: 기준 날짜
 *
 * @returns {string} 작성일
 */
export function getWrittenTimes(date: Date): string
{
	const today = new Date();
	const stamp = today.getTime() - date.getTime();

	// 연 단위일 경우
	if (stamp > 31536000000)
	{
		const time = Math.floor(stamp / 31536000000);

		return `${time}년 전`;
	}

	// 월 단위일 경우
	else if (stamp > 2592000000)
	{
		const time = Math.floor(stamp / 2592000000);

		return `${time}달 전`;
	}

	// 일 단위일 경우
	else if (stamp > 86400000)
	{
		const time = Math.floor(stamp / 86400000);

		return `${time}일 전`;
	}

	// 시 단위일 경우
	else if (stamp > 3600000)
	{
		const time = Math.floor(stamp / 3600000);

		return `${time}시간 전`;
	}

	// 분 단위일 경우
	else if (stamp > 60000)
	{
		const time = Math.floor(stamp / 60000);

		return `${time}분 전`;
	}

	// 해당되지 않을 경우
	else
	{
		return '0분 전';
	}
}

/**
 * 새 컨텐츠 여부 반환 메서드
 *
 * @param {string} date: 날짜 문자열
 *
 * @returns {boolean} 새 컨텐츠 여부
 */
export function isNewContent(date: string): boolean
{
	return new Date().getTime() - new Date(date).getTime() < 86400000 * 7;
}