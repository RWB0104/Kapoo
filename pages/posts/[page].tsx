/**
 * 포스트 동적 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.17 Sat 18:10:25
 */

// 사용자 모듈
import Screener from '@components/global/Screener';
import { getBuildHash, getContentsCategory, getContentsList, getScreenerImage } from '@commons/api';
import { getRandomIndex, ContentProps, RouteProps, PathProps, CategoryProps, getContentDiv, CONTENT_DIV } from '@commons/common';
import { LOGO, MENU_LIST, TITLE } from '@commons/env';
import Meta from '@components/global/Meta';
import ContentBoard from '@components/contents/ContentBoard';
import ContentCategory from '@components/contents/ContentCategory';

interface Props
{
	posts: ContentProps[],
	categories: CategoryProps,
	images: string[],
	page: number,
	total: number,
	hash?: string
}

interface StaticProp
{
	props: Props
}

const type = 'posts';

/**
 * 포스트 동적 페이지 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Posts({ posts, categories, images, page, total }: Props): JSX.Element | null
{
	const index = getRandomIndex(images.length);

	return (
		<section>
			<Meta title={MENU_LIST[1].title} description={MENU_LIST[1].desc} url={MENU_LIST[1].url.pathname} image={LOGO} />

			<Screener title={TITLE} menu={MENU_LIST[1].title} lower={MENU_LIST[1].desc} image={images[index]} />

			<ContentCategory type={type} list={categories} />

			<ContentBoard baseUrl={`/${type}`} page={page} total={total} list={posts} />
		</section>
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

	const subPosts = posts.slice(start, end);
	subPosts.forEach(e => e.content = '');

	const categories = getContentsCategory(type);
	const images = getScreenerImage();

	const hash = getBuildHash();

	return {
		props: {
			posts: subPosts,
			categories,
			images,
			page: parseInt(params.page),
			total: Math.ceil(posts.length / CONTENT_DIV),
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