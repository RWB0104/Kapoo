/**
 * 인덱스 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 14:19:40
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Box } from '@material-ui/core';

// 사용자 모듈
import Artbox from '@components/global/Artbox';
import Screener from '@components/global/Screener';
import ContentsCase from '@components/home/ContentsCase';
import { getContentsList, getScreenerImage } from '@commons/api';
import { DESCRIPTION, LOGO, MENU_LIST, TITLE } from '@commons/env';
import { getRandomIndex, ContentProps } from '@commons/common';
import Meta from '@components/global/Meta';

interface Props {
	images: string[],
	posts: ContentProps[],
	projects: ContentProps[]
}

interface StaticProp {
	props: Props
}

/**
 * 홈 페이지 ReactElement 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {ReactElement} ReactElement
 */
export default function Home({ images, posts, projects }: Props): ReactElement | null
{
	const index = getRandomIndex(images.length);

	return (
		<Box component="section">
			<Meta title={TITLE} description={DESCRIPTION} image={LOGO} url="" />

			<Screener title={TITLE} lower={DESCRIPTION} image={`/img/screener/${images[index]}`} special />

			<ContentsCase num={5} title={MENU_LIST[1].title} url={MENU_LIST[1].url} list={posts} />

			<Artbox />

			<ContentsCase num={5} title={MENU_LIST[2].title} url={MENU_LIST[2].url} list={projects} />
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

	const posts = getContentsList('posts');
	const projects = getContentsList('projects');

	return {
		props: { images, posts, projects }
	};
}