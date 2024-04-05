/**
 * 마크다운 다이나믹 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.04.05 Fri 18:45:16
 */

import { getMarkdownAllList } from '@kapoo/markdown-kit';
import MarkdownViewer from '@kapoo/ui-pack/organism/MarkdownViewer';
import { Metadata } from 'next';

import { getMarkdownDetailBySlug, getMetadata, markdownPath } from '../../common';

interface DynamicPageProps
{
	/**
	 * 페이지
	 */
	markdown: string[];
}

/**
 * 마크다운 다이나믹 페이지 컴포넌트 반환 메서드
 *
 * @param {NextPageProps} param0: DynamicPageProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownPage({ params: { markdown } }: NextPageProps<DynamicPageProps>): JSX.Element
{
	const { body } = getMarkdownDetailBySlug(markdown);

	return (
		<MarkdownViewer>
			{body}
		</MarkdownViewer>
	);
}

/**
 * SSG 파라미터 반환 비동기 메서드
 *
 * @returns {Promise} 비동기 DynamicPageProps
 */
export async function generateStaticParams(): Promise<DynamicPageProps[]>
{
	const postsList = getMarkdownAllList(markdownPath.post, [ 'posts' ]);
	const projectsList = getMarkdownAllList(markdownPath.project, [ 'projects' ]);

	const totalList = postsList.concat(projectsList);

	return totalList.map<DynamicPageProps>(({ params, token }) => ({ markdown: [ ...params, ...token ] }));
}

/**
 * 메타데이터 반환 비동기 메서드
 *
 * @param {NextPageProps} param0: DynamicPageProps
 *
 * @returns {Promise} 비동기 메타데이터
 */
export async function generateMetadata({ params: { markdown } }: NextPageProps<DynamicPageProps>): Promise<Metadata>
{
	const { meta, urls } = getMarkdownDetailBySlug(markdown);

	return getMetadata({
		description: meta.excerpt,
		keywords: meta.tag,
		thumbnail: meta.coverImage,
		title: meta.title,
		url: `${meta.type}/${urls.join('/')}`
	});
}