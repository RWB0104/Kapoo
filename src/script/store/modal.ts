import { create } from 'zustand';

export type SetImageModalHandler = (image?: string) => void;

export interface ImageModalStoreProps
{
	/**
	 * 이미지
	 */
	image?: string;

	/**
	 * 이미지 할당 메서드
	 */
	setImage: SetImageModalHandler;
}

export const imageModalStore = create<ImageModalStoreProps>((set) => ({
	setImage: (image): void =>
	{
		set({ image });
	}
}));