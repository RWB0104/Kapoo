/**
 * 캐러셀 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.05.09 Thu 14:25:11
 */

'use client';

import { modulo } from '@kapoo/common';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { CSSProperties, MouseEvent, TouchEvent, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';

type CarouselInteractionHandler = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent> | TouchEvent<HTMLDivElement>) => void;

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
	 * 갭
	 */
	gap?: number;

	/**
	 * 사이드 갭
	 */
	sideGap?: number;

	/**
	 * 무한 여부
	 */
	infinite?: boolean;

	/**
	 * 드래그 비활성화 여부
	 */
	disabledDrag?: boolean;

	/**
	 * 드래그 감지 크기
	 */
	dragDelta?: number;

	/**
	 * 애니메이션 시간 (ms)
	 */
	transition?: number;

	/**
	 * 자동 실행 시간 (ms)
	 */
	autoPlayTime?: number;

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

/**
 * 캐러셀 organism 컴포넌트 반환 메서드
 *
 * @param {CarouselProps} param0: CarouselProps
 *
 * @returns {JSX.Element} JSX
 */
export default function Carousel({ defaultIndex = 0, total, width = '100%', height = '100%', gap = 0, sideGap = 0, infinite, disabledDrag, dragDelta = 20, transition = 500, autoPlayTime, onInit, onChange, children }: CarouselProps): JSX.Element
{
	const [ indexState, setIndexState ] = useState(defaultIndex);
	const [ isAnimateState, setAnimateState ] = useState(true);
	const [ delayState, setDelayState ] = useState(false);
	const [ dragState, setDragState ] = useState({
		end: 0,
		start: 0
	});

	const list = useMemo(() =>
	{
		const base = Array.from({ length: total }, (i, j) => j);

		return [ -2, -1, ...base, total, total - 1 ];
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

	const x = useMemo(
		() => (gap + sideGap) * (indexState + 3)
			+ sideGap * 2
			+ sideGap * indexState
			+ dragState.end - dragState.start,
		[ indexState, gap, sideGap, dragState ]
	);

	const moveto = useCallback<CarouselMovetoHandler>(
		(n) =>
		{
			// 딜레이 중이거나, 일반 캐러셀 밖으로 이동할 때
			if (delayState || (!infinite && (n < 0 || n >= total)))
			{
				return;
			}

			const first = 0;
			const last = total - 1;

			setDelayState(true);

			// 마지막 슬라이드로 넘어갈 경우
			if (n > last)
			{
				slide(first);
			}

			// 첫 슬라이드로 넘어갈 경우
			else if (n < first)
			{
				slide(last);
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

	const handleRender = useCallback((i: number): JSX.Element | null =>
	{
		// 무한 캐러셀이 아닐 경우
		if (!infinite)
		{
			// 더미 영역일 경우
			if (i < 0 || i >= total)
			{
				return null;
			}

			return children(i);
		}

		return children(modulo(i, total));
	}, [ infinite, total, children ]);

	const handleInteractionStart = useCallback<CarouselInteractionHandler>((e) =>
	{
		// 드래그 비활성화일 경우
		if (disabledDrag)
		{
			return;
		}

		let pageX = 0;

		// 터치 이벤트일 경우
		if (e.nativeEvent instanceof globalThis.TouchEvent)
		{
			pageX = e.nativeEvent.touches[0].pageX;
		}

		// 마우스 이벤트일 경우
		else if (e.nativeEvent instanceof globalThis.MouseEvent)
		{
			pageX = e.nativeEvent.pageX;
		}

		setDragState((state) => ({
			...state,
			start: pageX
		}));
	}, [ disabledDrag ]);

	const handleInteractionMove = useCallback<CarouselInteractionHandler>((e) =>
	{
		if (disabledDrag)
		{
			return;
		}

		let clientX = 0;

		// 터치 이벤트일 경우
		if (e.nativeEvent instanceof globalThis.TouchEvent)
		{
			clientX = e.nativeEvent.touches[0].clientX;
		}

		// 마우스 이벤트일 경우
		else if (e.nativeEvent instanceof globalThis.MouseEvent)
		{
			clientX = e.nativeEvent.clientX;
		}

		setAnimateState(false);
		setDragState((state) => ({
			...state,
			end: clientX
		}));
	}, [ disabledDrag ]);

	const handleInteractionEnd = useCallback<CarouselInteractionHandler>(() =>
	{
		if (disabledDrag)
		{
			return;
		}

		setAnimateState(true);

		const delta = dragState.end - dragState.start;

		if (delta > dragDelta)
		{
			move('left');
		}

		else if (delta < -dragDelta)
		{
			move('right');
		}

		setDragState({ end: 0, start: 0 });

		console.log(dragState);
	}, [ disabledDrag, move, dragState, dragDelta ]);

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
			<Stack
				component='div'
				direction='row'
				draggable={false}
				gap={`${gap}px`}
				height='100%'
				width='100%'
				sx={{
					transform: `translateX(calc(${(indexState + 2) * -100}% + ${x}px))`,
					transition: isAnimateState ? `${transition}ms` : undefined
				}}
				onMouseDown={handleInteractionStart}
				onMouseMove={handleInteractionMove}
				onMouseUp={handleInteractionEnd}
				onTouchCancel={handleInteractionEnd}
				onTouchEnd={handleInteractionEnd}
				onTouchMove={handleInteractionMove}
				onTouchStart={handleInteractionStart}
			>
				{list.map((i) => (
					<Stack
						bgcolor='white'
						draggable={false}
						flexShrink={0}
						height='100%'
						key={i}
						width={`calc(100% - ${(gap + sideGap) * 2}px)`}
					>
						{handleRender(i)}
					</Stack>
				))}
			</Stack>
		</Box>
	);
}