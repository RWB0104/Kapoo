/**
 * 발광 molecule 컴포넌트
 *
 * @author RWB
 * @since 2024.05.14 Tue 10:42:58
 */

import Box, { BoxProps } from '@mui/material/Box';
import classNames from 'classnames/bind';
import { MouseEventHandler, useCallback } from 'react';

import styles from './Glow.module.scss';

const cn = classNames.bind(styles);

export interface GlowProps extends BoxProps
{
	/**
	 * 색상 리스트
	 */
	colors?: string[];

	/**
	 * 발광 여부
	 */
	disabledGlow?: boolean;
}

/**
 * 발광 molecule 컴포넌트 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function Glow({ colors = [ '#CCCCCCCC', '#BFBFBF3F 30%', '#373737 130%' ], disabledGlow, className, onMouseMove, ...props }: GlowProps): JSX.Element
{
	const handleMouseMove = useCallback<MouseEventHandler<HTMLDivElement>>((e) =>
	{
		onMouseMove?.(e);

		// 발광이 활성화된 경우
		if (!disabledGlow)
		{
			e.currentTarget.style.background = `radial-gradient(farthest-corner circle at ${e.nativeEvent.offsetX}px ${e.nativeEvent.offsetY}px, ${colors.join(', ')})`;
		}
	}, [ colors, disabledGlow, onMouseMove ]);

	return (
		<Box
			className={cn('glow', className)}
			component='div'
			height='100%'
			position='absolute'
			width='100%'
			onMouseMove={handleMouseMove}
			{...props}
		/>
	);
}