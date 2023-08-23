/**
 * 방명록 댓글 template 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 Sat 22:17:05
 */

import CommentsBox from '@kapoo/organism/comments/CommentsBox';

import Container from '@mui/material/Container';
import { ReactNode } from 'react';

/**
 * 방명록 댓글 template 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function CommentsCommentTemplate(): ReactNode
{
	return (
		<Container data-component='CommentsCommentTemplate'>
			<CommentsBox />
		</Container>
	);
}