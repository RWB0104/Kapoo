/**
 * 유틸 모듈
 *
 * @author RWB
 * @since 2024.03.31 Sun 03:52:17
 */

import { Metadata } from 'next';
import { Author } from 'next/dist/lib/metadata/types/metadata-types';

import { author } from './variables';

interface ParsedDateObject
{
	/**
	 * 텍스트
	 */
	text: string;

	/**
	 * 값 (0, 7: 일요일)
	 */
	value: number;
}

type ParsedDateKey = 'year' | 'month' | 'date' | 'hour' | 'minute' | 'second' | 'weekday';

export type ShareCallback = (data: ShareData) => void;
export type CopyCallback = (url: string) => void;

export interface ParsedDate extends Record<ParsedDateKey, ParsedDateObject>
{
	/**
	 * long time
	 */
	timestamp: number;

	/**
	 * date
	 */
	rawDate: Date;
}

export interface BaseMetadataProps
{
	/**
	 * 사이트명
	 */
	sitename?: string;

	/**
	 * 기본 URL
	 */
	baseurl?: string;

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

export interface RssInfoProps
{
	/**
	 * 제목
	 */
	title: string;

	/**
	 * 내용
	 */
	description: string;

	/**
	 * 링크
	 */
	link: string;
}

export interface RssItemProps
{
	/**
	 * 제목
	 */
	title: string;

	/**
	 * 설명
	 */
	description: string;

	/**
	 * 발행일자
	 */
	pubDate: string;

	/**
	 * 링크
	 */
	link: string;

