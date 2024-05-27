/**
 * 인피니트 스크롤 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.01 Mon 11:40:53
 */

'use client';

import { useIntersectionObserver } from '@kapoo/common';
import Box, { BoxProps } from '@mui/material/Box';
import { useState } from 'react';

export type InfiniteScrollEndHandler = () => void;

export interface InfiniteScrollProps extends BoxProps
{
	/**
	 * 비활성화 여부
	 */
	disabled?: boolean;

	/**
	 * 스크롤 마지막 이벤트 메서드
	 */
	onEnd?: InfiniteScrollEndHandler;
}

/**
 * 인피니트 스크롤 organism 컴포넌트 반환 메서드
 *
 * @param {InfiniteScrollProps} param0: InfiniteScrollProps
 *
 * @returns {JSX.Element} JSX
 */
export default function InfiniteScroll({ disabled = false, onEnd, children, ...props }: InfiniteScrollProps): JSX.Element
{
	const [ domState, setDomState ] = useState<HTMLDivElement | null>(null);

	useIntersectionObserver(domState, (entry) =>
	{
		// DOM이 보일 경우
		if (entry.isIntersecting)
		{
			onEnd?.();
		}
	}, { rootMargin: '0px 0px 20px 0px' });

	return (
		<Box data-component='InfiniteScroll' {...props}>
			{children}

			{children && !disabled ? <Box ref={setDomState} width='100%' /> : null}
		</Box>
	);
}