/**
 * 훅 모듈
 *
 * @author RWB
 * @since 2024.04.01 Mon 09:46:48
 */

'use client';

import { useEffect } from 'react';

export type UseIntersectionObserverCallback = (isShow: boolean) => void;

/**
 * IntersectionObserver 적용 훅 메서드
 *
 * @param {Element | null} ref: Element
 * @param {UseIntersectionObserverCallback} callback: 콜백 메서드
 * @param {IntersectionObserverInit} options: 옵션
 */
export function useIntersectionObserver(ref: Element | null, callback: UseIntersectionObserverCallback, options?: IntersectionObserverInit): void
{
	useEffect(() =>
	{
		const io = new IntersectionObserver((entries) =>
		{
			entries.forEach((entry) =>
			{
				callback?.(entry.isIntersecting);
			});
		}, options);

		// DOM이 유효할 경우
		if (ref)
		{
			io.observe(ref);
		}

		return () =>
		{
			io.disconnect();
		};
	}, [ ref, callback, options ]);
}