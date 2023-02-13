/**
 * 웹 애플리케이션 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 13:21:27
 */

import BaseLayout from '@kapoo/components/global/BaseLayout';
import QueryLayout from '@kapoo/components/global/QueryLayout';
import type { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import { RecoilRoot } from 'recoil';

import '@kapoo/styles/index.scss';

declare global {
	interface Window {
		adsbygoogle: { [key: string] : unknown}[]
	}
}

/**
 * 웹 애플리케이션 JSX 반환 함수
 *
 * @param {AppProps} param0: 애플리케이션 프로퍼티
 *
 * @returns {JSX.Element} JSX
 */
export default function App({ Component, pageProps }: AppProps): JSX.Element
{
	return (
		<RecoilRoot>
			<CookiesProvider>
				<QueryLayout>
					<BaseLayout>
						<Component {...pageProps} />
					</BaseLayout>
				</QueryLayout>
			</CookiesProvider>
		</RecoilRoot>
	);
}