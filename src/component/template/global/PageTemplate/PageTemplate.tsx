/**
 * 페이지 template 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 Sat 03:45:53
 */

import Footer from '@kapoo/molecule/Footer';
import InteractionBox from '@kapoo/organism/global/InteractionBox';
import Navigator from '@kapoo/organism/global/Navigator';
import Toaster from '@kapoo/organism/global/Toaster';

import Box from '@mui/material/Box';
import { PropsWithChildren, ReactNode } from 'react';

export type PageTemplateProps = PropsWithChildren;

/**
 * 페이지 template 컴포넌트 JSX 반환 메서드
 *
 * @param {PageTemplateProps} param0: PageTemplateProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function PageTemplate({ children }: PageTemplateProps): ReactNode
{
	return (
		<Box data-component='PageTemplate'>
			<Navigator />

			<Box component='main'>
				{children}
			</Box>

			<InteractionBox />
			<Toaster />

			<Footer />
		</Box>
	);
}