/**
 * 리퍼러 상태 모듈
 *
 * @author RWB
 * @since 2024.04.15 Mon 15:35:06
 */

import { create } from 'zustand';

export type RefererStoreSetHandler = (referer?: string) => void;

export interface RefererStoreProps
{
	/**
	 * 리퍼러
	 */
	refererState?: string;

	/**
	 * 리퍼러 할당 메서드
	 */
	setRefererState: RefererStoreSetHandler;
}

export const refererStore = create<RefererStoreProps>((set) => ({
	setRefererState: (refererState): void =>
	{
		set({ refererState });
	}
}));