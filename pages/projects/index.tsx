/**
 * 프로젝트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 00:01:58
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Box } from '@material-ui/core';

// 사용자 모듈
import { getContentsCategory, getContentsList, getScreenerImage } from '@commons/api';
import { ContentProps, getRandomIndex } from '@commons/common';
import { LOGO, MENU_LIST } from '@commons/env';
import Screener from '@components/global/Screener';
import Meta from '@components/global/Meta';
import ContentCategory from '@components/contents/ContentCategory';
import ContentBoard from '@components/contents/ContentBoard';

interface Props {
	projects: ContentProps[],
	category: string[],
	images: string[]
}

interface StaticProp {
	props: Props
}

const type = 'projects';

/**
 * 프로젝트 페이지 ReactElement 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {ReactElement} ReactElement
 */
export default function Projects({ projects, category, images }: Props): ReactElement
{
	const index = getRandomIndex(images.length);

	return (
		<Box component="section">
			<Meta title={MENU_LIST[2].title} description={MENU_LIST[2].desc} url={MENU_LIST[2].url.pathname} image={LOGO} />

			<Screener title={MENU_LIST[2].title} lower={MENU_LIST[2].desc} image={`/img/screener/${images[index]}`} special />

			<ContentCategory type={type} list={category} />

			<ContentBoard baseUrl={`/${type}`} page={1} list={projects} />
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
	const projects = getContentsList(type);
	const category = getContentsCategory(type);
	const images = getScreenerImage();

	return {
		props: {
			projects,
			category,
			images
		}
	};
}