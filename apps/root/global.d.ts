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
			}
		}
	}
}