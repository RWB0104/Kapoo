/**
 * 방명록 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 Sat 20:09:59
 */

import { PAGE_INFO } from '@kapoo/env';
import CommentsTemplate from '@kapoo/template/comments/CommentsTemplate';
import PageTemplate from '@kapoo/template/global/PageTemplate';
import { getMetadata } from '@kapoo/util/common';

import { ReactNode } from 'react';

export const metadata = getMetadata(PAGE_INFO.comments.title, PAGE_INFO.comments.description, undefined, PAGE_INFO.comments.url);

/**
 * 방명록 페이지 컴포넌트 JSX 반환 메서드
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