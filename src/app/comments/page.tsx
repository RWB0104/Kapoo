/**
 * 방명록 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 토 20:09:59
 */

import CommentsTemplate from '@kapoo/template/comments/CommentsTemplate';
import PageTemplate from '@kapoo/template/global/PageTemplate';

import { ReactNode } from 'react';

/**
 * 게시글 페이지 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function PostsPage(): ReactNode
{
	return (
		<PageTemplate>
			<CommentsTemplate />
		</PageTemplate>
	);
}