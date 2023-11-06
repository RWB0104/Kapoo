/**
 * 뷰 TOC template 컴포넌트
 *
 * @author RWB
 * @since 2023.09.01 Fri 13:01:03
 */

import ViewTocBox from '@kapoo/organism/view/ViewTocBox';
import { TocProps } from '@kapoo/util/markdown';

import Container from '@mui/material/Container';
import { ReactNode } from 'react';

export interface ViewTocTemplateProps
{
	/**
	 * TOC
	 */
	toc: TocProps[];
}

/**
 * 뷰 TOC template 컴포넌트 JSX 반환 메서드
 *
 * @param {ViewTocTemplateProps} param0: ViewTocTemplateProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewTocTemplate({ toc }: ViewTocTemplateProps): ReactNode
{
	return (
		<Container data-component='ViewTocTemplate'>
			<ViewTocBox toc={toc} />
		</Container>
	);
}