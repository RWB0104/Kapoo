/**
 * 404 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.08.01 Sun 19:47:47
 */

// 사용자 모듈
import Meta from '@components/global/Meta';
import Screener from '@components/global/Screener';
import { getBuildHash, getScreenerImage } from '@commons/api';
import { getRandomIndex } from '@commons/common';
import { TITLE } from '@commons/env';

interface Props
{
	images: string[],
	hash?: string
}

interface StaticProp
{
	props: Props
}

/**
 * 404 에러 JSX 반환 함수
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Error404({ images }: Props): JSX.Element | null
{
	const index = getRandomIndex(images.length);

	return (
		<section>
			<Meta title="404" description="여긴 아무것도 없네요... URL 마지막의 /라도 빼보시겠어요?" image={images[index]} url="" />

			<Screener title={TITLE} menu="404" lower="여긴 아무것도 없네요... URL 마지막의 /라도 빼보시겠어요?" image={images[index]} />
		</section>
	);
}

/**
 * 정적 프로퍼티 반환 함수
 *
 * @return {Promise<StaticProp>} Promise 객체
 */
export async function getStaticProps(): Promise<StaticProp>
{
	const images = getScreenerImage();

	const hash = getBuildHash();

	return {
		props: { images, hash }
	};
}