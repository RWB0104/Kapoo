/**
 * 뷰 댓글 template 컴포넌트
 *
 * @author RWB
 * @since 2023.08.29 Tue 01:58:16
 */

import Comment from '@kapoo/atom/Comment';

import Container from '@mui/material/Container';
import { ReactNode } from 'react';

/**
 * 뷰 댓글 template 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewCommentTemplate(): ReactNode
{
	return (
		<Container data-component='ViewCommentTemplate'>
			<Comment />
		</Container>
	);
}