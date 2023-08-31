/**
 * 뷰 그룹 template 컴포넌트
 *
 * @author RWB
 * @since 2023.09.01 Fri 02:58:55
 */

import ViewGroupBox from '@kapoo/organism/view/ViewGroupBox';

import Container from '@mui/material/Container';
import { ReactNode } from 'react';

/**
 * 뷰 그룹 template 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewGroupTemplate(): ReactNode
{
	return (
		<Container data-component='ViewGroupTemplate'>
			<ViewGroupBox />
		</Container>
	);
}