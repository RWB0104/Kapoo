/**
 * 포스트 동적 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.17 Sat 18:10:25
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Box } from '@material-ui/core';

// 사용자 모듈
import Screener from '@components/global/Screener';
import { getBuildHash, getContentsCategory, getContentsList, getScreenerImage } from '@commons/api';
import { getRandomIndex, ContentProps, RouteProps, PathProps, CategoryProps, getContentDiv } from '@commons/common';
import { LOGO, MENU_LIST } from '@commons/env';
import Meta from '@components/global/Meta';
import ContentBoard from '@components/contents/ContentBoard';
import ContentCategory from '@components/contents/ContentCategory';

interface Props {
	posts: ContentProps[],
	categories: CategoryProps,
	images: string[],
	page: number,
	total: number,
	hash?: string
}

interface StaticProp {
	props: Props
}

const type = 'posts';

/**
 * 포스트 동적 페이지 ReactElement 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {ReactElement} ReactElement
 */
export default function Posts({ posts, categories, images, page, total }: Props): ReactElement
{
	const index = getRandomIndex(images.length);

	return (
		<Box component="section">
			<Meta title={MENU_LIST[1].title} description={MENU_LIST[1].desc} url={MENU_LIST[1].url.pathname} image={LOGO} />

			<Screener title={MENU_LIST[1].title} lower={MENU_LIST[1].desc} image={`/img/screener/${images[index]}`} special />

			<ContentCategory type={type} list={categories} />

			<ContentBoard baseUrl={`/${type}`} page={page} total={total} list={posts} />
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

	const posts = getContentsList(type);
	posts.forEach(e => e.content = undefined);

	const categories = getContentsCategory(type);
	const images = getScreenerImage();

	const hash = getBuildHash();

	return {
		props: {
			posts: posts.slice(start, end),
			categories,
			images,
			page: parseInt(params.page),
			total: posts.length,
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
	const posts = getContentsList(type);

	const total = Math.ceil(posts.length / 10);

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