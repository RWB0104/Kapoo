/**
 * 방명록 template 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 토 22:11:02
 */

import CommentsCommentTemplate from '@kapoo/template/comments/CommentsCommentTemplate';
import CommentsScreenerTemplate from '@kapoo/template/comments/CommentsScreenerTemplate';

import Stack from '@mui/material/Stack';
import { ReactNode } from 'react';

/**
 * 방명록 template 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function CommentsTemplate(): ReactNode
{
	return (
		<Stack data-component='CommentsTemplate'>
			<CommentsScreenerTemplate />
			<CommentsCommentTemplate />
		</Stack>
	);
}