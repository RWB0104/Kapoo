/**
 * 프로젝트 내용 동적 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.10.26 Tue 02:11:21
 */

// 라이브러리 모듈
import Head from 'next/head';

// 사용자 모듈
import ContentLayout from '@components/contents/ContentLayout';
import Meta from '@components/global/Meta';
import Screener from '@components/global/Screener';
import { converter, getBuildHash, getContent, getContentsList } from '@commons/api';
import { ContentPageProps, PageStaticProps, PathsProps, RoutesProps } from '@commons/common';

const type = 'projects';

/**
 * 프로젝트 내용 동적 페이지 JSX 반환 함수
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Project({ page, group, data }: PageStaticProps): JSX.Element | null
{
	const urls = data.url;

	return (
		<section>
			<Head>
				<script src="/js/content.js"></script>
			</Head>

			<Meta title={data.header.title} description={data.header.excerpt} url={`/${data.header.type}/${urls[1]}/${urls[2]}/${urls[3]}/${urls[4]}`} image={data.header.coverImage} />

			<Screener title={data.header.title} menu={type} lower={data.header.category} image={data.header.coverImage} />

			<ContentLayout page={page} group={group} data={data} />
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
	const projects = getContentsList(type);
	const project = getContent(type, params.url.join('-'));

	const index = projects.findIndex(element => element.name === project.name);
	const group = project.header.group ? projects.filter(element => (element.header.group === project.header.group && element.name !== project.name)) : [];

	const { content, toc } = await converter(project.content);

	const hash = getBuildHash();

	return {
		props: {
			page: {
				type: type,
				prev: index + 1 > projects.length - 1 ? null : projects[index + 1],
				next: index - 1 > -1 ? projects[index - 1] : null
			},
			group: group,
			data: {
				...project,
				content,
				toc
			},
			hash: hash
		}
	};
}

/**
 * 동적 경로 반환 함수
 *
 * @returns {Promise<PathsProps>} 동적 경로 객체
 */
export async function getStaticPaths(): Promise<PathsProps>
{
	const projects = getContentsList(type);

	return {
		paths: projects.map((project) =>
		{
			const urls = project.url;

			return {
				params: {
					url: [ urls[1], urls[2], urls[3], urls[4] ]
				}
			};
		}),
		fallback: false
	};
}