/**
 * 공통 JavaScript
 *
 * @author RWB
 * @since 2021.05.01 Sat 20:10:41
 */

/**
 * 입력한 배열의 랜덤 아이템 반환 함수
 *
 * @param {Array} arr: 배열
 *
 * @return {Object} 임의의 배열 아이템
 */
export function getRandomItem(arr)
{
	return arr[Math.floor(Math.random() * arr.length)];
}