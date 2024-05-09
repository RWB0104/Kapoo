/**
 * 공통 인덱스 모듈
 *
 * @author RWB
 * @since 2024.05.05 Sun 03:26:50
 */

export interface MarkdownHeaderLink
{
	/**
	 * 타입
	 */
	type: 'github' | 'web';

	/**
	 * 이름
	 */
	name: string;

	/**
	 * URL
	 */
	url: string;
}

export interface MarkdownHeaderProps
{
	/**
	 * 제목
	 */
	title: string;

	/**
	 * 작가
	 */
	author: string;

	/**
	 * 부제목
	 */
	subtitle: string[];

	/**
	 * 아이콘
	 */
	icon: string;

	/**
	 * 언어
	 */
	languages: string[];

	/**
	 * 이미지
	 */
	images: string[];

	/**
	 * 링크
	 */
	links?: MarkdownHeaderLink[];

	/**
	 * 시작일자
	 */
	created: number;

	/**
	 * 완료일자
	 */
	completed?: number;

	/**
	 * 비활성화 여부
	 */
	disabled?: boolean;
}

const rootMarkdownRegex = { token: /(\d{4})-(.*?).md/ };

/**
 * 아이디 반환 메서드
 *
 * @param {string} filename: 파일명
 *
 * @returns {string | undefined} 아이디
 */
export function getId(filename: string): string | undefined
{
	const match = rootMarkdownRegex.token.exec(filename);

	// 일치 여부
	if (match)
	{
		return match[1];
	}

	return undefined;
}