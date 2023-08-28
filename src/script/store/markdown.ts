/**
 * 마크다운 상태관리 모듈
 *
 * @author RWB
 * @since 2023.08.20 Sun 02:39:50
 */

import { MarkdownListItemProps, MarkdownProps } from '@kapoo/util/markdown';

import { create } from 'zustand';

export type SetMarkdownHandler = (list: MarkdownListItemProps[]) => void;
export type SetViewHandler = (view: MarkdownProps) => void;

export interface MarkdownStateProps
{
	/**
	 * 마크다운
	 */
	markdown: MarkdownListItemProps[];

	/**
	 * 마크다운 할당 메서드
	 */
	setMarkdown: SetMarkdownHandler;
}

export interface ViewStateProps
{
	/**
	 * 뷰
	 */
	view?: MarkdownProps;

	/**
	 * 뷰 할당 메서드
	 */
	setView: SetViewHandler;
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

export const viewStore = create<ViewStateProps>((set) => ({
	setView: (view): void =>
	{
		set({ view });
	}
}));