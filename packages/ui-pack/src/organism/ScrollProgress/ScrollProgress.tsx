/**
 * 스크롤 진행도 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.29 Mon 16:44:00
 */

'use client';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { CSSProperties, useEffect, useState } from 'react';

export interface ScrollProgressProps
{
	/**
	 * 색상
	 */
	color?: CSSProperties['color'];
}

/**
 * 스크롤 진행도 organism 컴포넌트 반환 메서드
 *
 * @param {ScrollProgressProps} param0: ScrollProgressProps
 *
 * @returns {JSX.Element} JSX
 */
export default function ScrollProgress({ color }: ScrollProgressProps): JSX.Element
{
	const [ progressState, setProgressState ] = useState(0);

	const handle = (): void =>
	{
		const scroll = document.documentElement.scrollTop;
		const { scrollHeight } = document.documentElement;
		const { clientHeight } = document.documentElement;

		const viewport = scrollHeight - clientHeight;
		const percentage = (scroll / viewport) * 100;

		const value = Math.floor(percentage * 100) / 100;

		setProgressState(value);
	};

	useEffect(() =>
	{
		handle();

		document.addEventListener('scroll', handle);

		return () =>
		{
			document.removeEventListener('scroll', handle);
		};
	}, [ handle ]);

	return (
		<Box
			color={color}
			data-component='ScrollProgress'
			left={0}
			position='fixed'
			top={0}
			width='100%'
			zIndex={10001}
		>
			<LinearProgress
				color='inherit'
				value={progressState}
				variant='determinate'
			/>
		</Box>
	);
}