	/**
	 * 카테고리
	 */
	category?: string[];
}

/**
 * 배열의 랜덤 인덱스 반환 메서드
 *
 * @param {Array} arr: 배열
 *
 * @returns {number} 랜덤 인덱스
 */
export function getRandom(arr: Array<unknown>): number
{
	return Math.floor(Math.random() * (arr.length - 1));
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
 * 날짜 파싱 반환 메서드
 *
 * @param {Date | number | string} source: 날짜 소스
 * @param {number} timezone: 타임존
 *
 * @returns {ParsedDate} 날짜 파싱 결과
 */
export function parseLocalDate(source?: Date | number | string, timezone = 9): ParsedDate
{
	const baseDate = new Date(source || Date.now());
	const offset = -timezone - baseDate.getTimezoneOffset() / 60;

	const date = new Date(baseDate.getTime() - offset * 3600 * 1000);

	const weekday = [ '일', '월', '화', '수', '목', '금', '토', '일' ];

	const month = date.getMonth() + 1;

	return {
		date: {
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
		rawDate: date,
		second: {
			text: addZero(date.getSeconds(), 2),
			value: date.getSeconds()
		},
		timestamp: date.getTime(),
		weekday: {
			text: weekday[date.getDay()],
			value: date.getDay()
		},
		year: {
			text: `${date.getFullYear()}`,
			value: date.getFullYear()
		}
	};
}

/**
 * 기간 반환 메서드
 *
 * @param {Date | number | string} source: 날짜 소스
 * @param {number} dayEpoch: 날짜 기준
 *
 * @returns {string} 기간
 */
export function calcDuring(source?: Date | number | string, dayEpoch = 86400000): string
{
	const epoch = new Date(source || new Date()).getTime();
	const now = new Date().getTime();

	const diff = now - epoch;

	// 하루가 지나지 않았을 경우
	if (diff < dayEpoch)
	{
		return '방금 전';
	}

	// 2주 이내일 경우
	if (diff < dayEpoch * 15)
	{
		return `${Math.round(diff / dayEpoch)}일 전`;
	}

	// 1년 이내일 경우
	if (diff < dayEpoch * 365)
	{
		return `${Math.round(diff / (dayEpoch * 30))}달 전`;
	}

	return `${Math.round(diff / (dayEpoch * 365))}년 전`;
}

/**
 * 공유 메서드
 *
 * @param {ShareData} data: 공유 데이터
 * @param {ShareCallback} onSuccess: 성공 콜백 메서드
 * @param {ShareCallback} onError: 실패 콜백 메서드
 */
export function doShare(data: ShareData, onSuccess?: ShareCallback, onError?: ShareCallback): void
{
	// 공유하기 기능이 사용 가능할 경우
	if (navigator.canShare && navigator.canShare(data))
	{
		navigator.share(data);

		onSuccess?.(data);
	}

	// 아닐 경우
	else
	{
		onError?.(data);
	}
}

/**
 * 클립보드 복사 메서드
 *
 * @param {string} url: URL
 * @param {CopyCallback} onSuccess: 성공 콜백 메서드
 * @param {CopyCallback} onError: 실패 콜백 메서드
 */
export function doCopy(url: string, onSuccess?: CopyCallback, onError?: CopyCallback): void
{
	// 클립보드 객체가 유효할 경우
	if (navigator.clipboard)
	{
		navigator.clipboard.writeText(url);

		onSuccess?.(url);
	}

	// 아닐 경우
	else
	{
		onError?.(url);
	}
}

/**
 * 공유 및 클립보드 복사 메서드
 *
 * @param {ShareData} data: 공유 데이터
 * @param {ShareCallback} onSuccess: 성공 콜백 메서드
 * @param {ShareCallback} onError: 실패 콜백 메서드
 * @param {ShareCallback} onSuccessCopy: 복사 성공 콜백 메서드
 */
export function doShareOrCopy(data: ShareData, onSuccess?: ShareCallback, onError?: ShareCallback, onSuccessCopy?: ShareCallback): void
{
	doShare(data, onSuccess, () =>
	{
		doCopy(data.url || '', () => onSuccessCopy?.(data), () => onError?.(data));
	});
}

/**
 * 특정 자릿수 반올림 결과 반환 메서드
 *
 * @param {number} num: 숫자
 * @param {number} digit: 자릿수
 *
 * @returns {number}: 반올림 숫자
 */
export function mathRound(num: number, digit = 0): number
{
	return Math.round(num * (10 ** digit)) / (10 ** digit);
}

/**
 * 기본 메타데이터 반환 메서드
 *
 * @param {BaseMetadataProps} param0: BaseMetadataProps
 *
 * @returns {Metadata} Metadata
 */
export function getBaseMetadata({ sitename, baseurl, title, description, keywords, url, thumbnail }: BaseMetadataProps): Metadata
{
	const fullTitle = [ title, sitename ].filter((i) => i !== undefined).join(' - ');

	return {
		applicationName: sitename,
		authors: Object.values(author.social).map<Author>(({ link, name }) => ({ name, url: link })),
		creator: author.nickname,
		description,
		generator: 'Next.js',
		icons: [
			'/favicon.ico',
			{ rel: 'shortcut icon', url: '/favicon.ico' },
			{ rel: 'apple-touch-icon', url: '/favicon.ico' }
		],
		keywords,
		metadataBase: new URL(baseurl || ''),
		openGraph: {
			description,
			images: thumbnail,
			locale: 'ko-KR',
			siteName: sitename,
			title: fullTitle,
			type: 'website',
			url
		},
		publisher: 'GitHub Pages',
		title: fullTitle,
		twitter: {
			description,
			images: thumbnail,
			title: fullTitle
		}
	};
}

/**
 * 모듈러 연산 결과 반환 메서드
 *
 * @param {number} num: 값
 * @param {number} max: 최대값
 *
 * @returns {number} 연산 결과
 */
export function modulo(num: number, max: number): number
{
	let val = num % max;

	// 연산 결과가 음수일 경우
	if (val < 0)
	{
		val += max;
	}

	return val;
}

/**
 * RSS 반환 메서드
 *
 * @param {RssInfoProps} info: RssInfoProps
 * @param {RssItemProps} list: RssItemProps
 *
 * @returns {string} RSS
 */
export function getBaseRss(info: RssInfoProps, list: RssItemProps[]): string
{
	const item = list.map((i) =>
	{
		let { title } = i;

		title = title.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;')
			.replace(/&/g, '&amp;');

		const desc = i.description.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;')
			.replace(/&/g, '&amp;');

		return `
				<item>
					<title>${title}</title>
					<description>${desc}</description>
					<pubDate>${i.pubDate}</pubDate>
					<link>${i.link}</link>
					<guid isPermaLink="true">${i.link}</guid>
					${i.category?.map((j) => `<category>${j}</category>`)}
				</item>
			`;
	});

	const xmlContent = `
		<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
			<channel>
				<copyright>Copyright ⓒ ${author.nickname} 2021.05</copyright>
				<description>${info.description}</description>
				<generator>${info.title}</generator>
				<language>ko-KR</language>
				<lastBuildDate>${new Date().toISOString()}</lastBuildDate>
				<link>${info.link}</link>
				<managingEditor>${author.email}</managingEditor>
				<pubDate>2021-05-26T23:36:57.000Z</pubDate>
				<title>${info.title}</title>
				<webMaster>${author.email}</webMaster>
				${item.join('\n')}
			</channel>
		</rss>
		`;

	return xmlContent;
}