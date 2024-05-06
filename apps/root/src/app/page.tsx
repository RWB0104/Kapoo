/**
 * 앱 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.05.03 Fri 14:24:51
 */

import { DevStackCategory, getDevStack } from '@kapoo/api';
import PageScreenerTemplate from '@kapoo/global-ui-pack/template/PageScreenerTemplate';
import DevStackTemplate from '@kapoo/root-ui-pack/template/DevStackTemplate';
import ScreenPageTemplate from '@kapoo/root-ui-pack/template/ScreenPageTemplate';
import TitleTemplate from '@kapoo/ui-pack/template/TitleTemplate';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

/**
 * 앱 페이지 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default async function AppPage(): Promise<JSX.Element>
{
	const categories: DevStackCategory[] = [ 'language', 'framework', 'server', 'database', 'etc' ];

	const stacks = await getDevStack();

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
					<TitleTemplate subtitle='실무, 프로젝트에서 활용한 개발스택의 목록들입니다.' title='🖥️ 개발 스택'>
						<Stack gap={10}>
							{categories.map((i) => (
								<DevStackTemplate
									category={i}
									key={i}
									list={stacks.filter(({ category }) => category === i)}
								/>
							))}
						</Stack>
					</TitleTemplate>
				</Stack>
			</Container>
		</ScreenPageTemplate>
	);
}