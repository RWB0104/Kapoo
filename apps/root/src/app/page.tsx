/**
 * 앱 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.05.03 Fri 14:24:51
 */

import PageScreenerTemplate from '@kapoo/global-ui-pack/template/PageScreenerTemplate';
import ScreenPageTemplate from '@kapoo/root-ui-pack/template/ScreenPageTemplate';
import Container from '@mui/material/Container';

/**
 * 앱 페이지 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function AppPage(): JSX.Element
{
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
				/
			</Container>
		</ScreenPageTemplate>
	);
}