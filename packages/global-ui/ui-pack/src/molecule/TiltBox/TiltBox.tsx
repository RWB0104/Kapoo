/**
 * 틸트 박스 molecule 컴포넌트
 *
 * @author RWB
 * @since 2024.05.01 Wed 23:56:03
 */

'use client';

import { mathRound } from '@kapoo/common';
import Box, { BoxProps } from '@mui/material/Box';
import { MouseEventHandler, TransitionEventHandler, useCallback } from 'react';

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
export default function TiltBox({ tiltDisabled, angle = 10, perspective = 1400, onMouseMove, onMouseLeave, onTransitionEnd, ...props }: TiltBoxProps): JSX.Element
{
	const handleMouseMove = useCallback<MouseEventHandler<HTMLDivElement>>((e) =>
	{
		onMouseMove?.(e);

		if (!tiltDisabled)
		{
			const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
			const centerX = mathRound((left + width / 2), 2);
			const centerY = mathRound((top + height / 2), 2);

			const relativeX = mathRound(e.clientX - centerX, 2);
			const relativeY = mathRound(e.clientY - centerY, 2);

			const tileX = mathRound(relativeY / (height / 2), 2) * angle;
			const tileY = mathRound(relativeX / (width / 2), 2) * angle;

			e.currentTarget.style.transition = '';
			e.currentTarget.style.transform = `rotateX(${tileX}deg) rotateY(${-tileY}deg) perspective(${perspective}px) scale3d(1.04, 1.04, 1.04)`;
		}
	}, [ angle, perspective, tiltDisabled, onMouseMove ]);

	const handleMouseLeave = useCallback<MouseEventHandler<HTMLDivElement>>((e) =>
	{
		onMouseLeave?.(e);

		if (!tiltDisabled)
		{
			e.currentTarget.style.transition = '1s ease-out';
			e.currentTarget.style.transform = '';
		}
	}, [ tiltDisabled, onMouseLeave ]);

	const handleTransitionEnd = useCallback<TransitionEventHandler<HTMLDivElement>>((e) =>
	{
		onTransitionEnd?.(e);

		if (!tiltDisabled)
		{
			e.currentTarget.style.transition = '';
		}
	}, [ tiltDisabled, onTransitionEnd ]);

	return (
		<Box
			component='div'
			data-component='RotateBox'
			sx={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
			onMouseLeave={handleMouseLeave}
			onMouseMove={handleMouseMove}
			onTransitionEnd={handleTransitionEnd}
			{...props}
		/>
	);
}