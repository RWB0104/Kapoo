/**
 * 프로젝트 동적 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.10.26 Tue 02:09:51
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Box } from '@material-ui/core';

// 사용자 모듈
import Screener from '@components/global/Screener';
import { getBuildHash, getContentsCategory, getContentsList, getScreenerImage } from '@commons/api';
import { getRandomIndex, ContentProps, RouteProps, PathProps, CategoryProps, getContentDiv, CONTENT_DIV } from '@commons/common';
import { LOGO, MENU_LIST } from '@commons/env';
import Meta from '@components/global/Meta';
import ContentBoard from '@components/contents/ContentBoard';
import ContentCategory from '@components/contents/ContentCategory';

interface Props {
	projects: ContentProps[],
	categories: CategoryProps,
	images: string[],
	page: number,
	total: number,
	hash?: string
}

interface StaticProp {
	props: Props
}

const type = 'projects';

/**
 * 프로젝트 동적 페이지 ReactElement 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {ReactElement} ReactElement
 */
export default function Projects({ projects, categories, images, page, total }: Props): ReactElement
{
	const index = getRandomIndex(images.length);

	return (
		<Box component="section">
			<Meta title={MENU_LIST[2].title} description={MENU_LIST[2].desc} url={MENU_LIST[2].url.pathname} image={LOGO} />

			<Screener title={MENU_LIST[2].title} lower={MENU_LIST[2].desc} image={`/img/screener/${images[index]}`} special />

			<ContentCategory type={type} list={categories} />

			<ContentBoard baseUrl={`/${type}`} page={page} total={total} list={projects} />
		</Box>
	);
}

/**
 * 사용자 Props 반환 함수
 *
 * @param {RouteProps} params: 컨텐츠
 *
 * @returns {Promise<StaticProp>} 사용자 Props
 */
export async function getStaticProps({ params }: RouteProps): Promise<StaticProp>
{
	const page = parseInt(params.page);
	const { start, end } = getContentDiv(page);

	const projects = getContentsList(type);

	const subProjects = projects.slice(start, end);
	subProjects.forEach(e => e.content = '');

	const categories = getContentsCategory(type);
	const images = getScreenerImage();

	const hash = getBuildHash();

	return {
		props: {
			projects: subProjects,
			categories,
			images,
			page: parseInt(params.page),
			total: Math.ceil(projects.length / CONTENT_DIV),
			hash
		}
	};
}

/**
 * 동적 경로 반환 함수
 *
 * @returns {Object} 동적 경로 객체
 */
export async function getStaticPaths(): Promise<PathProps>
{
	const projects = getContentsList(type);

	const total = Math.ceil(projects.length / 10);

	const arr = [];

	for (let i = 1; i <= total; i++)
	{
		arr.push({
			params: {
				page: `${i}`
			}
		});
	}

	return {
		paths: arr,
		fallback: false
	};
}