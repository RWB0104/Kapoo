type MarkdownType = 'posts' | 'projects';

interface MarkdownHeaderProps
{
	/**
	 * 제목
	 */
	title: string;

	/**
	 * 요약
	 */
	excerpt: string;

	/**
	 * 썸네일
	 */
	coverImage: string;

	/**
	 * 날짜
	 */
	date: number;

	/**
	 * 타입
	 */
	type: MarkdownType;

	/**
	 * 카테고리
	 */
	category: string;

	/**
	 * 태그
	 */
	tag: string[];

	/**
	 * 그룹
	 */
	group?: string;

	/**
	 * 댓글 여부
	 */
	comment: boolean;

	/**
	 * 발행 여부
	 */
	publish: boolean;
}

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