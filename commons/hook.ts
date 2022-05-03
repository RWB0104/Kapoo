/**
 * 훅 컴포넌트
 *
 * @author RWB
 * @since 2022.05.02 Mon 22:53:48
 */

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

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
export function useScrollTopHook(): [ boolean, Dispatch<SetStateAction<boolean>> ]
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