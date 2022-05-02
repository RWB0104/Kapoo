/**
 * 훅 컴포넌트
 *
 * @author RWB
 * @since 2022.05.02 Mon 22:53:48
 */

import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export enum Theme { LIGHT = 'light', DARK = 'dark' }

export function useThemeHook()
{
	const [ themeState, setThemeState ] = useState(Theme.DARK);
	const [ cookie, setCookie ] = useCookies(['theme']);

	useEffect(() =>
	{
		const handle = () =>
		{
			// setThemeState(Theme.DARK);
		};

		handle();
	}, []);

	return [ themeState, setThemeState ];
}

/**
 * 반응형 훅 메서드
 *
 * @returns {number} 반응형 여부
 */
export function useSemanticHook(): boolean
{
	const [ semanticState, setSemanticState ] = useState(true);

	useEffect(() =>
	{
		const handle = () => setSemanticState(window.innerWidth >= 960);

		window.addEventListener('resize', handle);

		handle();

		return () => window.removeEventListener('resize', handle);
	}, []);

	return semanticState;
}

/**
 * 스크롤 상단 훅 메서드
 *
 * @returns {boolean} 스크롤 상단 위치 여부
 */
export function useScrollTopHook()
{
	const [ scrollState, setScrollState ] = useState(true);

	useEffect(() =>
	{
		const handle = () => setScrollState(window.scrollY === 0);

		window.addEventListener('scroll', handle);

		handle();

		return () => window.removeEventListener('scroll', handle);
	}, []);

	return [ scrollState, setScrollState ];
}