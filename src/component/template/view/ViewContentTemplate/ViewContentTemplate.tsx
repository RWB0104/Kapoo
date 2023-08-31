/**
 * 뷰 컨텐츠 template 컴포넌트
 *
 * @author RWB
 * @since 2023.08.29 Tue 01:59:26
 */

import ViewContentBox from '@kapoo/organism/view/ViewContentBox';
import ViewImageModal from '@kapoo/organism/view/ViewImageModal';

import Container from '@mui/material/Container';
import { ReactNode } from 'react';

/**
 * 뷰 컨텐츠 template 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewContentTemplate(): ReactNode
{
	return (
		<Container data-component='ViewContentTemplate'>
			<ViewContentBox />
			<ViewImageModal />
		</Container>
	);
}