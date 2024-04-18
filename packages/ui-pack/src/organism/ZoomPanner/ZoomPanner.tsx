/**
 * 줌 패너 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.18 Thu 17:48:31
 */

'use client';

import Box, { BoxProps } from '@mui/material/Box';
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

export interface ZoomPannerLoadHandler
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

export interface ZoomPannerProps extends BoxProps
{
	/**
	 * 줌 단위
	 */
	zoomUnit?: number;

	/**
	 * 컨트롤 할당 메서드
	 *
	 * @param {ZoomPannerLoadHandler} func: ZoomPannerLoadHandler
	 */
	controller?: (func: ZoomPannerLoadHandler) => void;
}

/**
 * 줌 패너 organism 컴포넌트 반환 메서드
 *
 * @param {ZoomPannerProps} param0: ZoomPannerProps
 *
 * @returns {JSX.Element} JSX
 */
export default function ZoomPanner({ zoomUnit = 0.1, controller, children, ...props }: ZoomPannerProps): JSX.Element
{
	const ref = useRef<HTMLDivElement>(null);

	const [ scaleState, setScaleState ] = useState(1);

	const [ offsetState, setOffsetState ] = useState<OffsetProps>({
		x: 0,
		y: 0
	});

	const [ initOffsetState, setInitOffsetState ] = useState<OffsetProps>();

	const zoom = useCallback<ZoomPannerLoadHandler['zoom']>((value) =>
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
			// 줌 최소 값보다 클 경우
			if (state > zoomUnit)
			{
				return state - zoomUnit;
			}

			return state;
		});
	}, [ zoomUnit ]);

	const reset = useCallback(() =>
	{
		setScaleState(1);
		setOffsetState({
			x: 0,
			y: 0
		});
		setInitOffsetState(undefined);
	}, []);

	const handleDragStart = useCallback<MouseEventHandler<HTMLDivElement>>((e) =>
	{
		setInitOffsetState({
			x: e.clientX - (offsetState?.x || 0),
			y: e.clientY - (offsetState?.y || 0)
		});
	}, [ offsetState, scaleState ]);

	const handleDragEnd = useCallback<MouseEventHandler<HTMLDivElement>>(() =>
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
		<Box
			component='div'
			data-component='ZoomPanner'
			overflow='hidden'
			ref={ref}
			onMouseDown={handleDragStart}
			onMouseUp={handleDragEnd}
		>
			<Box
				component='div'
				style={{
					scale: scaleState,
					transform: `translate(${offsetState.x}px, ${offsetState.y}px)`,
					transformOrigin: 'top left'
				}}
			>
				{children}
			</Box>
		</Box>
	);
}