/**
 * 리퍼러 상태 모듈
 *
 * @author RWB
 * @since 2024.04.15 Mon 15:35:06
 */

import { create } from 'zustand';

export type RefererStoreSetHandler = (referer?: string) => void;

export interface RefererStore
{
	/**
	 * 리퍼러
	 */
	referer?: string;

	/**
	 * 리퍼러 할당 메서드
	 */
	setReferer: RefererStoreSetHandler;
}

export const refererStore = create<RefererStore>((set) => ({
	setReferer: (referer): void =>
	{
		set({ referer });
	}
}));