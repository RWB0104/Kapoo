/**
 * 뷰 컨텐츠 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.29 Tue 02:01:48
 */

import MarkdownViewer from '@kapoo/molecule/MarkdownViewer';

import { ReactNode } from 'react';

export interface ViewContentBoxProps
{
	/**
	 * 내용
	 */
	content?: string;
}

/**
 * 뷰 컨텐츠 organism 컴포넌트 JSX 반환 메서드
 *
 * @param {ViewContentBoxProps} param0: ViewContentBoxProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewContentBox({ content }: ViewContentBoxProps): ReactNode
{
	return (
		<MarkdownViewer text={content || ''} />
	);
}