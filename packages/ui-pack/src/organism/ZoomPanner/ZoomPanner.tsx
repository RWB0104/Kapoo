/**
 * 줌 패너 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.18 Thu 17:48:31
 */

'use client';

import Box from '@mui/material/Box';
import Stack, { StackProps } from '@mui/material/Stack';
import { MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';

interface OffsetProps
{
	/**
	 * x 좌표
	 */
	x: number;

	/**
	 * y 좌표
	 */
	y: number;
}

export interface ZoomPannerControllerProps
{
	/**
	 * 줌 메서드
	 *
	 * @param {number} value: 줌
	 */
	zoom: (value: number) => void;

	/**
	 * 줌 인 메서드
	 */
	zoomIn: () => void;

	/**
	 * 줌 아웃 메서드
	 */
	zoomOut: () => void;

	/**
	 * 리셋 메서드
	 */
	reset: () => void;
}

export interface ZoomPannerProps extends StackProps
{
	/**
	 * 기본 줌
	 */
	defaultZoom?: number;

	/**
	 * 줌 단위
	 */
	zoomUnit?: number;

	/**
	 * 컨트롤 할당 메서드
	 *
	 * @param {ZoomPannerControllerProps} func: ZoomPannerControllerProps
	 */
	controller?: (func: ZoomPannerControllerProps) => void;
}

/**
 * 줌 패너 organism 컴포넌트 반환 메서드
 *
 * @param {ZoomPannerProps} param0: ZoomPannerProps
 *
 * @returns {JSX.Element} JSX
 */
export default function ZoomPanner({ defaultZoom = 1, zoomUnit = 0.1, controller, children, ...props }: ZoomPannerProps): JSX.Element
{
	const ref = useRef<HTMLDivElement>(null);

	const [ scaleState, setScaleState ] = useState(defaultZoom);
	const [ initOffsetState, setInitOffsetState ] = useState<OffsetProps>();
	const [ offsetState, setOffsetState ] = useState<OffsetProps>({
		x: 0,
		y: 0
	});

	const zoom = useCallback<ZoomPannerControllerProps['zoom']>((value) =>
	{
		setScaleState(value);
	}, []);

	const zoomIn = useCallback(() =>
	{
		setScaleState((state) => state + zoomUnit);
	}, [ zoomUnit ]);

	const zoomOut = useCallback(() =>
	{
		setScaleState((state) =>
		{
			const value = Math.floor((state - zoomUnit) * 10) / 10;

			// 줌 단위보다 작을 경우
			if (value <= zoomUnit)
			{
				return zoomUnit;
			}

			return value;
		});
	}, [ zoomUnit ]);

	const reset = useCallback(() =>
	{
		setScaleState(defaultZoom);
		setOffsetState({
			x: 0,
			y: 0
		});
		setInitOffsetState(undefined);
	}, [ defaultZoom ]);

	const handleMouseDown = useCallback<MouseEventHandler<HTMLDivElement>>((e) =>
	{
		setInitOffsetState({
			x: e.clientX - (offsetState?.x || 0) * scaleState,
			y: e.clientY - (offsetState?.y || 0) * scaleState
		});
	}, [ offsetState, scaleState ]);

	const handleMouseUp = useCallback<MouseEventHandler<HTMLDivElement>>(() =>
	{
		setInitOffsetState(undefined);
	}, []);

	useEffect(() =>
	{
		const handleMousemove = (e: MouseEvent): void =>
		{
			// 드래그 중이고, 유효한 값일 경우
			if (initOffsetState && e.clientX > 0 && e.clientY > 0)
			{
				setOffsetState({
					x: (e.clientX - initOffsetState.x) / scaleState,
					y: (e.clientY - initOffsetState.y) / scaleState
				});
			}
		};

		const handleWheel = (e: WheelEvent): void =>
		{
			// 컨트롤 키를 눌렀을 경우
			if (e.ctrlKey)
			{
				e.preventDefault();

				// 확대할 경우
				if (e.deltaY > 0)
				{
					zoomIn();
				}

				// 아닐 경우
				else
				{
					zoomOut();
				}
			}
		};

		// DOM이 유효할 경우
		if (ref.current)
		{
			window.addEventListener('mousemove', handleMousemove);
			ref.current.addEventListener('wheel', handleWheel);
		}

		return () =>
		{
			// DOM이 유효할 경우
			if (ref.current)
			{
				window.removeEventListener('mousemove', handleMousemove);
				ref.current.removeEventListener('wheel', handleWheel);
			}
		};
	}, [ initOffsetState, ref.current, zoomIn, zoomOut ]);

	useEffect(() =>
	{
		controller?.({
			reset,
			zoom,
			zoomIn,
			zoomOut
		});
	}, [ controller, zoom, zoomIn, zoomOut, reset ]);

	return (
		<Stack
			data-component='ZoomPanner'
			overflow='hidden'
			ref={ref}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			{...props}
		>
			<Box
				component='div'
				style={{
					scale: scaleState,
					transform: `translate(${offsetState.x}px, ${offsetState.y}px)`,
					transformOrigin: 'center center'
				}}
			>
				{children}
			</Box>
		</Stack>
	);
}