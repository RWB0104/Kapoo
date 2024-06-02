/**
 * 캐러셀 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.05.09 Thu 14:25:11
 */

'use client';

import { modulo } from '@kapoo/common';
import Box from '@mui/material/Box';
import { CSSProperties, useState } from 'react';

export type CarouselRenderHandler = (index: number) => JSX.Element;
export type CarouselMoveHandler = (flag: 'left' | 'right') => void;

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
	 * 렌더링 핸들러
	 */
	children: CarouselRenderHandler;
}

export default function Carousel({ defaultIndex = 0, total, width = '100%', height = '100%', children }: CarouselProps): JSX.Element
{
	const [ currCarousel, setCurrCarousel ] = useState(defaultIndex);
	const [ carouselTransition, setCarouselTransition ] = useState('500ms ease-in-out');
	const [ delayState, setDelayState ] = useState(false);

	const slideNextSoulsCarousel = (): void =>
	{
		if (!delayState)
		{
			setDelayState(true);

			const soulSliderLength = total;

			const newCurr = currCarousel + 1;
			setCurrCarousel(newCurr);

			if (newCurr === soulSliderLength)
			{
				moveToNthSlide(0);
			}

			setCarouselTransition('500ms ease-in-out');
		}
	};

	const slidePrevSoulsCarousel = (): void =>
	{
		if (!delayState)
		{
			setDelayState(true);

			const soulSliderLength = total;
			const newCurr = currCarousel - 1;
			setCurrCarousel(newCurr);

			if (newCurr === 0)
			{
				moveToNthSlide(soulSliderLength);
			}

			setCarouselTransition('500ms ease-in-out');
		}
	};

	const moveToNthSlide = (n: number): void =>
	{
		setTimeout(() =>
		{
			setCarouselTransition('');
			setCurrCarousel(n);
			setDelayState(false);
		}, 500);
	};

	return (
		<>
			<Box
				data-component='Carousel'
				height={height}
				overflow='hidden'
				width={width}
			>
				<Box
					component='div'
					height='100%'
					position='relative'
					width='100%'
					sx={{
						marginLeft: `${currCarousel * -100}%`,
						transition: carouselTransition
					}}
					onTransitionEnd={() => setDelayState(false)}
				>
					<Box height='100%' id='prev' left='-100%' position='absolute' top={0} width='100%'>
						{children(modulo(-1, total))}
					</Box>

					{Array.from({ length: total }).map((i, j) => (
						<Box height='100%' key={j} left={`${j * 100}%`} position='absolute' top={0} width='100%'>
							{children(j)}
						</Box>
					))}

					<Box height='100%' id='next' left={`${total * 100}%`} position='absolute' top={0} width='100%'>
						{children(modulo(0, total))}
					</Box>
				</Box>
			</Box>

			<button onClick={slidePrevSoulsCarousel}>left</button>
			<button onClick={slideNextSoulsCarousel}>right</button>
			{currCarousel}
		</>
	);
}