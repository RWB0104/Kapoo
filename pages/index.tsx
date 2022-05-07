/**
 * 인덱스 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 14:19:40
 */

// 사용자 모듈
import Artbox from '@components/global/Artbox';
import Screener from '@components/global/Screener';
import ContentsCase from '@components/home/ContentsCase';
import { getBuildHash, getContentsList, getScreenerImage } from '@commons/api';
import { MENU_LIST, TITLE } from '@commons/env';
import { getRandomIndex, ContentProps, getContentDiv } from '@commons/common';
import Meta from '@components/global/Meta';

interface Props
{
	images: string[],
	posts: ContentProps[],
	projects: ContentProps[],
	hash?: string
}

interface StaticProp
{
	props: Props
}

/**
 * 홈 페이지 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Home({ images, posts, projects }: Props): JSX.Element | null
{
	const index = getRandomIndex(images.length);

	return (
		<section>
			<Meta title={MENU_LIST[0].title} description={MENU_LIST[0].desc} image={images[index]} url="" />

			<Screener title={TITLE} menu={MENU_LIST[0].title} lower={MENU_LIST[0].desc} image={images[index]} />

			<ContentsCase num={5} title={MENU_LIST[1].title} url={MENU_LIST[1].url} list={posts} />

			<Artbox />

			<ContentsCase num={5} title={MENU_LIST[2].title} url={MENU_LIST[2].url} list={projects} />
		</section>
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

	const { start, end } = getContentDiv(1);

	const posts = getContentsList('posts');

	const subPosts = posts.slice(start, end);
	subPosts.forEach(e => e.content = '');

	const projects = getContentsList('projects');

	const subProjects = projects.slice(start, end);
	subProjects.forEach(e => e.content = '');

	const hash = getBuildHash();

	return {
		props: { images, posts: subPosts, projects: subProjects, hash }
	};
}