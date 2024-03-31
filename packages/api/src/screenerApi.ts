/**
 * 스크리너 리스트 반환 API 비동기 메서드
 *
 * @returns {Promise} 스크리너 리스트
 *
 * @throws {Response} Response
 */
export async function getScreenerList(): Promise<string[]>
{
	const response = await fetch('https://datastore.itcode.dev/itcode/video');

	// 정상 응답일 경우
	if (response.ok)
	{
		const json = await response.json();

		return json as string[];
	}

	throw response;
}