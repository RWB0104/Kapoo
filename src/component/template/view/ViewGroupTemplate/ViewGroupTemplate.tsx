/**
 * 뷰 그룹 template 컴포넌트
 *
 * @author RWB
 * @since 2023.09.01 Fri 02:58:55
 */

import ViewGroupBox from '@kapoo/organism/view/ViewGroupBox';
import { FrontmatterProps, MarkdownListItemProps } from '@kapoo/util/markdown';

import Container from '@mui/material/Container';
import { ReactNode } from 'react';

export interface ViewGroupTemplateProps
{
	/**
	 * 마크다운 메타
	 */
	frontmatter: FrontmatterProps;

	/**
	 * 마크다운 정보
	 */
	group: MarkdownListItemProps[] | null;

	/**
	 * 링크
	 */
	link: string;
}

/**
 * 뷰 그룹 template 컴포넌트 JSX 반환 메서드
 *
 * @param {ViewGroupTemplateProps} param0: ViewGroupTemplateProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewGroupTemplate({ frontmatter, group, link }: ViewGroupTemplateProps): ReactNode
{
	return (
		<Container data-component='ViewGroupTemplate'>
			<ViewGroupBox frontmatter={frontmatter} group={group} link={link} />
		</Container>
	);
}