/**
 * 기초 레이아웃 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 13:28:18
 */

// 라이브러리 모듈
import { ReactElement, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Router } from 'next/router';

// 사용자 모듈
import ThemeSwitch from './ThemeSwitch';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import { loadingAtom, menuAtom } from '@commons/state';
import MobileMenu from '@components/header/MobileMenu';
import Loading from './Loding';

// 스타일
import styles from '@styles/components/global/BaseLayout.module.scss';
import { useThemeHook } from '@commons/hook';

interface Props {
	children: ReactElement,
	hash: string
}

/**
 * 기초 레이아웃 ReactNode 반환 함수
 *
 * @param {Props} annoyparam0: 프로퍼티
 *
 * @returns {ReactNode} ReactNode
 */
export default function BaseLayout({ children, hash }: Props): ReactElement | null
{
	const setLoadingState = useSetRecoilState(loadingAtom);
	const themeState = useThemeHook()[0];

	const [ menuState, setMenuState ] = useRecoilState(menuAtom);

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