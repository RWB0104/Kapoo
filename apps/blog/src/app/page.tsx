/**
 * 앱 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.03.31 Sun 04:48:01
 */

import { getMarkdownDetailListForGrid } from '@kapoo/blog-ui-pack/common';
import MarkdownGrid from '@kapoo/blog-ui-pack/organism/MarkdownGrid';
import PageScreenerTemplate from '@kapoo/blog-ui-pack/template/PageScreenerTemplate';
import ScreenPageTemplate from '@kapoo/blog-ui-pack/template/ScreenPageTemplate';
import TitleTemplate from '@kapoo/blog-ui-pack/template/TitleTemplate';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { getMetadata, getPopularList } from '../common';

export const metadata = getMetadata({ title: '홈' });

/**
 * 앱 페이지 컴포넌트 반환 비동기 메서드
 *
 * @returns {Promise} 비동기 JSX
 */
export default async function AppPage(): Promise<JSX.Element>
{
	const postsGrid = getMarkdownDetailListForGrid('posts');
	const projectsGrid = getMarkdownDetailListForGrid('projects');

	const postsList = await getPopularList('posts');
	const projectsList = await getPopularList('projects');

	const newistList = postsGrid.concat(projectsGrid).filter(({ meta: { date } }) => Date.now() - date < 86400000 * 15);

	return (
		<ScreenPageTemplate
			title={process.env.NEXT_PUBLIC_TITLE}
			template={(
				<PageScreenerTemplate
					color='gold'
					subtitle={process.env.NEXT_PUBLIC_DESCRIPTION}
					text='홈'
					title={process.env.NEXT_PUBLIC_TITLE}
				/>
			)}
		>
			<Container>
				<Stack gap={16} marginTop={10}>
					<TitleTemplate subtitle='2주 이내에 작성된 컨텐츠들의 목록입니다.' title='🔥 최신 컨텐츠'>
						<MarkdownGrid list={newistList} disabledReferer />
					</TitleTemplate>

					<TitleTemplate subtitle='한 달 이내의 게시글 중, 가장 조회수가 높은 게시글들의 목록입니다.' title='👑 인기 게시글'>
						<MarkdownGrid list={postsList} disabledReferer />
					</TitleTemplate>

					<TitleTemplate subtitle='한 달 이내의 프로젝트 중, 가장 조회수가 높은 프로젝트들의 목록입니다.' title='👑 인기 프로젝트'>
						<MarkdownGrid list={projectsList} disabledReferer />
					</TitleTemplate>
				</Stack>
			</Container>
		</ScreenPageTemplate>
	);
}