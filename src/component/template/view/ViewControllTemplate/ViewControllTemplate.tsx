/**
 * 뷰 컨트롤 template 컴포넌트
 *
 * @author RWB
 * @since 2023.08.31 Thu 18:26:18
 */

import ViewControllBox from '@kapoo/organism/view/ViewControllBox';

import Container from '@mui/material/Container';
import { ReactNode } from 'react';

/**
 * 뷰 컨트롤 template 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewControllTemplate(): ReactNode
{
	return (
		<Container data-component='ViewControllTemplate'>
			<ViewControllBox />
		</Container>
	);
}