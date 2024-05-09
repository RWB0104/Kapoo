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
import { useEffect, useState } from 'react';

import CarouselItem from './sub/CarouselItem';

export type CarouselRenderHandler = (index: number) => JSX.Element;

export interface CarouselProps
{
	/**
	 * 기본 인덱스
	 */
	defaultIndex?: number;

	/**
	 * 인덱스
	 */
	index?: number;

	/**
	 * 전체 갯수
	 */
	total: number;

	/**
	 * 렌더링 핸들러
	 */
	children: CarouselRenderHandler;
}

export default function Carousel({ defaultIndex = 0, index, total, children }: CarouselProps): JSX.Element
{
	const [ trackRefState, setTrackRefState ] = useState<HTMLDivElement | null>(null);
	const [ indexState, setIndexState ] = useState(defaultIndex);

	useEffect(() =>
	{
		const tag = document.querySelector<HTMLDivElement>('[data-component="test"]');

		if (trackRefState && tag)
		{
			trackRefState.style.transform = `translateX(${-tag.scrollWidth}px)`;
		}
	}, [ trackRefState ]);

	useEffect(() =>
	{
		if (index)
		{
			setIndexState(index);
		}
	}, [ index ]);

	return (
		<Box data-component='Carousel' height={500} overflow='hidden' width='100%'>
			<Stack
				direction='row'
				flexWrap='nowrap'
				height='100%'
				ref={setTrackRefState}
				width='100%'
			>
				<CarouselItem>
					{children(modulo(indexState - 1, total))}
				</CarouselItem>

				<CarouselItem data-component='test'>
					{children(indexState)}
				</CarouselItem>

				<CarouselItem>
					{children(modulo(indexState + 1, total))}
				</CarouselItem>
			</Stack>
		</Box>
	);
}