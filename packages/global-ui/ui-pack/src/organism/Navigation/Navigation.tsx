/**
 * 네비게이션 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.01 Mon 01:28:39
 */

'use client';

import { useIntersectionObserver, useResizeObserver } from '@kapoo/common';
import Box from '@mui/material/Box';
import { usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';

import Header, { HeaderProps } from '../../molecule/Header';
import Sidebar, { SidebarProps } from '../../molecule/Sidebar';

export interface NavigationProps
{
	/**
	 * 테마
	 */
	theme?: HeaderProps['theme'];

	/**
	 * 로고 URL
	 */
	logo?: HeaderProps['logo'];

	/**
	 * 타이틀
	 */
	title?: HeaderProps['title'];

	/**
	 * 포지션
	 */
	position?: HeaderProps['position'];

	/**
	 * 버전
	 */
	version?: SidebarProps['version'];

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
 * @returns {JSX.Element} JSX
 */
export default function Navigation({ theme, logo, title, position, version, items }: NavigationProps): JSX.Element
{
	const pathname = usePathname();

	const [ isTopState, setTopState ] = useState(true);
	const [ isOpenState, setOpenState ] = useState(false);
	const [ domState, setDomState ] = useState<HTMLDivElement | null>(null);
	const [ heightState, setHeightState ] = useState<number>();

	const handleMenuClick = useCallback<Func<HeaderProps['onMenuClick']>>(() =>
	{
		setOpenState((state) => !state);
	}, []);

	const handleClose = useCallback<Func<SidebarProps['onClose']>>(() =>
	{
		setOpenState(false);
	}, []);

	useResizeObserver('#header', (entry) => setHeightState(entry.borderBoxSize[0].blockSize));
	useIntersectionObserver(domState, (entry) => setTopState(entry.isIntersecting));

	return (
		<Box data-component='Navigation' ref={setDomState}>
			<Header
				id='header'
				isTransparent={isTopState && !isOpenState}
				logo={logo}
				position={position}
				theme={theme}
				title={title}
				onMenuClick={items ? handleMenuClick : undefined}
			/>

			{items ? (
				<Sidebar
					currentUrl={pathname}
					items={items}
					logo={logo}
					open={isOpenState}
					paddingTop={`${heightState}px`}
					title={title}
					version={version}
					onClose={handleClose}
				/>
			) : null}
		</Box>
	);
}