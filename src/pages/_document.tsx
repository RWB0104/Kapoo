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
			<Html lang='ko'>
				<Head>
					<meta content='#333F50' name='theme-color' />

					<link href='/manifest.json' rel='manifest' />

					<link href='/favicon.ico' rel='icon' />
					<link href='/favicon.ico' rel='shortcut icon' />
					<link href='/favicon.ico' rel='apple-touch-icon' />

					<script src='https://www.googletagmanager.com/gtag/js?id=G-7QYWYNZ90R' async />
					<script
						crossOrigin='anonymous'
						src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5522045122225064'
						async
					/>
					<script src='/js/ga.js' />
				</Head>

				<body>
					<NextScript />

					<Main />
				</body>
			</Html>
		);
	}
}