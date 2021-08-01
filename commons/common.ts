/**
 * 공통 모듈
 *
 * @author RWB
 * @since 2021.07.12 Mon 15:52:40
 */

export interface DateProps {
	year: string,
	month: string,
	day: string,
	week: string,
	hour: string,
	minute: string,
	second: string
}

export interface ContentHeaderProps {
	title: string,
	excerpt: string,
	coverImage: string,
	date: string,
	type: string,
	category: string,
	tag: string[],
	group?: string,
	comment: boolean,
	publish: boolean
}

export interface ContentProps {
	header: ContentHeaderProps,
	name: string,
	content: string,
	url: string[],
	toc?: TocProps[]
}

export interface ContentPageProps {
	props: PageStaticProps
}

export interface PageStaticProps {
	page: {
		type: string;
		prev: null | ContentProps,
		next: null | ContentProps,
	},
	group?: ContentProps[],
	data: ContentProps
}

export interface PathsProps {
	paths: RoutesProps[],
	fallback: boolean
}

export interface PathProps {
	paths: RouteProps[],
	fallback: boolean
}

export interface RoutesProps {
	params: {
		[ key: string ]: string[]
	}
}

export interface RouteProps {
	params: {
		[ key: string ]: string
	}
}

export interface ConvertProps {
	toc: TocProps[],
	content: string
}

export interface TocProps {
	text: string,
	tag: string,
	depth: number
}

export const CONTENT_REGX = /^((19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])-)(.*)(.md)$/;
export const MD_REGX = /\.md$/;
export const NAME_REGX = /^(19|20\d{2})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])-(.*)$/;

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
* 컨텐츠 테이블 HTML 문자열 반환 함수
*
* @param {TocProps[]} toc TocProps 배열
*
* @returns {string} HTML 문자열
*/
export function tableOfContents(toc : TocProps[] | undefined): string
{
	if (toc)
	{
		let count = 0;

		return toc.reduce((acc: string, item: TocProps): string =>
		{
		   const { text, tag, depth } = item;

		   // toc의 깊이가 현재 깊이보다 깊을 경우
		   if (depth > count)
		   {
			   count++;
			   acc += `<ul><li><a href="#${tag}">${text}</a></li>`;
		   }

		   // toc의 깊이가 현재 깊이보다 얕을 경우
		   else if (depth < count)
		   {
			   count--;
			   acc += `</ul><li><a href="#${tag}">${text}</a></li>`;
		   }

		   // toc의 깊이가 현재 깊이와 동일할 경우
		   else
		   {
			   acc += `<li><a href="#${tag}">${text}</a></li>`;
		   }

		   return acc;
		}, '') + '</ul>';
	}

	else
	{
		return '';
	}
}