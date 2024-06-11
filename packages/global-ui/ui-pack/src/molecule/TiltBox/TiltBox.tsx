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
import { CSSProperties, MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';

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

	/**
	 * 스케일
	 */
	scale?: CSSProperties['scale'];
}

/**
 * 틸트 박스 molecule 컴포넌트 반환 메서드
 *
 * @param {RotateBoxProps} param0: TiltBoxProps
 *
 * @returns {JSX.Element} JSX
 */
export default function TiltBox({ tiltDisabled, angle = 30, perspective = 1400, scale = 1, className, children, onMouseEnter, onMouseMove, onMouseLeave, onTransitionEnd, ...props }: TiltBoxProps): JSX.Element
{
	const ref = useRef<HTMLDivElement | null>(null);
	const boxRef = useRef<HTMLDivElement | null>(null);

	const [ enterState, setEnterState ] = useState(false);

	const handleMouseMove = useCallback<MouseEventHandler<HTMLDivElement>>((e) =>
	{
		onMouseMove?.(e);

		// 틸트가 활성화된 경우
		if (!tiltDisabled && ref.current && boxRef.current)
		{
			const rect = ref.current.getBoundingClientRect();
			const offsetX = e.clientX - rect.left;
			const offsetY = e.clientY - rect.top;

			const centerX = e.currentTarget.scrollWidth / 2;
			const centerY = e.currentTarget.scrollHeight / 2;

			const x = centerX - offsetX;
			const y = centerY - offsetY;

			const tileX = mathRound(y / centerY, 2) * angle;
			const tileY = mathRound(x / centerX, 2) * angle;

			boxRef.current.style.scale = `${scale}`;
			boxRef.current.style.transform = `perspective(${perspective}px) rotateX(${tileX}deg) rotateY(${-tileY}deg)`;
		}
	}, [ ref, boxRef, enterState, angle, perspective, scale, tiltDisabled, onMouseMove ]);

	const handleMouseEnter = useCallback<MouseEventHandler<HTMLDivElement>>((e) =>
	{
		onMouseEnter?.(e);

		// 틸트가 활성화된 경우
		if (!tiltDisabled && boxRef.current)
		{
			setEnterState(true);

			setTimeout(() => setEnterState(false), 300);
		}
	}, [ boxRef, tiltDisabled, onMouseEnter ]);

	const handleMouseLeave = useCallback<MouseEventHandler<HTMLDivElement>>((e) =>
	{
		onMouseLeave?.(e);

		// 틸트가 활성화된 경우
		if (!tiltDisabled && boxRef.current)
		{
			boxRef.current.style.transition = '1s ease-out';
			boxRef.current.style.scale = '';
			boxRef.current.style.transform = '';
		}
	}, [ boxRef, tiltDisabled, onMouseLeave ]);

	useEffect(() =>
	{
		if (boxRef.current)
		{
			boxRef.current.style.transition = enterState ? '0.3s ease' : '0.3s scale';
		}
	}, [ boxRef.current, enterState ]);

	return (
		<Box
			className={cn('box', className)}
			component='div'
			data-component='TiltBox'
			ref={ref}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onMouseMove={handleMouseMove}
			{...props}
		>
			<Box ref={boxRef}>{children}</Box>
		</Box>
	);
}