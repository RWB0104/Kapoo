declare module 'process'
{
	global
	{
		namespace NodeJS
		{
			interface ProcessEnv
			{
				/**
				 * 타이틀
				 */
				NEXT_PUBLIC_TITLE: string;

				/**
				 * 설명
				 */
				NEXT_PUBLIC_DESCRIPTION: string;

				/**
				 * URL
				 */
				NEXT_PUBLIC_BASE_URL: string;

				/**
				 * Google 클라이언트 ID
				 */
				GOOGLE_CLIENT_ID: string;

				/**
				 * Google 클라이언트 시크릿
				 */
				GOOGLE_CLIENT_SECRET: string;

				/**
				 * Google Refresh Token
				 */
				GOOGLE_REFRESH_TOKEN: string;
			}
		}
	}
}