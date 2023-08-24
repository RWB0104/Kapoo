/**
 * 공통 모듈
 *
 * @author RWB
 * @since 2023.08.19 Sat 13:09:34
 */

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

export const REGEX = {
	markdown: /^((19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])-)(.*)(.md)$/,
	markdownExt: /\.md$/,
	markdownName: /(19|20\d{2})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])-(.*).md/
};

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