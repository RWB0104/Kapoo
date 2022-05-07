/**
 * 카테고리별 포스트 동적 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.17 Sat 18:10:25
 */

// 사용자 모듈
import Screener from '@components/global/Screener';
import { getBuildHash, getContentsByCategory, getContentsCategory, getScreenerImage } from '@commons/api';
import { getRandomIndex, ContentProps, PathsProps, RoutesProps, CategoryProps, CONTENT_DIV, getContentDiv } from '@commons/common';
import { MENU_LIST, TITLE } from '@commons/env';
import Meta from '@components/global/Meta';
import ContentBoard from '@components/contents/ContentBoard';
import ContentCategory from '@components/contents/ContentCategory';

interface Props
{
	posts: ContentProps[],
	categories: CategoryProps,
	images: string[],
	category: string
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
 * 카테고리별 포스트 동적 페이지 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function CategoryPosts({ posts, categories, images, category, page, total }: Props): JSX.Element | null
{
	const index = getRandomIndex(images.length);

	return (
		<section>
			<Meta title={MENU_LIST[1].title} description={MENU_LIST[1].desc} url={MENU_LIST[1].url.pathname} image={images[index]} />

			<Screener title={TITLE} menu={MENU_LIST[1].title} lower={MENU_LIST[1].desc} image={images[index]} />

			<ContentCategory type={type} list={categories} />

			<ContentBoard baseUrl={`/${type}/category/${category}`} page={page} total={total} list={posts} />
		</section>
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

	const posts = getContentsByCategory(type, category);

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
			category: category,
			page: parseInt(page),
			total: Math.ceil(posts.length / CONTENT_DIV),
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