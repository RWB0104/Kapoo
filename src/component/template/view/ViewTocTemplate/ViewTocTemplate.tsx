/**
 * 뷰 TOC template 컴포넌트
 *
 * @author RWB
 * @since 2023.09.01 Fri 13:01:03
 */

import ViewTocBox from '@kapoo/organism/view/ViewTocBox';

import Container from '@mui/material/Container';
import { ReactNode } from 'react';

/**
 * 뷰 TOC template 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewTocTemplate(): ReactNode
{
	return (
		<Container data-component='ViewTocTemplate'>
			<ViewTocBox />
		</Container>
	);
}