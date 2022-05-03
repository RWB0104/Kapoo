/**
 * 기초 레이아웃 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 13:28:18
 */

// 라이브러리 모듈
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Router } from 'next/router';
import { useCookies } from 'react-cookie';

// 사용자 모듈
import ThemeSwitch from './ThemeSwitch';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import { loadingAtom, menuAtom, themeAtom } from '@commons/state';
import MobileMenu from '@components/header/MobileMenu';
import Loading from './Loding';
import { Theme } from '@commons/common';

// 스타일
import styles from '@styles/components/global/BaseLayout.module.scss';

interface Props
{
	children: JSX.Element,
	hash: string
}

/**
 * 기초 레이아웃 JSX 반환 함수
 *
 * @param {Props} annoyparam0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function BaseLayout({ children, hash }: Props): JSX.Element | null
{
	const setLoadingState = useSetRecoilState(loadingAtom);

	const [ themeState, setThemeState ] = useRecoilState(themeAtom);
	const [ menuState, setMenuState ] = useRecoilState(menuAtom);

	const cookie = useCookies([ 'theme' ])[0];

	Router.events.on('routeChangeStart', () => setLoadingState(true));
	Router.events.on('routeChangeComplete', () =>
	{
		setLoadingState(false);

		if (menuState)
		{
			setMenuState(false);
		}
	});

	useEffect(() =>
	{
		const handleContextMenu = (e) => e.preventDefault();

		const handleScroll = () =>
		{
			setMenuState(false);
		};

		document.addEventListener('contextmenu', handleContextMenu);
		document.addEventListener('scroll', handleScroll);

		setLoadingState(false);

		// 쿠키값이 dark 혹은 light 둘 중 하나일 경우
		if (cookie === Theme.DARK || cookie === Theme.LIGHT)
		{
			setThemeState(cookie);
		}

		return () =>
		{
			document.removeEventListener('contextmenu', handleContextMenu);
			document.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<main className={styles[`root-${themeState}`]}>
			<Header />
			<MobileMenu />

			{children}

			<Loading />

			<ThemeSwitch />

			<Footer hash={hash} />
		</main>
	);
}