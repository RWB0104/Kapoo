/**
 * 마크다운 상태관리 모듈
 *
 * @author RWB
 * @since 2023.08.20 Sun 02:39:50
 */

import { create } from 'zustand';

export type SetRefererHandler = (referer?: RefererProps) => void;

export interface RefererProps
{
	/**
	 * 페이지
	 */
	page?: string;

	/**
	 * 카테고리
	 */
	category?: string[];

	/**
	 * 키워드
	 */
	keyword?: string;

	/**
	 * 스크롤
	 */
	scroll?: number;
}

export interface RefererStateProps
{
	/**
	 * 리퍼러
	 */
	referer?: RefererProps;

	/**
	 * 리퍼러 할당 메서드
	 */
	setReferer: SetRefererHandler;
}

export const refererStore = create<RefererStateProps>((set) => ({
	setReferer: (referer): void =>
	{
		set({ referer });
	}
}));