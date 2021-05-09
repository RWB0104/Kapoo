/**
 * Application 공통 레이이웃 JavaScript
 *
 * @author RWB
 * @since 2021.05.08 Sat 12:34:12
 */

// 라이브러리 모듈
import { RecoilRoot } from "recoil";

// 사용자 모듈
import Layout from "../components/global/Layout";
import "../styles/index.css";

/**
 * Application 공통 레이이웃 JSX 반환 함수
 *
 * @param {JSX} Component: 컴포넌트 JSX
 * @param {JSON} pageProps: props 객체
 *
 * @returns {JSX} JSX 객체
 */
export default function MyApp({ Component, pageProps })
{
	return (
		<RecoilRoot>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</RecoilRoot>
	);
}