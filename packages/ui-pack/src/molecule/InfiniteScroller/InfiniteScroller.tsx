/**
 * 무한 스크롤러 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.08.21 Mon 18:55:37
 */

import Box, { BoxProps } from '@mui/material/Box';
import { ReactNode, useEffect, useRef } from 'react';

export type InfiniteScrollerFetchHandler = () => void;

export interface InfiniteScrollerProps extends BoxProps
{
	/**
	 * 스크롤 감지 margin
	 */
	fetchMargin?: string;

	/**
	 * 마지막 여부
	 */
	isLast?: boolean;

	/**
	 * fetch 메서드
	 */
	onFetch?: InfiniteScrollerFetchHandler;
}

/**
 * 무한 스크롤러 molecule 컴포넌트 JSX 반환 메서드
 *
 * @param {InfiniteScrollerProps} param0: InfiniteScrollerProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function InfiniteScroller({ fetchMargin, isLast, onFetch, children, ...props }: InfiniteScrollerProps): ReactNode
{
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() =>
	{
		const handle: IntersectionObserverCallback = (entries) =>
		{
			entries.some((entry) =>
			{
				// 마지막 스크롤에 도달했을 경우
				if (entry.isIntersecting)
				{
					// onFetch 메서드가 유효하고, 마지막이 아닐 경우
					if (onFetch && !isLast)
					{
						onFetch();
					}
				}

				return entry.isIntersecting;
			});
		};

		const io = new IntersectionObserver(handle, { rootMargin: fetchMargin, threshold: 0 });

		// DOM이 유효할 경우
		if (ref.current)
		{
			io.observe(ref.current);
		}

		return () =>
		{
			io.disconnect();
		};
	}, [ ref.current, fetchMargin, isLast, onFetch ]);

	return (
		<Box data-component='InfiniteScroller' {...props}>
			{children}

			<Box ref={ref} width='100%' />
		</Box>
	);
}