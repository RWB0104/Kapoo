/**
 * 웹 애플리케이션 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 13:21:27
 */

import BaseLayout from '@components/global/BaseLayout';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import { RecoilRoot } from 'recoil';

import '@styles/index.scss';

/**
 * 웹 애플리케이션 JSX 반환 함수
 *
 * @param {AppProps} param0: 애플리케이션 프로퍼티
 *
 * @returns {JSX.Element} JSX
 */
export default function MyApp({ Component, pageProps }: AppProps): JSX.Element
{
	useEffect(() =>
	{
		if ('serviceWorker' in navigator)
		{
			navigator.serviceWorker
				.register('/service-worker.js')
				.then(() =>
				{
					console.log('service worker registration successful');

				})
				.catch(err =>
				{
					console.warn('service worker registration failed', err.message);
				});
		}
	});

	return (
		<RecoilRoot>
			<CookiesProvider>
				<BaseLayout>
					<Component {...pageProps} />
				</BaseLayout>
			</CookiesProvider>
		</RecoilRoot>
	);
}