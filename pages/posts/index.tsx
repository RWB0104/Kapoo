/**
 * 포스트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 11:59:59
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Box } from '@material-ui/core';

// 사용자 모듈
import Screener from '@components/global/Screener';
import { getBuildHash, getContentsCategory, getContentsList, getScreenerImage } from '@commons/api';
import { getRandomIndex, ContentProps, CategoryProps, getContentDiv, CONTENT_DIV } from '@commons/common';
import { MENU_LIST, TITLE } from '@commons/env';
import Meta from '@components/global/Meta';
import ContentBoard from '@components/contents/ContentBoard';
import ContentCategory from '@components/contents/ContentCategory';

interface Props {
	posts: ContentProps[],
	category: CategoryProps,
	images: string[],
	total: number,
	hash?: string
}

interface StaticProp {
	props: Props
}

const type = 'posts';

/**
 * 게시글 페이지 ReactElement 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {ReactElement} ReactElement
 */
export default function Posts({ posts, category, images, total }: Props): ReactElement
{
	const index = getRandomIndex(images.length);

	return (
		<Box component="section">
			<Meta title={MENU_LIST[1].title} description={MENU_LIST[1].desc} url={MENU_LIST[1].url.pathname} image={images[index]} />

			<Screener title={TITLE} menu={MENU_LIST[1].title} lower={MENU_LIST[1].desc} image={images[index]} />

			<ContentCategory type={type} list={category} />

			<ContentBoard baseUrl={`/${type}`} page={1} total={total} list={posts} />
		</Box>
	);
}

/**
 * 사용자 Props 반환 함수
 *
 * @returns {Promise<StaticProp>} 사용자 Props
 */
export async function getStaticProps(): Promise<StaticProp>
{
	const { start, end } = getContentDiv(1);

	const posts = getContentsList(type);

	const subPosts = posts.slice(start, end);
	subPosts.forEach(e => e.content = '');

	const category = getContentsCategory(type);
	const images = getScreenerImage();

	const hash = getBuildHash();

	return {
		props: {
			posts: subPosts,
			category,
			images,
			total: Math.ceil(posts.length / CONTENT_DIV),
			hash
		}
	};
}