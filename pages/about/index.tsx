/**
 * 소개 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 00:01:37
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Box } from '@material-ui/core';

// 사용자 모듈
import Screener from '@components/global/Screener';
import Meta from '@components/global/Meta';
import { getBuildHash, getScreenerImage } from '@commons/api';
import { getRandomIndex } from '@commons/common';
import { MENU_LIST, TITLE } from '@commons/env';
import Artbox from '@components/global/Artbox';

interface Props {
	images: string[],
	hash?: string
}

interface StaticProp {
	props: Props
}

/**
 * 소개 페이지 ReactElement 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {ReactElement} ReactElement
 */
export default function Posts({ images }: Props): ReactElement
{
	const index = getRandomIndex(images.length);

	return (
		<Box component="section">
			<Meta title={MENU_LIST[3].title} description={MENU_LIST[3].desc} url={MENU_LIST[3].url.pathname} image={images[index]} />

			<Screener title={TITLE} menu={MENU_LIST[3].title} lower={MENU_LIST[3].desc} image={images[index]} />

			<Artbox />
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

	const hash = getBuildHash();

	return {
		props: { images, hash }
	};
}