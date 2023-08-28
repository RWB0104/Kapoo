/**
 * 게시글 리스트 template 컴포넌트
 *
 * @author RWB
 * @since 2023.08.21 Mon 19:00:50
 */

import MarkdownBox from '@kapoo/organism/markdown/MarkdownBox';

import Container from '@mui/material/Container';
import { ReactNode } from 'react';

/**
 * 게시글 리스트 template 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function PostsListTemplate(): ReactNode
{
	return (
		<Container data-component='PostsListTemplate'>
			<MarkdownBox type='posts' />
		</Container>
	);
}