/**
 * 네비게이션 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.01 Mon 01:28:39
 */

'use client';

import Box from '@mui/material/Box';
import { ReactNode, useEffect, useRef, useState } from 'react';

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

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() =>
	{
		const io = new IntersectionObserver((entries) =>
		{
			entries.forEach((entry) =>
			{
				setTopState(entry.isIntersecting);
			});
		});

		// DOM이 유효할 경우
		if (ref.current)
		{
			io.observe(ref.current);
		}

		return () =>
		{
			io.disconnect();
		};
	}, [ ref.current ]);

	return (
		<Box data-component='Navigation' ref={ref}>
			<Header isTransparent={isTopState} logo={logo} title={title} />
			<Sidebar items={items} />
		</Box>
	);
}