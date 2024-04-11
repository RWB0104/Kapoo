/**
 * 마크다운 다이나믹 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.04.05 Fri 18:45:16
 */

import { getMarkdownDetailBySlug, markdownPath } from '@kapoo/blog-ui-pack/common';
import Comment from '@kapoo/blog-ui-pack/organism/Comment';
import ScreenPageTemplate from '@kapoo/blog-ui-pack/template/ScreenPageTemplate';
import { getMarkdownAllList } from '@kapoo/markdown-kit';
import MarkdownViewer from '@kapoo/ui-pack/organism/MarkdownViewer';
import Container from '@mui/material/Container';
import { Metadata } from 'next';

import { getMetadata } from '../../common';

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
	const { meta, body } = getMarkdownDetailBySlug(markdown);

	return (
		<ScreenPageTemplate src={meta.coverImage} title={process.env.NEXT_PUBLIC_TITLE}>
			<Container>
				<MarkdownViewer>
					{body}
				</MarkdownViewer>

				{meta.comment ? <Comment /> : null}
			</Container>
		</ScreenPageTemplate>
	);
}

/**
 * SSG 파라미터 반환 비동기 메서드
 *
 * @returns {Promise} 비동기 DynamicPageProps
 */
export async function generateStaticParams(): Promise<DynamicPageProps[]>
{
	const postsList = getMarkdownAllList(markdownPath.posts, [ 'posts' ]);
	const projectsList = getMarkdownAllList(markdownPath.projects, [ 'projects' ]);

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