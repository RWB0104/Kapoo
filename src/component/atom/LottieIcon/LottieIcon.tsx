/**
 * 로티 아이콘 atom 컴포넌트
 *
 * @author RWB
 * @since 2023.09.02 Sat 11:28:18
 */

'use client';

import icons from '@kapoo/atom/LottieIcon/icons';

import Box from '@mui/material/Box';
import Lottie, { LottieComponentProps } from 'lottie-react';
import { CSSProperties, ReactNode } from 'react';

export interface LottieIconProps extends Omit<LottieComponentProps, 'animationData'>
{
	/**
	 * 아이콘 이름
	 */
	iconName: keyof typeof icons;

	/**
	 * 너비
	 */
	width?: CSSProperties['width'];

	/**
	 * 높이
	 */
	height?: CSSProperties['height'];
}

/**
 * 로티 아이콘 atom 컴포넌트 JSX 반환 메서드
 *
 * @param {LottieIconProps} param0: LottieIconProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function LottieIcon({ iconName, width, height, ...props }: LottieIconProps): ReactNode
{
	return (
		<Box data-component='LottieIcon' height={height} width={width}>
			<Lottie animationData={icons[iconName]} {...props} />
		</Box>
	);
}