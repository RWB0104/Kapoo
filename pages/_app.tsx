/**
 * 웹 애플리케이션 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 13:21:27
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Router } from 'next/router';
import { CookiesProvider } from 'react-cookie';

// 사용자 모듈
import BaseLayout from '@components/global/BaseLayout';


import '@styles/index.scss';

/**
 * 웹 애플리케이션 ReactNode 반환 함수
 *
 * @param {AppProps} param0: 애플리케이션 프로퍼티
 *
 * @returns {ReactElement | null} ReactNode
 */
export default function MyApp({ Component, pageProps }: AppProps): ReactElement | null
{
	Router.events.on('routeChangeComplete', () =>
	{
		document.getElementsByTagName('section')[0].scrollIntoView();
	});

	return (
		<RecoilRoot>
			<CookiesProvider>
				<BaseLayout hash={pageProps.hash}>
					<Component {...pageProps} />
				</BaseLayout>
			</CookiesProvider>
		</RecoilRoot>
	);
}