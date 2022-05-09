/**
 * 404 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.08.01 Sun 19:47:47
 */

// 라이브러리 모듈
import { useEffect, useState } from 'react';

// 사용자 모듈
import Meta from '@components/global/Meta';
import Screener from '@components/global/Screener';
import { getRandomIndex } from '@commons/common';
import { TITLE } from '@commons/env';

/**
 * 404 에러 JSX 반환 함수
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Error404(): JSX.Element | null
{
	const [ imageState, setImageState ] = useState('');

	useEffect(() =>
	{
		(async () =>
		{
			const list = await fetch('/image.json');
			const json = await list.json();

			const index = getRandomIndex(json.list.length);

			setImageState(json.list[index]);
		})();
	}, []);

	return (
		<section>
			<Meta title="404" description="여긴 아무것도 없네요... URL 마지막의 /라도 빼보시겠어요?" image={imageState} url="" />

			<Screener title={TITLE} menu="404" lower="여긴 아무것도 없네요... URL 마지막의 /라도 빼보시겠어요?" image={imageState} />
		</section>
	);
}