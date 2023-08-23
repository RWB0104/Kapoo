/**
 * 방명록 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 Sat 22:14:28
 */

import Comment from '@kapoo/atom/Comment';

import Box from '@mui/material/Box';
import { ReactNode } from 'react';

/**
 * 방명록 박스 organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function CommentsBox(): ReactNode
{
	return (
		<Box data-component='CommentsBox'>
			<Comment />
		</Box>
	);
}