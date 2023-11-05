/**
 * 뷰 컨트롤 template 컴포넌트
 *
 * @author RWB
 * @since 2023.08.31 Thu 18:26:18
 */

import ViewControllBox from '@kapoo/organism/view/ViewControllBox';
import { MarkdownListItemProps, MarkdownType } from '@kapoo/util/markdown';

import Container from '@mui/material/Container';
import { ReactNode } from 'react';

export interface ViewControllTemplateProps
{
	/**
	 * 마크다운 타입
	 */
	type: MarkdownType;

	/**
	 * 이전 페이지
	 */
	prev: MarkdownListItemProps | null;

	/**
	 * 다음 페이지
	 */
	next: MarkdownListItemProps | null;
}

/**
 * 뷰 컨트롤 template 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewControllTemplate({ type, prev, next }: ViewControllTemplateProps): ReactNode
{
	return (
		<Container data-component='ViewControllTemplate'>
			<ViewControllBox next={next} prev={prev} type={type} />
		</Container>
	);
}