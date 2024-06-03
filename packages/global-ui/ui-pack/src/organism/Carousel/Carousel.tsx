/**
 * 캐러셀 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.05.09 Thu 14:25:11
 */

'use client';

import { modulo } from '@kapoo/common';
import Box from '@mui/material/Box';
import { CSSProperties, TouchEventHandler, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, MouseEventHandler } from 'react';

export type CarouselRenderHandler = (index: number) => JSX.Element;
export type CarouselMovetoHandler = (index: number) => void;
export type CarouselMoveHandler = (flag: 'left' | 'right') => void;

export interface CarouselControllerProps
{
	/**
	 * 특정 슬라이드 이동 핸들러
	 */
	moveto: CarouselMovetoHandler;

	/**
	 * 슬라이드 이동 핸들러
	 */
	move: CarouselMoveHandler;
}

export type CarouselInitHandler = (handle: CarouselControllerProps) => void;
export type CarouselChangeHandler = (index: number) => void;

export interface CarouselProps
{
	/**
	 * 기본 인덱스
	 */
	defaultIndex?: number;

	/**
	 * 전체 갯수
	 */
	total: number;

	/**
	 * 너비
	 */
	width?: CSSProperties['width'];

	/**
	 * 높이
	 */
	height?: CSSProperties['height'];

	/**
	 * 애니메이션 시간 (ms)
	 */
	transition?: number;

	/**
	 * 렌더링 핸들러
	 */
	children: CarouselRenderHandler;

	/**
	 * 초기화 메서드
	 */
	onInit?: CarouselInitHandler;

	/**
	 * 변화 핸들러
	 */
	onChange?: CarouselChangeHandler;
}

export default function Carousel({ defaultIndex = 0, total, width = '100%', height = '100%', transition = 500, onInit, onChange, children }: CarouselProps): JSX.Element
{
	const [ indexState, setIndexState ] = useState(defaultIndex);
	const [ isAnimateState, setAnimateState ] = useState(true);
	const [ delayState, setDelayState ] = useState(false);

	const dragRef = useRef(0);

	const list = useMemo(() =>
	{
		const base = Array.from({ length: total }, (i, j) => j);

		return [ -1, ...base, total ];
	}, [ total ]);

	const slide = useCallback((n: number): void =>
	{
		setTimeout(() =>
		{
			setAnimateState(false);
			setIndexState(n);
			setDelayState(false);
		}, transition);
	}, [ transition ]);

	const moveto = useCallback<CarouselMovetoHandler>(
		(n) =>
		{
			// 아직 대기 중일 경우
			if (delayState)
			{
				return;
			}

			setDelayState(true);

			// 마지막 슬라이드로 넘어갈 경우
			if (n === total)
			{
				slide(0);
			}

			// 첫 슬라이드로 넘어갈 경우
			else if (n === -1)
			{
				slide(total - 1);
			}

			setIndexState(n);
			setAnimateState(true);

			setTimeout(() =>
			{
				setDelayState(false);
			}, transition);
		},
		[ indexState, delayState, slide, transition ]
	);

	const move = useCallback<CarouselMoveHandler>(
		(direction) =>
		{
			moveto(indexState + (direction === 'left' ? -1 : 1));
		},
		[ indexState, total, moveto ]
	);

	const dragStart = useCallback((num: number) =>
	{
		dragRef.current = num;
	}, []);

	const dragMove = useCallback((num: number, tag: HTMLElement) =>
	{
		const currTouchX = num;

		tag.style.transform = `translateX(calc(${
			indexState * -100
		}% - ${dragRef.current - currTouchX || 0}px))`;
		tag.style.transition = '';
	}, []);

	const dragEnd = useCallback((num: number, tag: HTMLElement) =>
	{
		tag.style.transition = '0.5s';

		if (dragRef.current >= num)
		{
			move('right');
		}
		else
		{
			move('left');
		}
	}, [ dragRef.current, move ]);

	const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) =>
	{
		dragStart(e.nativeEvent.clientX);
	};

	const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) =>
	{
		dragMove(e.nativeEvent.clientX, e.currentTarget);
	};

	const handleMouseUp: MouseEventHandler<HTMLDivElement> = (e) =>
	{
		dragEnd(e.nativeEvent.clientX, e.currentTarget);
	};

	const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) =>
	{
		dragStart(e.nativeEvent.touches[0].clientX);
	};

	const handleTouchMove: TouchEventHandler<HTMLDivElement> = (e) =>
	{
		dragMove(e.nativeEvent.changedTouches[0].clientX, e.currentTarget);
	};

	const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (e) =>
	{
		dragEnd(e.nativeEvent.changedTouches[0].clientX, e.currentTarget);
	};

	useLayoutEffect(() =>
	{
		onInit?.({ move, moveto });
	}, [ onInit, move, moveto ]);

	useEffect(() =>
	{
		onChange?.(indexState);
	}, [ indexState, onChange ]);

	return (
		<Box
			data-component='Carousel'
			height={height}
			overflow='hidden'
			width={width}
		>
			<Box
				component='div'
				draggable={false}
				height='100%'
				position='relative'
				width='100%'
				sx={{
					transform: `translateX(${indexState * -100}%)`,
					transition: isAnimateState ? '0.5s' : undefined
				}}
				onDrag={handleMouseMove}
				onDragEnd={handleMouseDown}
				onDragStart={handleMouseUp}
				onTouchEnd={handleTouchEnd}
				onTouchMove={handleTouchMove}
				onTouchStart={handleTouchStart}
			>
				{list.map((i) => (
					<Box
						draggable={false}
						height='100%'
						key={i}
						left={`${i * 100}%`}
						position='absolute'
						top={0}
						width='100%'
					>
						{children(modulo(i, total))}
					</Box>
				))}
			</Box>
		</Box>
	);
}