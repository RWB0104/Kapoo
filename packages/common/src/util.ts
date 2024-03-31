/**
 * 유틸 모듈
 *
 * @author RWB
 * @since 2024.03.31 Sun 03:52:17
 */

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