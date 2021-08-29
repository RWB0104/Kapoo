/**
 * 카테고리별 포스트 동적 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.17 Sat 18:10:25
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Box } from '@material-ui/core';

// 사용자 모듈
import Screener from '@components/global/Screener';
import { getBuildHash, getContentsByCategory, getContentsCategory, getScreenerImage } from '@commons/api';
import { getRandomIndex, ContentProps, PathsProps, RoutesProps, CategoryProps } from '@commons/common';
import { MENU_LIST } from '@commons/env';
import Meta from '@components/global/Meta';
import ContentBoard from '@components/contents/ContentBoard';
import ContentCategory from '@components/contents/ContentCategory';

interface Props {
	posts: ContentProps[],
	categories: CategoryProps,
	images: string[],
	category: string
	page: number,
	hash?: string
}

interface StaticProp {
	props: Props
}

const type = 'posts';

/**
 * 카테고리별 포스트 동적 페이지 ReactElement 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {ReactElement} ReactElement
 */
export default function CategoryPosts({ posts, categories, images, category, page }: Props): ReactElement
{
	const index = getRandomIndex(images.length);

	return (
		<Box component="section">
			<Meta title={MENU_LIST[1].title} description={MENU_LIST[1].desc} url={MENU_LIST[1].url.pathname} image={`/img/screener/${images[index]}`} />

			<Screener title={MENU_LIST[1].title} lower={MENU_LIST[1].desc} image={`/img/screener/${images[index]}`} special />

			<ContentCategory type={type} list={categories} />

			<ContentBoard baseUrl={`/${type}/category/${category}`} page={page} list={posts} />
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

	const posts = getContentsByCategory(type, category);
	const categories = getContentsCategory(type);
	const images = getScreenerImage();

	const hash = getBuildHash();

	return {
		props: {
			posts,
			categories,
			images,
			category: category,
			page: parseInt(page),
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
		const posts = getContentsByCategory(type, category);

		const total = Math.ceil(posts.length / 10);

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