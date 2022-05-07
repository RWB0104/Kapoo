/**
 * 프로젝트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 00:01:58
 */

// 사용자 모듈
import { getBuildHash, getContentsCategory, getContentsList, getScreenerImage } from '@commons/api';
import { CategoryProps, ContentProps, CONTENT_DIV, getContentDiv, getRandomIndex } from '@commons/common';
import { MENU_LIST, TITLE } from '@commons/env';
import Screener from '@components/global/Screener';
import Meta from '@components/global/Meta';
import ContentCategory from '@components/contents/ContentCategory';
import ContentBoard from '@components/contents/ContentBoard';

interface Props
{
	projects: ContentProps[],
	category: CategoryProps,
	images: string[],
	total: number,
	hash?: string
}

interface StaticProp
{
	props: Props
}

const type = 'projects';

/**
 * 프로젝트 페이지 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Projects({ projects, category, images, total }: Props): JSX.Element | null
{
	const index = getRandomIndex(images.length);

	return (
		<section>
			<Meta title={MENU_LIST[2].title} description={MENU_LIST[2].desc} url={MENU_LIST[2].url.pathname} image={images[index]} />

			<Screener title={TITLE} menu={MENU_LIST[2].title} lower={MENU_LIST[2].desc} image={images[index]} />

			<ContentCategory type={type} list={category} />

			<ContentBoard baseUrl={`/${type}`} page={1} total={total} list={projects} />
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
	const { start, end } = getContentDiv(1);

	const projects = getContentsList(type);

	const subProjects = projects.slice(start, end);
	subProjects.forEach(e => e.content = '');

	const category = getContentsCategory(type);
	const images = getScreenerImage();

	const hash = getBuildHash();

	return {
		props: {
			projects: subProjects,
			category,
			images,
			total: Math.ceil(projects.length / CONTENT_DIV),
			hash
		}
	};
}