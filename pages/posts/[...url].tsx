/**
 * 포스트 내용 동적 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.07.17 Sat 02:27:06
 */

// 라이브러리 모듈
import Head from 'next/head';

// 사용자 모듈
import ContentLayout from '@components/contents/ContentLayout';
import Meta from '@components/global/Meta';
import Screener from '@components/global/Screener';
import { getContent, getContentList } from '@commons/api';
import { ContentPageProps, ContentProps, PathsProps, RoutesProps } from '@commons/common';

const type = 'posts';

/**
 * 포스트 내용 동적 페이지 JSX 반환 함수
 *
 * @param {ContentProps} content: 컨텐츠
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Post(content: ContentProps): JSX.Element | null
{
	return (
		<section>
			<Head>
				<script src="/js/content.js"></script>
			</Head>

			<Meta title={content.header.title} description={content.header.excerpt} url={`/${type}/${content.url[1]}/${content.url[2]}/${content.url[3]}/${content.url[4]}`} image={content.header.coverImage} />

			<Screener title={content.header.title} menu={type} lower={content.header.category} image={content.header.coverImage} />

			<ContentLayout data={content} />
		</section>
	);
}

/**
 * 사용자 Props 반환 함수
 *
 * @param {RoutesProps} params: 컨텐츠
 *
 * @returns {Promise<ContentPageProps>} 사용자 Props
 */
export async function getStaticProps({ params }: RoutesProps): Promise<ContentPageProps>
{
	const posts = await getContent(type, params.url.join('-'), true);

	return {
		props: posts
	};
}

/**
 * 동적 경로 반환 함수
 *
 * @returns {Promise<PathsProps>} 동적 경로 객체
 */
export async function getStaticPaths(): Promise<PathsProps>
{
	const posts = await getContentList(type);

	return {
		paths: posts.map((post) =>
		{
			const urls = post.url;

			return {
				params: {
					url: [ urls[1], urls[2], urls[3], urls[4] ]
				}
			};
		}),
		fallback: false
	};
}