/**
 * 뷰 프로바이더 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.28 Mon 21:34:00
 */

'use client';

import { viewStore } from '@kapoo/store/markdown';
import { MarkdownProps } from '@kapoo/util/markdown';

import { useEffect } from 'react';

export interface ViewProviderProps
{
	/**
	 * 게시글
	 */
	markdown: MarkdownProps;
}

/**
 * 뷰 프로바이더 organism 컴포넌트 JSX 반환 메서드
 *
 * @param {ViewProviderProps} param0: ViewProviderProps 객체
 */
export default function ViewProvider({ markdown }: ViewProviderProps): null
{
	const { setView } = viewStore();

	useEffect(() =>
	{
		setView(markdown);
	}, [ markdown ]);

	return null;
}