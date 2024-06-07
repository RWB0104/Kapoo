/**
 * 앱 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.03.31 Sun 04:48:01
 */

import { getMarkdownDetailListForGrid } from '@kapoo/blog-ui-pack/common';
import LabNameTag from '@kapoo/blog-ui-pack/organism/LabNameTag';
import MarkdownGrid from '@kapoo/blog-ui-pack/organism/MarkdownGrid';
import ScreenPageTemplate from '@kapoo/blog-ui-pack/template/ScreenPageTemplate';
import PageScreenerTemplate from '@kapoo/global-ui-pack/template/PageScreenerTemplate';
import TiltBox from '@kapoo/ui-pack/molecule/TiltBox';
import Img from '@kapoo/ui-pack/organism/Img';
import TitleTemplate from '@kapoo/ui-pack/template/TitleTemplate';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import pkg from '../../package.json';
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

	const newistList = postsGrid.concat(projectsGrid)
		.filter(({ meta: { date } }) => Date.now() - date < 86400000 * 15)
		.sort((prev, next) => next.meta.date - prev.meta.date);

	return (
		<ScreenPageTemplate
			title={process.env.NEXT_PUBLIC_TITLE}
			version={pkg.version}
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
					<Stack direction='row' justifyContent='center'>
						<TiltBox>
							<Stack alignItems='center' gap={2}>
								<Box
									borderRadius={2}
									boxShadow='0px 0px 20px #00000050'
									height='100%'
									maxHeight={300}
									maxWidth={300}
									overflow='hidden'
									width='100%'
								>
									<Img src='/thumb.png' />
								</Box>

								<Typography variant='h6'>{process.env.NEXT_PUBLIC_TITLE}</Typography>
							</Stack>
						</TiltBox>
					</Stack>

					<TitleTemplate subtitle='2주 이내에 작성된 컨텐츠들의 목록입니다.' title='🔥 최신 컨텐츠'>
						<MarkdownGrid list={newistList} disabledReferer />
					</TitleTemplate>

					<TitleTemplate subtitle='한 달 이내의 게시글 중, 가장 조회수가 높은 게시글들의 목록입니다.' title='👑 인기 게시글'>
						<Stack alignItems='center' gap={4}>
							<MarkdownGrid list={postsList} disabledReferer />

							<Button href='/posts'>
								<Typography variant='h5'>🔎 게시글 전체보기</Typography>
							</Button>
						</Stack>
					</TitleTemplate>

					<TitleTemplate subtitle='한 달 이내의 프로젝트 중, 가장 조회수가 높은 프로젝트들의 목록입니다.' title='👑 인기 프로젝트'>
						<Stack alignItems='center' gap={4}>
							<MarkdownGrid list={projectsList} disabledReferer />

							<Button href='/projects'>
								<Typography variant='h5'>🔎 프로젝트 전체보기</Typography>
							</Button>
						</Stack>
					</TitleTemplate>

					<LabNameTag />
				</Stack>
			</Container>
		</ScreenPageTemplate>
	);
}