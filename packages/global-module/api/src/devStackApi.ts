/**
 * 개발 스택 API 모듈
 *
 * @author RWB
 * @since 2024.05.03 Fri 17:10:57
 */

export type DevStackCategory = 'language' | 'framework' | 'server' | 'database' | 'etc';

export interface DevStackItem
{
	/**
	 * 카테고리
	 */
	category: DevStackCategory;

	/**
	 * 아이콘 URL
	 */
	icon: string;

	/**
	 * 이름
	 */
	name: string;
}

/**
 * 개발 스택 반환 API 비동기 메서드
 *
 * @returns {Promise} DevStackItem[]
 */
export async function getDevStack(): Promise<DevStackItem[]>
{
	const response = await fetch('https://datastore.itcode.dev/itcode/image');

	const json = await response.json<DevStackItem[]>();

	return json;
}