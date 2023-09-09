/**
 * 뷰 광고 template 컴포넌트
 *
 * @author RWB
 * @since 2023.09.10 Sun 00:53:46
 */

import Ads from '@kapoo/atom/Ads';

import Container from '@mui/material/Container';
import { ReactNode } from 'react';

/**
 * 뷰 광고 template 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewAdsTemplate(): ReactNode
{
	return (
		<Container data-component='ViewAdsTemplate'>
			<Ads />
		</Container>
	);
}