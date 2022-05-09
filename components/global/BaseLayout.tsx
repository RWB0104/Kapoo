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
import FabPannel from './FabPannel';
import ThemeFab from './ThemeFab';
import TopFab from './TopFab';
import Loading from './Loding';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import MobileMenu from '@components/header/MobileMenu';
import { Theme } from '@commons/common';
import { loadingAtom, menuAtom, themeAtom } from '@commons/state';

// 스타일
import styles from '@styles/components/global/BaseLayout.module.scss';

interface Props
{
	children: JSX.Element
}

/**
 * 기초 레이아웃 JSX 반환 함수
 *
 * @param {Props} annoyparam0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function BaseLayout({ children }: Props): JSX.Element | null
{
	const setLoadingState = useSetRecoilState(loadingAtom);

	const [ themeState, setThemeState ] = useRecoilState(themeAtom);
	const [ menuState, setMenuState ] = useRecoilState(menuAtom);

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
		<main className={styles[`root-${themeState}`]}>
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