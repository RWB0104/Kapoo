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

/**
 * yyyy-MM-dd a HH:mm:ss 날짜 문자열 반환 함수
 *
 * @param {Date} date: 날짜 객체
 *
 * @returns {String} 날짜 문자열
 */
export function getFormattedDate(date)
{
	const year = date.getFullYear();
	const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
	const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

	const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
	const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
	const second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

	const weekList = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
	const week = weekList[date.getDay()];

	return `${year}-${month}-${day} ${week} ${hour}:${minute}:${second}`;
}