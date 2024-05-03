/**
 * 프로젝트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.05.03 Fri 14:51:13
 */

import PageScreenerTemplate from '@kapoo/global-ui-pack/template/PageScreenerTemplate';
import ScreenPageTemplate from '@kapoo/root-ui-pack/template/ScreenPageTemplate';
import Container from '@mui/material/Container';

/**
 * 프로젝트 페이지 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function ProjectsPage(): JSX.Element
{
	return (
		<ScreenPageTemplate
			title={process.env.NEXT_PUBLIC_TITLE}
			template={(
				<PageScreenerTemplate
					color='purple'
					subtitle='뭔가 보여줄게 없나 고민하는 중...'
					text='프로젝트'
					title={process.env.NEXT_PUBLIC_TITLE}
				/>
			)}
		>
			<Container>
				/projects
			</Container>
		</ScreenPageTemplate>
	);
}