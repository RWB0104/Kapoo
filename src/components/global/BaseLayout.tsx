/**
 * 기초 레이아웃 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 13:28:18
 */

import { Theme } from '@kapoo/commons/common';
import { loadingAtom, menuAtom, themeAtom } from '@kapoo/commons/state';
import Footer from '@kapoo/components/footer/Footer';
import Header from '@kapoo/components/header/Header';
import MobileMenu from '@kapoo/components/header/MobileMenu';
import styles from '@kapoo/styles/components/global/BaseLayout.module.scss';
import classNames from 'classnames/bind';
import { Router } from 'next/router';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRecoilState, useSetRecoilState } from 'recoil';

import FabPannel from './FabPannel';
import Loading from './Loding';
import ThemeFab from './ThemeFab';
import TopFab from './TopFab';

interface Props
{
	children: JSX.Element
}

/**
 * 기초 레이아웃 JSX 반환 함수
 *
 * @param {Props} annoyparam0: 프로퍼티
 *
 * @returns {JSX.Element} JSX
 */
export default function BaseLayout({ children }: Props): JSX.Element
{
	const setLoadingState = useSetRecoilState(loadingAtom);

	const [ themeState, setThemeState ] = useRecoilState(themeAtom);
	const [ menuState, setMenuState ] = useRecoilState(menuAtom);

	const cn = classNames.bind(styles);

	const cookie = useCookies([ 'theme' ])[0];

	Router.events.on('routeChangeStart', () => setLoadingState(true));
	Router.events.on('routeChangeComplete', () =>
	{
		window.scrollTo(0, 0);

		setLoadingState(false);

		// 메뉴가 열려있을 경우
		if (menuState)
		{
			setMenuState(false);
		}
	});

	useEffect(() =>
	{
		const handleContextMenu = (e: MouseEvent) => e.preventDefault();

		const handleScroll = () =>
		{
			setMenuState(false);
		};

		document.addEventListener('contextmenu', handleContextMenu);
		document.addEventListener('scroll', handleScroll);

		setLoadingState(false);

		// 쿠키값이 dark 혹은 light 둘 중 하나일 경우
		if (cookie.theme === Theme.DARK || cookie.theme === Theme.LIGHT)
		{
			setThemeState(cookie.theme === Theme.DARK ? Theme.DARK : Theme.LIGHT);
		}

		return () =>
		{
			document.removeEventListener('contextmenu', handleContextMenu);
			document.removeEventListener('scroll', handleScroll);
		};
	});

	useEffect(() =>
	{
		document.body.style.backgroundColor = themeState === Theme.DARK ? '#010409' : 'white';
	}, [ themeState ]);

	return (
		<main className={cn('root', themeState)}>
			<Header />
			<MobileMenu />

			{children}

			<Loading />

			<FabPannel>
				<ThemeFab />
				<TopFab />
			</FabPannel>

			<Footer />
		</main>
	);
}