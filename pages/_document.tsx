// 라이브러리 모듈
import Document, { Html, Head, Main, NextScript, DocumentInitialProps, DocumentContext } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import { RenderPageResult } from 'next/dist/next-server/lib/utils';

// 사용자 모듈
import { getBuildHash } from '@commons/api';

/**
 * 문서 클래스
 *
 * @author RWB
 * @since 2021.07.14 Wed 23:16:09
 */
export default class KapooDocument extends Document
{
	/**
	 * 초기 Props 반환 함수
	 *
	 * @param {DocumentContext} ctx: Context 객체
	 *
	 * @returns {Promise<DocumentInitialProps>} Props 객체
	 */
	static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps>
	{
		const sheets = new ServerStyleSheets();
		const originalRenderPage = ctx.renderPage;

		ctx.renderPage = (): RenderPageResult | Promise<RenderPageResult> => originalRenderPage({
			enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
		});

		const initialProps = await Document.getInitialProps(ctx);

		return {
			...initialProps,
			styles: (
				<>
					{initialProps.styles}
					{sheets.getStyleElement()}
				</>
			)
		};
	}

	/**
	 * 렌더링 함수
	 *
	 * @returns {JSX.Element} JSX.Element
	 */
	render(): JSX.Element
	{
		const hash = getBuildHash();

		return (
			<Html>
				<Head>
					<meta name="hash" content={hash} />

					<link rel="icon" href="/favicon.ico" />
					<link rel="shortcut icon" href="/favicon.ico" />

					<script async src="https://www.googletagmanager.com/gtag/js?id=G-X2THE3XLX1"></script>
					<script src="/js/ga.js"></script>
				</Head>

				<body>
					<Main />

					<NextScript />
				</body>
			</Html>
		);
	}
}