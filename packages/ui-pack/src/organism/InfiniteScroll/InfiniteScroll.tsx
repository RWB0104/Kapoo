/**
 * 인피니트 스크롤 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.01 Mon 11:40:53
 */

'use client';

import { useIntersectionObserver } from '@kapoo/common';
import Box, { BoxProps } from '@mui/material/Box';
import { useRef } from 'react';

export interface InfiniteScrollProps extends BoxProps
{
	/**
	 * 스크롤 마지막 이벤트 메서드
	 */
	onEnd?: FunctionConstructor;
}

/**
 * 인피니트 스크롤 organism 컴포넌트 반환 메서드
 *
 * @param {InfiniteScrollProps} param0: InfiniteScrollProps
 *
 * @returns {JSX.Element} JSX
 */
export default function InfiniteScroll({ children, onEnd, ...props }: InfiniteScrollProps): JSX.Element
{
	const ref = useRef<HTMLDivElement>(null);

	useIntersectionObserver(ref.current, (isShow) =>
	{
		// DOM이 보일 경우
		if (isShow)
		{
			onEnd?.();
		}
	}, { rootMargin: '0px 0px 16px 0px' });

	return (
		<Box data-component='InfiniteScroll' ref={ref} {...props}>
			{children}

			{children ? <Box width='100%' /> : null}
		</Box>
	);
}