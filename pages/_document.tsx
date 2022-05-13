
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
					<link href="/manifest.json" rel="manifest" />

					<link href="/favicon.ico" rel="icon" />
					<link href="/favicon.ico" rel="shortcut icon" />

					<script src="https://www.googletagmanager.com/gtag/js?id=G-7QYWYNZ90R" async></script>
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