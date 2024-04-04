/**
 * 페이지 template 컴포넌트
 *
 * @author RWB
 * @since 2024.04.03 Wed 09:07:11
 */

import Footer from '@kapoo/ui-pack/molecule/Footer';
import Navigation from '@kapoo/ui-pack/organism/Navigation';
import Box from '@mui/material/Box';
import { PropsWithChildren, ReactNode } from 'react';

/**
 * 페이지 template 컴포넌트 반환 메서드
 *
 * @param {PropsWithChildren} param0: PropsWithChildren
 *
 * @returns {ReactNode} ReactNode
 */
export default function PageTemplate({ children }: PropsWithChildren): ReactNode
{
	return (
		<Box component='main' data-component='PageTemplate'>
			<Navigation />

			{children}

			<Footer />
		</Box>
	);
}