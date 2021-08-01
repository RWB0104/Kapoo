/**
 * 500 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.08.01 Sun 21:41:43
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Box } from '@material-ui/core';

// 사용자 모듈
import Meta from '@components/global/Meta';
import Screener from '@components/global/Screener';
import { getScreenerImage } from '@commons/api';
import { getRandomIndex } from '@commons/common';

interface Props {
	images: string[]
}

interface StaticProp {
	props: Props
}

/**
 * 500 에러 ReactElement 반환 함수
 *
 * @returns {ReactElement} ReactElement
 */
export default function Error404({ images }: Props): ReactElement
{
	const index = getRandomIndex(images.length);

	return (
		<Box component="section">
			<Meta title="500" description="문제가 생겼어요!" image={`/img/screener/${images[index]}`} url="" />

			<Screener title="500" lower="문제가 생겼어요!" image={`/img/screener/${images[index]}`} special />
		</Box>
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

	return {
		props: { images }
	};
}