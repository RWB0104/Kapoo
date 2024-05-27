/**
 * 토스티파이 프로바이더 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.24 Wed 16:00:06
 */

'use client';

import { notoSans, useResizeObserver } from '@kapoo/common';
import { useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

/**
 * 토스티파이 프로바이더 organism 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function ToastifyProvider(): JSX.Element
{
	const [ heightState, setHeightState ] = useState<number>();

	const { palette: { mode }, breakpoints } = useTheme();
	const isFullsize = useMediaQuery(breakpoints.down(481));

	useResizeObserver('#header', ({ borderBoxSize }) => setHeightState(borderBoxSize[0].blockSize + (isFullsize ? 0 : 16)));

	return (
		<ToastContainer
			autoClose={2000}
			data-component='ToastifyProvider'
			limit={5}
			style={{ top: heightState }}
			theme={mode}
			toastStyle={{ fontFamily: notoSans.style.fontFamily }}
		/>
	);
}