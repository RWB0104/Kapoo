/**
 * 앱 네비게이션 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.08.29 Thu 09:47:27
 */

'use client';

import { themeStore } from '@kapoo/state';
import Navigation, { NavigationProps } from '@kapoo/ui-pack/organism/Navigation';

/**
 * 앱 네비게이션 organism 컴포넌트 반환 메서드
 *
 * @param {NavigationProps} param0: NavigationProps
 *
 * @returns {JSX.Element} JSX
 */
export default function AppNavigation({ ...props }: NavigationProps): JSX.Element
{
	const { themeState } = themeStore();

	return (
		<Navigation
			logo='/logo.png'
			position='relative'
			theme={themeState}
			{...props}
		/>
	);
}