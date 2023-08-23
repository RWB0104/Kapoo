/**
 * 게시글 template 컴포넌트
 *
 * @author RWB
 * @since 2023.08.20 Sun 02:10:03
 */

'use client';

import PostsListTemplate from '@kapoo/template/posts/PostsListTemplate';
import PostsScreenerTemplate from '@kapoo/template/posts/PostsScreenerTemplate';

import Stack from '@mui/material/Stack';
import { ReactNode } from 'react';

/**
 * 게시글 template 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function PostsTemplate(): ReactNode
{
	return (
		<Stack data-component='PostsTemplate'>
			<PostsScreenerTemplate />
			<PostsListTemplate />
		</Stack>
	);
}