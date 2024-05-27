/**
 * 댓글 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.03.31 Sun 05:00:32
 */

import Comment from '@kapoo/blog-ui-pack/organism/Comment';
import ScreenPageTemplate from '@kapoo/blog-ui-pack/template/ScreenPageTemplate';
import PageScreenerTemplate from '@kapoo/global-ui-pack/template/PageScreenerTemplate';
import TitleTemplate from '@kapoo/ui-pack/template/TitleTemplate';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { getMetadata, routers } from '../../common';

export const metadata = getMetadata({
	description: routers.comments.subtitle,
	title: routers.comments.title,
	url: '/comments'
});

/**
 * 댓글 페이지 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function CommentsPage(): JSX.Element
{
	return (
		<ScreenPageTemplate
			title={process.env.NEXT_PUBLIC_TITLE}
			template={(
				<PageScreenerTemplate
					color={routers.comments.color}
					subtitle={routers.comments.subtitle}
					text={routers.comments.title}
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