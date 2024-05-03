/**
 * 플롯 버튼 모둠 박스 organism 컴포넌트 인덱스 모듈
 *
 * @author RWB
 * @since 2024.05.03 Fri 09:35:50
 */

'use client';

import { themeStore } from '@kapoo/state';
import FloatButtons from '@kapoo/ui-pack/organism/FloatButtons';
import { useCallback } from 'react';

/**
 * 플롯 버튼 모둠 박스 organism 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function FloatButtonsBox(): JSX.Element
{
	const { themeState, toggleThemeState } = themeStore();

	const handleClick = useCallback(() =>
	{
		toggleThemeState();
	}, [ toggleThemeState ]);

	return (
		<FloatButtons theme={themeState} onThemeClick={handleClick} />
	);
}