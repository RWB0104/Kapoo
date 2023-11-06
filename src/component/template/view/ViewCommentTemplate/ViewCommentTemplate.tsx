/**
 * 뷰 댓글 template 컴포넌트
 *
 * @author RWB
 * @since 2023.08.29 Tue 01:58:16
 */

import ViewCommentBox from '@kapoo/organism/view/ViewCommentBox';
import { MarkdownType } from '@kapoo/util/markdown';

import Container from '@mui/material/Container';
import { ReactNode } from 'react';

export interface ViewCommentTemplateProps
{
	/**
	 * 마크다운 타입
	 */
	type: MarkdownType;

	/**
	 * URL
	 */
	url?: string;

	/**
	 * 댓글 여부
	 */
	comment: boolean;
}

/**
 * 뷰 댓글 template 컴포넌트 JSX 반환 메서드
 *
 * @param {ViewCommentTemplateProps} param0: ViewCommentTemplateProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewCommentTemplate({ type, url, comment }: ViewCommentTemplateProps): ReactNode
{
	return (
		<Container data-component='ViewCommentTemplate'>
			<ViewCommentBox comment={comment} type={type} url={url} />
		</Container>
	);
}