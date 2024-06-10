/**
 * 훅 모듈
 *
 * @author RWB
 * @since 2024.04.01 Mon 09:46:48
 */

'use client';

import { useEffect } from 'react';

export type UseMutationObserverCallback = (entry: MutationRecord) => void;
export type UseResizeObserverCallback = (entry: ResizeObserverEntry) => void;
export type UseIntersectionObserverCallback = (entry: IntersectionObserverEntry) => void;

/**
 * MutationObserver 적용 훅 메서드
 *
 * @param {Element | string | null} ref: Element
 * @param {UseMutationObserverCallback} callback: 콜백 메서드
 * @param {MutationObserverInit} options: 옵션
 */
export function useMutationObserver(ref: Element | string | null, callback: UseMutationObserverCallback, options: MutationObserverInit): void
{
	useEffect(() =>
	{
		const mo = new MutationObserver((entries) =>
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
					mo.observe(tag, options);
				}
			}

			// DOM일 경우
			else
			{
				mo.observe(ref, options);
			}
		}

		return () =>
		{
			mo.disconnect();
		};
	}, [ ref, callback, options ]);
}

/**
 * ResizeObserver 적용 훅 메서드
 *
 * @param {Element | string | null} ref: Element
 * @param {UseResizeObserverCallback} callback: 콜백 메서드
 * @param {ResizeObserverOptions} options: 옵션
 */
export function useResizeObserver(ref: Element | string | null, callback: UseResizeObserverCallback, options?: ResizeObserverOptions): void
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
					ro.observe(tag, options);
				}
			}

			// DOM일 경우
			else
			{
				ro.observe(ref, options);
			}
		}

		return () =>
		{
			ro.disconnect();
		};
	}, [ ref, callback, options ]);
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