/**
 * 상태 관리 모듈
 *
 * @author RWB
 * @since 2021.07.11 Sun 21:15:32
 */

import { atom } from 'recoil';

import { ContentProps, Theme } from './common';

export const themeAtom = atom({
	default: Theme.DARK,
	key: 'themeState'
});

export const menuAtom = atom({
	default: undefined as boolean | undefined,
	key: 'menuState'
});

export const loadingAtom = atom({
	default: false,
	key: 'loadingState'
});

export const postsPageAtom = atom({
	default: 1,
	key: 'postsPageState'
});

export const projectsPageAtom = atom({
	default: 1,
	key: 'projectsPageState'
});

export const postsCategoryAtom = atom({
	default: [] as string[],
	key: 'postsCategoryState'
});

export const projectsCategoryAtom = atom({
	default: [] as string[],
	key: 'projectsCategoryState'
});

export const postsSearchAtom = atom({
	default: '',
	key: 'postsSearchState'
});

export const projectsSearchAtom = atom({
	default: '',
	key: 'projectsSearchState'
});

export const postsAtom = atom({
	default: [] as ContentProps[],
	key: 'postsState'
});

export const projectsAtom = atom({
	default: [] as ContentProps[],
	key: 'projectsState'
});

export const postsScrollAtom = atom({
	default: 0,
	key: 'postsScrollState'
});

export const projectsScrollAtom = atom({
	default: 0,
	key: 'projectsScrollState'
});