/**
 * 태그별 프로젝트 동적 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.17 Sat 18:10:25
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Box } from '@material-ui/core';

// 사용자 모듈
import Screener from '@components/global/Screener';
import { getBuildHash, getContentsByTag, getContentsCategory, getContentsTag, getScreenerImage } from '@commons/api';
import { getRandomIndex, ContentProps, PathsProps, RoutesProps, CategoryProps, CONTENT_DIV, getContentDiv } from '@commons/common';
import { LOGO, MENU_LIST } from '@commons/env';
import Meta from '@components/global/Meta';
import ContentBoard from '@components/contents/ContentBoard';
import ContentCategory from '@components/contents/ContentCategory';

interface Props {
	projects: ContentProps[],
	categories: CategoryProps,
	images: string[],
	tag: string
	page: number,
	total: number,
	hash?: string
}

interface StaticProps {
	props: Props
}

const type = 'projects';

/**
 * 태그별 프로젝트 동적 페이지 ReactElement 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {ReactElement} ReactElement
 */
export default function TagProjects({ projects, categories, images, tag, page, total }: Props): ReactElement
{
	const index = getRandomIndex(images.length);

	return (
		<Box component="section">
			<Meta title={MENU_LIST[2].title} description={MENU_LIST[2].desc} url={MENU_LIST[2].url.pathname} image={LOGO} />

			<Screener title={MENU_LIST[2].title} lower={MENU_LIST[2].desc} image={`/img/screener/${images[index]}`} special />

			<ContentCategory type={type} list={categories} />

			<ContentBoard baseUrl={`/${type}/tag/${tag}`} page={page} total={total} list={projects} />
		</Box>
	);
}

/**
 * 사용자 Props 반환 함수
 *
 * @param {RoutesProps} params: RoutesProps
 *
 * @returns {Promise<StaticProps>} StaticProp의 비동기 Promise 객체
 */
export async function getStaticProps({ params }: RoutesProps): Promise<StaticProps>
{
	const [ tag, page ] = params.page;
	const { start, end } = getContentDiv(parseInt(page));

	const projects = getContentsByTag(type, tag);

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
			tag: tag,
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
	const tags = getContentsTag(type);

	const arr = [] as RoutesProps[];

	tags.forEach(tag =>
	{
		const projects = getContentsByTag(type, tag);

		const total = Math.ceil(projects.length / 10);

		for (let i = 1; i <= total; i++)
		{
			arr.push({
				params: {
					page: [ tag, `${i}` ]
				}
			});
		}
	});

	return {
		paths: arr,
		fallback: false
	};
}