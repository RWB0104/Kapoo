/**
 * 이미지 상태 모듈
 *
 * @author RWB
 * @since 2024.04.18 Thu 02:38:12
 */

import { create } from 'zustand';

export type ImageStoreSetHandler = (image?: string) => void;

export interface ImageStore
{
	/**
	 * 이미지
	 */
	image?: string;

	/**
	 * 이미지 할당 메서드
	 */
	setImage: ImageStoreSetHandler;
}

export const imageStore = create<ImageStore>((set) => ({
	setImage: (image): void =>
	{
		set({ image });
	}
}));