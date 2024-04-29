/**
 * 댓글 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.03.31 Sun 05:00:32
 */

import Comment from '@kapoo/blog-ui-pack/organism/Comment';
import PageScreenerTemplate from '@kapoo/blog-ui-pack/template/PageScreenerTemplate';
import ScreenPageTemplate from '@kapoo/blog-ui-pack/template/ScreenPageTemplate';
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
					<Comment />
				</Stack>
			</Container>
		</ScreenPageTemplate>
	);
}