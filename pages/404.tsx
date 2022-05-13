/**
 * 404 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.08.01 Sun 19:47:47
 */

import { TITLE } from '@commons/env';
import { useScreenImage } from '@commons/hook';
import Meta from '@components/global/Meta';
import Screener from '@components/global/Screener';

/**
 * 404 에러 JSX 반환 함수
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Error404(): JSX.Element
{
	const imageState = useScreenImage();

	return (
		<section>
			<Meta description="여긴 아무것도 없네요... URL 마지막의 /라도 빼보시겠어요?" title="404" url="" />

			<Screener image={imageState} lower="여긴 아무것도 없네요... URL 마지막의 /라도 빼보시겠어요?" menu="404" title={TITLE} />
		</section>
	);
}