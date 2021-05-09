// 라이브러리 모듈
import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/styles";

/**
 * MyDocument 클래스
 *
 * @author RWB
 * @since 2021.05.08 Sat 12:32:10
 */
export default class MyDocument extends Document
{
	/**
	 * 초기 Props 반환 함수
	 *
	 * @param {Object} ctx: Context 객체
	 *
	 * @returns {JSON} Props 객체
	 */
	static async getInitialProps(ctx)
	{
		const sheets = new ServerStyleSheets();
		const originalRenderPage = ctx.renderPage;

		ctx.renderPage = () => originalRenderPage({ enhanceApp: (App) => (props) => sheets.collect(<App {...props} />) });

		const initialProps = await Document.getInitialProps(ctx);

		return {
			...initialProps,
			styles: [
				...React.Children.toArray(initialProps.styles),
				sheets.getStyleElement()
			]
		};
	}

	/**
	 * 렌더링 JSX 반환 함수
	 *
	 * @returns {JSX} JSX 객체
	 */
	render()
	{
		return (
			<Html lang="ko">
				<Head>
					<link rel="icon" href="/favicons/favicon.ico" />
					<link rel="shortcut icon" href="/favicons/favicon.ico" />
				</Head>

				<body>
					<Main />

					<NextScript />
				</body>
			</Html>
		);
	}
}