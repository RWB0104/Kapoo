/**
 * 틸트 박스 molecule 컴포넌트
 *
 * @author RWB
 * @since 2024.05.01 Wed 23:56:03
 */

'use client';

import { mathRound } from '@kapoo/common';
import Box, { BoxProps } from '@mui/material/Box';
import classNames from 'classnames/bind';
import { MouseEventHandler, useCallback } from 'react';

import styles from './TiltBox.module.scss';

const cn = classNames.bind(styles);

export interface TiltBoxProps extends BoxProps
{
	/**
	 * 틸트 비활성화 여부
	 */
	tiltDisabled?: boolean;

	/**
	 * 회전각
	 */
	angle?: number;

	/**
	 * 원근법
	 */
	perspective?: number;
}

/**
 * 틸트 박스 molecule 컴포넌트 반환 메서드
 *
 * @param {RotateBoxProps} param0: TiltBoxProps
 *
 * @returns {JSX.Element} JSX
 */
export default function TiltBox({ tiltDisabled, angle = 30, perspective = 1400, className, onMouseMove, onMouseLeave, onTransitionEnd, ...props }: TiltBoxProps): JSX.Element
{
	const handleMouseMove = useCallback<MouseEventHandler<HTMLDivElement>>((e) =>
	{
		onMouseMove?.(e);

		if (!tiltDisabled)
		{
			const centerX = e.currentTarget.scrollWidth / 2;
			const centerY = e.currentTarget.scrollHeight / 2;

			const x = centerX - e.nativeEvent.offsetX;
			const y = centerY - e.nativeEvent.offsetY;

			const tileX = mathRound(y / centerY, 2) * angle;
			const tileY = mathRound(x / centerX, 2) * angle;

			e.currentTarget.style.transition = '';
			e.currentTarget.style.transform = `perspective(${perspective}px) rotateX(${tileX}deg) rotateY(${-tileY}deg)`;
		}
	}, [ angle, perspective, tiltDisabled, onMouseMove ]);

	const handleMouseLeave = useCallback<MouseEventHandler<HTMLDivElement>>((e) =>
	{
		onMouseLeave?.(e);

		// 틸트가 활성화된 경우
		if (!tiltDisabled)
		{
			e.currentTarget.style.transition = '1s ease-out';
			e.currentTarget.style.transform = '';
		}
	}, [ tiltDisabled, onMouseLeave ]);

	return (
		<Box
			className={cn('box', className)}
			component='div'
			data-component='RotateBox'
			onMouseLeave={handleMouseLeave}
			onMouseMove={handleMouseMove}
			{...props}
		/>
	);
}