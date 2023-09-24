/**
 * 공통 모듈
 *
 * @author RWB
 * @since 2023.08.19 Sat 13:09:34
 */

import { APP_INFO, AUTHOR } from '@kapoo/env';

import { Metadata } from 'next';

export interface DateParseProps
{
	/**
	 * 연도
	 */
	year: DateParseObject;

	/**
	 * 월
	 */
	month: DateParseObject;

	/**
	 * 일
	 */
	day: DateParseObject;

	/**
	 * 시
	 */
	hour: DateParseObject;

	/**
	 * 분
	 */
	minute: DateParseObject;

	/**
	 * 초
	 */
	second: DateParseObject;

	/**
	 * epoch
	 */
	timestame: number;
}

interface DateParseObject
{
	/**
	 * 텍스트
	 */
	text: string;

	/**
	 * 값
	 */
	value: number;
}

export interface TocProps
{
	/**
	 * 텍스트
	 */
	text: string;

	/**
	 * 깊이
	 */
	level: number;
}

export const REGEX = {
	markdown: /^((19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])-)(.*)(.md)$/,
	markdownCodeblock: /```[^]*?```/gm,
	markdownExt: /\.md$/,
	markdownHeading: /^(#{1,6})(.+)$/gm,
	markdownName: /(19|20\d{2})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])-(.*).md/
};

export const DAY_EPOCH = 86400000;

/**
 * 메타데이터 반환 메서드
 *
 * @param {string} title: 제목
 * @param {string} description: 설명
 * @param {string[]} keywords: 키워드
 * @param {string} url: URL
 * @param {string} image: 커버 이미지
 *
 * @returns {Metadata} 메타데이터
 */
export function getMetadata(title: string, description?: string, keywords?: string[], url = '', image = '/thumb.png'): Metadata
{
	const authors = Object.values(AUTHOR.social).map(({ link, name }) => ({ name, url: link }));

	return {
		authors,
		description: description || APP_INFO.description,
		icons: [
			'/favicon.ico',
			{ rel: 'shortcut icon', url: '/favicon.ico' },
			{ rel: 'apple-touch-icon', url: '/favicon.ico' }
		],
		keywords,
		metadataBase: new URL(APP_INFO.baseurl),
		openGraph: {
			description,
			images: image,
			locale: 'ko-KR',
			siteName: APP_INFO.title,
			title: `${title} - ${APP_INFO.title}`,
			type: 'website',
			url: `${APP_INFO.baseurl}${url}`
		},
		title: `${title} - ${APP_INFO.title}`
	};
}

/**
 * 0 추가 메서드
 *
 * @param {number} num: 숫자
 * @param {number} digit: 자릿스
 *
 * @returns {string} 추가된 문자열
 */
export function addZero(num: number, digit: number): string
{
	const len = `${Math.floor(num)}`.length;
	const diff = digit - len;

	return diff > 0 ? `${'0'.repeat(diff)}${num}` : `${num}`;
}

/**
 * 날짜 파서 메서드
 *
 * @param {string | number | Date} obj: 파라미터
 *
 * @returns {DateParseProps} DateParseProps 객체
 */
export function dateParse(obj?: string | number | Date): DateParseProps
{
	const date = obj ? new Date(obj) : new Date();

	const month = date.getMonth() + 1;

	return {
		day: {
			text: addZero(date.getDate(), 2),
			value: date.getDate()
		},
		hour: {
			text: addZero(date.getHours(), 2),
			value: date.getHours()
		},
		minute: {
			text: addZero(date.getMinutes(), 2),
			value: date.getMinutes()
		},
		month: {
			text: addZero(month, 2),
			value: month
		},
		second: {
			text: addZero(date.getSeconds(), 2),
			value: date.getSeconds()
		},
		timestame: date.getTime(),
		year: {
			text: `${date.getFullYear()}`,
			value: date.getFullYear()
		}
	};
}

/**
 * 신규 여부 반환 메서드
 *
 * @param {string | number | Date} obj: 파라미터
 *
 * @returns {boolean} 신규 여부
 */
export function getNewist(obj?: string | number | Date): boolean
{
	const now = new Date();
	const date = obj ? new Date(obj) : new Date();

	const diff = now.getTime() - date.getTime();

	return diff < DAY_EPOCH * 15;
}

/**
 * 마크다운 TOC 리스트 반환 메서드
 *
 * @param {string} text: 텍스트
 *
 * @returns {TocProps[]} 마크다운 TOC 리스트
 */
export function getMarkdownToc(text: string): TocProps[]
{
	const flag = true;

	const list: TocProps[] = [];

	const temp = text.replaceAll(REGEX.markdownCodeblock, '');

	while (flag)
	{
		const match = REGEX.markdownHeading.exec(temp);

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