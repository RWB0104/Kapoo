/**
 * 마크다운 상태관리 모듈
 *
 * @author RWB
 * @since 2023.08.20 일 02:39:50
 */

import { MarkdownProps } from '@kapoo/util/markdown';

import { create } from 'zustand';

export type SetMarkdownHandler = (list: MarkdownProps[]) => void;

export interface MarkdownStateProps
{
	/**
	 * 마크다운
	 */
	markdown: MarkdownProps[];

	/**
	 * 마크다운 할당 메서드
	 */
	setMarkdown: SetMarkdownHandler;
}

export const postsStore = create<MarkdownStateProps>((set) => ({
	markdown: [],
	setMarkdown: (list): void =>
	{
		set({ markdown: list });
	}
}));

export const projectsStore = create<MarkdownStateProps>((set) => ({
	markdown: [],
	setMarkdown: (list): void =>
	{
		set({ markdown: list });
	}
}));