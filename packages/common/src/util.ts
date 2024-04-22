/**
 * 유틸 모듈
 *
 * @author RWB
 * @since 2024.03.31 Sun 03:52:17
 */

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
 *
 * @returns {ParsedDate} 날짜 파싱 결과
 */
export function parseLocalDate(source?: Date | number | string): ParsedDate
{
	const date = new Date(source || Date.now());

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
 */
export function doShareOrCopy(data: ShareData, onSuccess?: ShareCallback, onError?: ShareCallback): void
{
	doShare(data, onSuccess, () =>
	{
		doCopy(data.url || '', undefined, () => onError?.(data));
	});
}