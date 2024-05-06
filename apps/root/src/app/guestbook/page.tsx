/**
 * 방명록 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.05.03 Fri 14:51:46
 */

import PageScreenerTemplate from '@kapoo/global-ui-pack/template/PageScreenerTemplate';
import Comment from '@kapoo/root-ui-pack/organism/Comment';
import ScreenPageTemplate from '@kapoo/root-ui-pack/template/ScreenPageTemplate';
import TitleTemplate from '@kapoo/ui-pack/template/TitleTemplate';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

/**
 * 방명록 페이지 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function GuestbookPage(): JSX.Element
{
	return (
		<ScreenPageTemplate
			title={process.env.NEXT_PUBLIC_TITLE}
			template={(
				<PageScreenerTemplate
					color='hotpink'
					subtitle='💝 두근대며 읽어보는 중...'
					text='방명록'
					title={process.env.NEXT_PUBLIC_TITLE}
				/>
			)}
		>
			<Container>
				<Stack marginTop={10}>
					<TitleTemplate subtitle='여러분들의 다양한 생각을 남겨주세요! 운영에 큰 힘이 됩니다.' title='💝 방명록'>
						<Comment />
					</TitleTemplate>
				</Stack>
			</Container>
		</ScreenPageTemplate>
	);
}