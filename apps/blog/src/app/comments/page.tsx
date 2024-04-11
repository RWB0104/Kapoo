/**
 * 댓글 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.03.31 Sun 05:00:32
 */

import Comment from '@kapoo/blog-ui-pack/organism/Comment';
import ScreenPageTemplate from '@kapoo/blog-ui-pack/template/ScreenPageTemplate';
import Container from '@mui/material/Container';

import { getMetadata } from '../../common';

export const metadata = getMetadata({
	title: '방명록',
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
		<ScreenPageTemplate title={process.env.NEXT_PUBLIC_TITLE}>
			<Container>
				<Comment />
			</Container>
		</ScreenPageTemplate>
	);
}