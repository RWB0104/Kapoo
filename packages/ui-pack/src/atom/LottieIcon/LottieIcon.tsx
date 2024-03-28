/**
 * 로티 아이콘 atom 컴포넌트
 *
 * @author RWB
 * @since 2023.09.02 Sat 11:28:18
 */

'use client';

import { DotLottieReact, DotLottieReactProps } from '@lottiefiles/dotlottie-react';
import Box from '@mui/material/Box';
import { CSSProperties, ReactNode } from 'react';

export const lottieIcons = [] as const;
export type LottieIconType = (typeof lottieIcons)[number]

export interface LottieIconProps extends DotLottieReactProps
{
	/**
	 * 아이콘 이름
	 */
	iconName: LottieIconType;

	/**
	 * 너비
	 */
	width?: CSSProperties['width'];

	/**
	 * 높이
	 */
	height?: CSSProperties['height'];

	/**
	 * 최대 너비
	 */
	maxWidth?: CSSProperties['maxWidth'];

	/**
	 * 최대 높이
	 */
	maxHeight?: CSSProperties['maxHeight'];
}

/**
 * 로티 아이콘 atom 컴포넌트 JSX 반환 메서드
 *
 * @param {LottieIconProps} param0: LottieIconProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function LottieIcon({ iconName, width, height, maxWidth, maxHeight, ...props }: LottieIconProps): ReactNode
{
	return (
		<Box data-component='LottieIcon' height={height} maxHeight={maxHeight} maxWidth={maxWidth} width={width}>
			<DotLottieReact {...props} />
		</Box>
	);
}