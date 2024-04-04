/**
 * 댓글 페이지 컴포넌트
 *
 * @author RWB
 * @since 2024.03.31 Sun 05:00:32
 */

import PageTemplate from '@kapoo/blog-ui-pack/template/PageTemplate';
import Screener from '@kapoo/ui-pack/organism/Screener';
import { ReactNode } from 'react';

/**
 * 댓글 페이지 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function CommentsPage(): ReactNode
{
	return (
		<PageTemplate>
			<Screener />
		</PageTemplate>
	);
}