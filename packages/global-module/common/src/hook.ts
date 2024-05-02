/**
 * 훅 모듈
 *
 * @author RWB
 * @since 2024.04.01 Mon 09:46:48
 */

'use client';

import { useEffect } from 'react';

export type UseResizeObserverCallback = (entry: ResizeObserverEntry) => void;
export type UseIntersectionObserverCallback = (entry: IntersectionObserverEntry) => void;

/**
 * ResizeObserver 적용 훅 메서드
 *
 * @param {Element | string | null} ref: Element
 * @param {UseResizeObserverCallback} callback: 콜백 메서드
 */
export function useResizeObserver(ref: Element | string | null, callback: UseResizeObserverCallback): void
{
	useEffect(() =>
	{
		const ro = new ResizeObserver((entries) =>
		{
			entries.forEach(callback);
		});

		// DOM이 유효할 경우
		if (ref)
		{
			// ref가 문자열일 경우
			if (typeof ref === 'string')
			{
				const tag = document.querySelector(ref);

				// 태그가 유효할 경우
				if (tag)
				{
					ro.observe(tag);
				}
			}

			// DOM일 경우
			else
			{
				ro.observe(ref);
			}
		}

		return () =>
		{
			ro.disconnect();
		};
	}, [ ref, callback ]);
}

/**
 * IntersectionObserver 적용 훅 메서드
 *
 * @param {Element | string | null} ref: Element
 * @param {UseIntersectionObserverCallback} callback: 콜백 메서드
 * @param {IntersectionObserverInit} options: 옵션
 */
export function useIntersectionObserver(ref: Element | string | null, callback: UseIntersectionObserverCallback, options?: IntersectionObserverInit): void
{
	useEffect(() =>
	{
		const io = new IntersectionObserver((entries) =>
		{
			entries.forEach(callback);
		}, options);

		// DOM이 유효할 경우
		if (ref)
		{
			// ref가 문자열일 경우
			if (typeof ref === 'string')
			{
				const tag = document.querySelector(ref);

				// 태그가 유효할 경우
				if (tag)
				{
					io.observe(tag);
				}
			}

			// DOM일 경우
			else
			{
				io.observe(ref);
			}
		}

		return () =>
		{
			io.disconnect();
		};
	}, [ ref, callback, options ]);
}