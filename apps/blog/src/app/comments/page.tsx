/**
 * 댓글 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.03.31 Sun 05:00:32
 */

import Comment from '@kapoo/blog-ui-pack/organism/Comment';
import PageTemplate from '@kapoo/blog-ui-pack/template/PageTemplate';
import Screener from '@kapoo/ui-pack/organism/Screener';

/**
 * 댓글 페이지 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function CommentsPage(): JSX.Element
{
	return (
		<PageTemplate title={process.env.NEXT_PUBLIC_TITLE}>
			<Screener />

			<Comment />
		</PageTemplate>
	);
}