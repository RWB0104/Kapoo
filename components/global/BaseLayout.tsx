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
import { useCookies } from 'react-cookie';

// 사용자 모듈
import ThemeSwitch from './ThemeSwitch';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import { darkAtom, loadingAtom, menuAtom, semanticAtom, topAtom } from '@commons/state';
import MobileMenu from '@components/header/MobileMenu';
import Loading from './Loding';

// 스타일
import styles from '@styles/components/global/BaseLayout.module.scss';

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
	const setDarkState = useSetRecoilState(darkAtom);
	const setLoadingState = useSetRecoilState(loadingAtom);

	const [ semanticState, setSemanticState ] = useRecoilState(semanticAtom);
	const [ topState, setTopState ] = useRecoilState(topAtom);
	const [ menuState, setMenuState ] = useRecoilState(menuAtom);

	const cookies = useCookies(['theme'])[0];

	Router.events.on('routeChangeStart', () => setLoadingState(true));

	useEffect(() =>
	{
		window.addEventListener('resize', () =>
		{
			if (window.innerWidth >= 960 && !semanticState)
			{
				setSemanticState(true);
			}

			else if (window.innerWidth < 960 && semanticState)
			{
				setSemanticState(false);
			}
		});
		document.addEventListener('contextmenu', (e) => e.preventDefault());
		document.addEventListener('scroll', () =>
		{
			// 메뉴가 켜져있을 경우
			if (menuState)
			{
				setMenuState(false);
			}

			// 스크롤이 맨 위고, topState가 false일 경우
			if (window.scrollY === 0 && !topState)
			{
				setTopState(true);
				console.dir(topState);
			}

			// 스크롤이 맨 위, topState가 true일 경우
			else if (window.scrollY !== 0 && topState)
			{
				setTopState(false);
				console.dir(topState);
			}
		});

		// 이전에 다크 모드를 해제했었을 경우
		if (cookies.theme === 'false')
		{
			setDarkState(false);
		}

		setLoadingState(false);
	});

	return (
		<main className={styles.root}>
			<Header />

			{children}

			<MobileMenu />

			<Loading />

			<ThemeSwitch />

			<Footer hash={hash} />
		</main>
	);
}