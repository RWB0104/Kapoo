// 라이브러리 모듈
import Document, { Html, Head, Main, NextScript } from 'next/document';

/**
 * 문서 클래스
 *
 * @author RWB
 * @since 2021.07.14 Wed 23:16:09
 */
export default class KapooDocument extends Document
{
	/**
	 * 렌더링 함수
	 *
	 * @returns {JSX.Element} JSX.Element
	 */
	render(): JSX.Element
	{
		return (
			<Html lang="ko">
				<Head>
					<link rel="manifest" href="/manifest.json" />

					<link rel="icon" href="/favicon.ico" />
					<link rel="shortcut icon" href="/favicon.ico" />

					<script async src="https://www.googletagmanager.com/gtag/js?id=G-7QYWYNZ90R"></script>
					<script src="/js/ga.js"></script>
				</Head>

				<body>
					<NextScript />

					<Main />
				</body>
			</Html>
		);
	}
}