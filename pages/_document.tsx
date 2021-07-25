// 라이브러리 모듈
import Document, { Html, Head, Main, NextScript, DocumentInitialProps, DocumentContext } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import { RenderPageResult } from 'next/dist/next-server/lib/utils';

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
		return (
			<Html>
				<Head>
					<link rel="icon" href="/favicon.ico" />
					<link rel="shortcut icon" href="/favicon.ico" />

					<meta name="google-site-verification" content="4NW8SDMGP89T6Sldqnv7ldyklb-kQkq0hq9tOdGgLsM" />
				</Head>

				<body>
					<Main />

					<NextScript />
				</body>
			</Html>
		);
	}
}