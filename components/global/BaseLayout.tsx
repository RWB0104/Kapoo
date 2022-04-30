/**
 * 기초 레이아웃 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 13:28:18
 */

// 라이브러리 모듈
import { ReactElement, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { Router } from 'next/router';
import { useCookies } from 'react-cookie';

// 사용자 모듈
import ThemeSwitch from './ThemeSwitch';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import { darkAtom, loadingAtom } from '@commons/state';
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
	const cookies = useCookies(['theme'])[0];

	Router.events.on('routeChangeStart', () => setLoadingState(true));

	useEffect(() =>
	{
		document.addEventListener('contextmenu', (e) => e.preventDefault());
		document.addEventListener('scroll', () =>
		{
			const header = document.getElementsByTagName('header')[0];

			// 헤더 태그가 유효할 경우
			if (header)
			{
				const isTop = header.getAttribute('data-top') === 'true';

				// 스크롤이 맨 위고, isTop이 false일 경우
				if (window.scrollY === 0 && !isTop)
				{
					header.setAttribute('data-top', 'true');
				}

				// 스크롤이 맨 위고, isTop이 true일 경우
				else if (window.scrollY !== 0 && isTop)
				{
					header.setAttribute('data-top', 'false');
				}
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