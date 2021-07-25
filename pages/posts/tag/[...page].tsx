/**
 * 태그별 포스트 동적 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.17 Sat 18:10:25
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Box } from '@material-ui/core';

// 사용자 모듈
import Screener from '@components/global/Screener';
import { getContentsByTag, getContentsCategory, getContentsTag, getScreenerImage } from '@commons/api';
import { getRandomIndex, ContentProps, PathsProps, RoutesProps } from '@commons/common';
import { LOGO, MENU_LIST } from '@commons/env';
import Meta from '@components/global/Meta';
import ContentBoard from '@components/contents/ContentBoard';
import ContentCategory from '@components/contents/ContentCategory';

interface Props {
	posts: ContentProps[],
	categories: string[],
	images: string[],
	tag: string
	page: number
}

interface StaticProps {
	props: Props
}

const type = 'posts';

/**
 * 태그별 포스트 동적 페이지 ReactElement 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {ReactElement} ReactElement
 */
export default function TagPosts({ posts, categories, images, tag, page }: Props): ReactElement
{
	const index = getRandomIndex(images.length);

	return (
		<Box component="section">
			<Meta title={MENU_LIST[1].title} description={MENU_LIST[1].desc} url={MENU_LIST[1].url.pathname} image={LOGO} />

			<Screener title={MENU_LIST[1].title} lower={MENU_LIST[1].desc} image={`/img/screener/${images[index]}`} special />

			<ContentCategory type={type} list={categories} />

			<ContentBoard baseUrl={`/${type}/tag/${tag}`} page={page} list={posts} />
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

	const posts = getContentsByTag(type, tag);
	const categories = getContentsCategory(type);
	const images = getScreenerImage();

	return {
		props: {
			posts,
			categories,
			images,
			tag: tag,
			page: parseInt(page)
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
		const posts = getContentsByTag(type, tag);

		const total = Math.ceil(posts.length / 10);

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