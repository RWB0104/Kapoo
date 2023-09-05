/**
 * 뷰 컨텐츠 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.29 Tue 02:01:48
 */

'use client';

import MarkdownViewer from '@kapoo/molecule/MarkdownViewer';
import { viewStore } from '@kapoo/store/markdown';

import { ReactNode } from 'react';
/**
 * 뷰 컨텐츠 organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewContentBox(): ReactNode
{
	const { view } = viewStore();

	return (
		<MarkdownViewer text={view?.content || ''} />
	);
}