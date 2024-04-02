/**
 * 네비게이션 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.01 Mon 01:28:39
 */

'use client';

import { useIntersectionObserver } from '@kapoo/common';
import { themeStore } from '@kapoo/state';
import Box from '@mui/material/Box';
import { ReactNode, useCallback, useState } from 'react';

import Header, { HeaderProps } from '../../molecule/Header';
import Sidebar, { SidebarProps } from '../../molecule/Sidebar';

export interface NavigationProps
{
	/**
	 * 로고 URL
	 */
	logo?: HeaderProps['logo'];

	/**
	 * 타이틀
	 */
	title?: HeaderProps['title'];

	/**
	 * 사이드바 아이템
	 */
	items?: SidebarProps['items'];
}

/**
 * 네비게이션 organism 컴포넌트 반환 메서드
 *
 * @param {NavigationProps} param0: NavigationProps
 *
 * @returns {ReactNode} ReactNode
 */
export default function Navigation({ logo, title, items }: NavigationProps): ReactNode
{
	const [ isTopState, setTopState ] = useState(true);
	const [ isOpenState, setOpenState ] = useState(false);
	const [ domState, setDomState ] = useState<HTMLDivElement | null>(null);

	const { theme } = themeStore();

	useIntersectionObserver(domState, setTopState);

	const handleMenuClick = useCallback<Func<HeaderProps['onMenuClick']>>(() =>
	{
		setOpenState(true);
	}, []);

	const handleClose = useCallback<Func<SidebarProps['onClose']>>(() =>
	{
		setOpenState(false);
	}, []);

	return (
		<Box data-component='Navigation' ref={setDomState}>
			<Header isTransparent={isTopState} logo={logo} theme={theme} title={title} onMenuClick={handleMenuClick} />
			<Sidebar items={items} open={isOpenState} onClose={handleClose} />
		</Box>
	);
}