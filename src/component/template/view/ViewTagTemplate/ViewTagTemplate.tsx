/**
 * 뷰 태그 template 컴포넌트
 *
 * @author RWB
 * @since 2023.09.02 Sat 11:30:09
 */

import ViewTagBox from '@kapoo/organism/view/ViewTagBox';

import Container from '@mui/material/Container';
import { ReactNode } from 'react';

/**
 * 뷰 태그 template 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewTagTemplate(): ReactNode
{
	return (
		<Container data-component='ViewTagTemplate'>
			<ViewTagBox />
		</Container>
	);
}