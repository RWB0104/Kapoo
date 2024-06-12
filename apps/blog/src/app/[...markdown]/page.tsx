/**
 * 마크다운 다이나믹 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.04.05 Fri 18:45:16
 */

import { getMarkdownDetailBySlug, getUrl, markdownPath } from '@kapoo/blog-ui-pack/common';
import Comment from '@kapoo/blog-ui-pack/organism/Comment';
import LabNameTag from '@kapoo/blog-ui-pack/organism/LabNameTag';
import MarkdownGroup from '@kapoo/blog-ui-pack/organism/MarkdownGroup';
import MarkdownMenu from '@kapoo/blog-ui-pack/organism/MarkdownMenu';
import MarkdownShareBox from '@kapoo/blog-ui-pack/organism/MarkdownShareBox';
import MarkdownTagsBox from '@kapoo/blog-ui-pack/organism/MarkdownTagsBox';
import ThanksCard from '@kapoo/blog-ui-pack/organism/ThanksCard';
import MarkdownScreenerTemplate from '@kapoo/blog-ui-pack/template/MarkdownScreenerTemplate';
import ScreenPageTemplate from '@kapoo/blog-ui-pack/template/ScreenPageTemplate';
import { getMarkdownAllList } from '@kapoo/markdown-kit';
import GoogleAdsense from '@kapoo/ui-pack/atom/GoogleAdsense/GoogleAdsense';
import Hits from '@kapoo/ui-pack/atom/Hits';
import MarkdownTocBox from '@kapoo/ui-pack/organism/MarkdownTocBox';
import MarkdownViewer from '@kapoo/ui-pack/organism/MarkdownViewer';
import ScrollProgress from '@kapoo/ui-pack/organism/ScrollProgress';
import { Divider } from '@mui/material';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Metadata } from 'next';

import pkg from '../../../package.json';
import { getMetadata, routers } from '../../common';

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
	const { meta, body, toc, group, prev, next, url } = getMarkdownDetailBySlug(markdown);

	return (
		<ScreenPageTemplate
			src={meta.coverImage}
			title={process.env.NEXT_PUBLIC_TITLE}
			version={pkg.version}
			template={(
				<MarkdownScreenerTemplate
					color={routers[meta.type].color}
					description={meta.excerpt}
					timestamp={meta.date}
					title={meta.title}
					url={`${process.env.NEXT_PUBLIC_BASE_URL}${url}`}
				/>
			)}
		>
			<ScrollProgress color={routers[meta.type].color} />

			<Container>
				<Stack gap={4} paddingTop={10}>
					{meta.group && group ? (
						<MarkdownGroup
							current={url}
							groups={group}
							thumbnail={meta.coverImage}
							title={meta.group}
						/>
					) : null}

					<MarkdownTocBox list={toc} />

					<Divider variant='fullWidth' />

					<MarkdownViewer>
						{body}
					</MarkdownViewer>

					<Divider variant='fullWidth' />

					<GoogleAdsense />

					<MarkdownTagsBox tags={meta.tag} type={meta.type} />

					<LabNameTag />

					<MarkdownMenu next={next} prev={prev} type={meta.type} />

					<Stack alignItems='center' justifyContent='center' width='100%'>
						<ThanksCard />
					</Stack>

					<MarkdownShareBox
						direction='row'
						gap={4}
						iconColor='inherit'
						justifyContent='center'
						shareData={{
							text: meta.excerpt,
							title: meta.title,
							url
						}}
					/>

					{meta.comment ? <Comment /> : null}

					<Stack alignItems='center'>
						<Hits
							countBgcolor='#484848'
							icon='react.svg'
							iconColor='dodgerblue'
							text='view'
							titleBgcolor='#242424'
							unique={`${process.env.NEXT_PUBLIC_BASE_URL}${url}`}
						/>
					</Stack>
				</Stack>
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
	const postsList = getMarkdownAllList(markdownPath.posts)
		.map<DynamicPageProps>(({ filename }) => ({ markdown: getUrl(filename, 'posts').split('/').slice(1, 6) }));
	const projectsList = getMarkdownAllList(markdownPath.projects)
		.map<DynamicPageProps>(({ filename }) => ({ markdown: getUrl(filename, 'projects').split('/').slice(1, 6) }));

	return postsList.concat(projectsList);
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
	const { filename, meta } = getMarkdownDetailBySlug(markdown);

	return getMetadata({
		description: meta.excerpt,
		keywords: meta.tag,
		thumbnail: meta.coverImage,
		title: meta.title,
		url: getUrl(filename, meta.type)
	});
}