/**
 * 카테고리별 프로젝트 동적 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.10.26 Tue 02:13:56
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Box } from '@material-ui/core';

// 사용자 모듈
import Screener from '@components/global/Screener';
import { getBuildHash, getContentsByCategory, getContentsCategory, getScreenerImage } from '@commons/api';
import { getRandomIndex, ContentProps, PathsProps, RoutesProps, CategoryProps, CONTENT_DIV, getContentDiv } from '@commons/common';
import { MENU_LIST, TITLE } from '@commons/env';
import Meta from '@components/global/Meta';
import ContentBoard from '@components/contents/ContentBoard';
import ContentCategory from '@components/contents/ContentCategory';

interface Props {
	projects: ContentProps[],
	categories: CategoryProps,
	images: string[],
	category: string
	page: number,
	total: number,
	hash?: string
}

interface StaticProp {
	props: Props
}

const type = 'projects';

/**
 * 카테고리별 프로젝트 동적 페이지 ReactElement 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {ReactElement} ReactElement
 */
export default function CategoryProjects({ projects, categories, images, category, page, total }: Props): ReactElement
{
	const index = getRandomIndex(images.length);

	return (
		<Box component="section">
			<Meta title={MENU_LIST[2].title} description={MENU_LIST[2].desc} url={MENU_LIST[2].url.pathname} image={images[index]} />

			<Screener title={TITLE} menu={MENU_LIST[2].title} lower={MENU_LIST[2].desc} image={images[index]} />

			<ContentCategory type={type} list={categories} />

			<ContentBoard baseUrl={`/${type}/category/${category}`} page={page} total={total} list={projects} />
		</Box>
	);
}

/**
 * 사용자 Props 반환 함수
 *
 * @param {Object} params: 컨텐츠
 *
 * @returns {Object} 사용자 Props
 */
export async function getStaticProps({ params }: RoutesProps): Promise<StaticProp>
{
	const [ category, page ] = params.page;
	const { start, end } = getContentDiv(parseInt(page));

	const projects = getContentsByCategory(type, category);

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
			category: category,
			page: parseInt(page),
			total: Math.ceil(projects.length / CONTENT_DIV),
			hash
		}
	};
}

/**
 * 동적 경로 반환 함수
 *
 * @returns {Promise<PathsProps>} PathsProps의 비동기 Promise 객체
 */
export async function getStaticPaths(): Promise<PathsProps>
{
	const categories = getContentsCategory(type);

	const arr = [] as RoutesProps[];

	Object.keys(categories).sort().forEach(category =>
	{
		const projects = getContentsByCategory(type, category);

		const total = Math.ceil(projects.length / 10);

		for (let i = 1; i <= total; i++)
		{
			arr.push({
				params: {
					page: [ category, `${i}` ]
				}
			});
		}
	});

	return {
		paths: arr,
		fallback: false
	};
}