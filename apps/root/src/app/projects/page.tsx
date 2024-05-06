/**
 * 프로젝트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.05.03 Fri 14:51:13
 */

import PageScreenerTemplate from '@kapoo/global-ui-pack/template/PageScreenerTemplate';
import { getMarkdownAllList } from '@kapoo/markdown-kit';
import ProjectGrid from '@kapoo/root-ui-pack/organism/ProjectGrid';
import ScreenPageTemplate from '@kapoo/root-ui-pack/template/ScreenPageTemplate';
import TitleTemplate from '@kapoo/ui-pack/template/TitleTemplate';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

/**
 * 프로젝트 페이지 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function ProjectsPage(): JSX.Element
{
	getMarkdownAllList('src/markdown');

	return (
		<ScreenPageTemplate
			title={process.env.NEXT_PUBLIC_TITLE}
			template={(
				<PageScreenerTemplate
					color='orange'
					subtitle='뭔가 보여줄게 없나 고민하는 중...'
					text='프로젝트'
					title={process.env.NEXT_PUBLIC_TITLE}
				/>
			)}
		>
			<Container>
				<Stack gap={16} marginTop={10}>
					<TitleTemplate subtitle='진행한 프로젝트들의 목록입니다. 카드를 클릭하여 프로젝트들의 간단한 정보를 확인할 수 있습니다.' title='🖥️ 프로젝트'>
						<ProjectGrid list={[]} />
					</TitleTemplate>
				</Stack>
			</Container>
		</ScreenPageTemplate>
	);
}