/**
 * 기초 레이아웃 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 13:28:18
 */

// 라이브러리 모듈
import { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import { Box, createTheme, CssBaseline, MuiThemeProvider, Theme } from '@material-ui/core';
import { indigo, orange } from '@material-ui/core/colors';
import { useRecoilValue } from 'recoil';

// 사용자 모듈
import ThemeSwitch from './ThemeSwitch';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import { darkAtom } from '@commons/state';

// 스타일
import styles from '@styles/components/global/base-layout.module.scss';
import MobileMenu from '@components/header/MobileMenu';

interface Props {
	children: ReactElement
}

/**
 * 기초 레이아웃 ReactNode 반환 함수
 *
 * @param {Props} annoyparam0: 프로퍼티
 *
 * @returns {ReactNode} ReactNode
 */
export default function BaseLayout({ children }: Props): ReactElement | null
{
	const darkState = useRecoilValue(darkAtom);
	const theme = getTheme(darkState);

	useEffect(() =>
	{
		document.addEventListener('contextmenu', (e) => e.preventDefault());
	});

	return (
		<MuiThemeProvider theme={theme}>
			<Head>
				<script async src="https://www.googletagmanager.com/gtag/js?id=G-X2THE3XLX1"></script>

				<script dangerouslySetInnerHTML={{ __html: `
					window.dataLayer = window.dataLayer || [];

					function gtag()
					{
						dataLayer.push(arguments);
					}

					gtag('js', new Date());

					gtag('config', 'G-X2THE3XLX1');
				` }}></script>
			</Head>

			<Box className={styles.root}>
				<CssBaseline />

				<Header />

				<Box className={styles.main}>
					{children}

					<MobileMenu />

					<ThemeSwitch />

					<Footer />
				</Box>
			</Box>
		</MuiThemeProvider>
	);
}

/**
 * 테마 반환 함수
 *
 * @param {boolean} isDark: 다크모드 사용 여부
 *
 * @returns {Theme} Theme
 */
function getTheme(isDark: boolean): Theme
{
	return createTheme({
		palette: {
			type: isDark ? 'dark' : 'light',
			background: {
				default: isDark ? '#020D1D' : '#FFFFFF'
			},
			primary: orange,
			secondary: indigo
		},
		typography: {
			fontFamily: 'AppleSDGothicNeo, sans-serif'
		},
		overrides: {
			MuiCssBaseline: {
				'@global': {
					'*::-webkit-scrollbar, *::-webkit-scrollbar-thumb': {
						width: 6,
						height: 6,
						borderRadius: 6,
						backgroundClip: 'padding-box',
						border: '1px solid transparent',
						'@media (max-width: 960px)': {
							width: 0
						}
					},
					'*::-webkit-scrollbar-thumb': {
						boxShadow: 'inset 0 0 0 10px',
						color: isDark ? '#404040' : '#C0C0C0'
					}
				}
			}
		}
	});
}