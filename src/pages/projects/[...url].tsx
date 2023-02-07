/**
 * 프로젝트 내용 동적 페이지 컴포넌트
 *
 * @author RWB
 * @since 2021.10.26 Tue 02:11:21
 */

import { getContent, getContentList } from '@kapoo/commons/api';
import { ContentPageProps, ContentProps, ContentTypeEnum, PathsProps, RoutesProps } from '@kapoo/commons/common';
import ContentLayout from '@kapoo/components/contents/ContentLayout';
import Meta from '@kapoo/components/global/Meta';
import Screener from '@kapoo/components/global/Screener';
import Script from 'next/script';

const type = ContentTypeEnum.PROJECTS;

/**
 * 프로젝트 내용 동적 페이지 JSX 반환 함수
 *
 * @param {ContentProps} content: 컨텐츠
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Project(content: ContentProps): JSX.Element
{
	return (
		<section>
			<Script src='/js/content.js' />

			<Meta description={content.header.excerpt} image={content.header.coverImage} title={content.header.title} url={`/${type}/${content.url[1]}/${content.url[2]}/${content.url[3]}/${content.url[4]}`} />

			<Screener image={content.header.coverImage} lower={content.header.category} menu={type} title={content.header.title} />

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
	const project = await getContent(type, params.url.join('-'), true);

	return { props: project };
}

/**
 * 동적 경로 반환 함수
 *
 * @returns {Promise<PathsProps>} 동적 경로 객체
 */
export async function getStaticPaths(): Promise<PathsProps>
{
	const projects = await getContentList(type, false);

	return {
		fallback: false,
		paths: projects.map((project) =>
		{
			const urls = project.url;

			return { params: { url: [ urls[1], urls[2], urls[3], urls[4] ] } };
		})
	};
}