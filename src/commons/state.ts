/**
 * 상태 관리 모듈
 *
 * @author RWB
 * @since 2021.07.11 Sun 21:15:32
 */

import { atom } from 'recoil';

import { ContentProps, getAtomKey, Theme } from './common';

export const themeAtom = atom({
	default: Theme.DARK,
	key: getAtomKey('themeState')
});

export const menuAtom = atom({
	default: undefined as boolean | undefined,
	key: getAtomKey('menuState')
});

export const loadingAtom = atom({
	default: false,
	key: getAtomKey('loadingState')
});

export const postsPageAtom = atom({
	default: 1,
	key: getAtomKey('postsPageState')
});

export const projectsPageAtom = atom({
	default: 1,
	key: getAtomKey('projectsPageState')
});

export const postsCategoryAtom = atom({
	default: [] as string[],
	key: getAtomKey('postsCategoryState')
});

export const projectsCategoryAtom = atom({
	default: [] as string[],
	key: getAtomKey('projectsCategoryState')
});

export const postsSearchAtom = atom({
	default: '',
	key: getAtomKey('postsSearchState')
});

export const projectsSearchAtom = atom({
	default: '',
	key: getAtomKey('projectsSearchState')
});

export const postsAtom = atom({
	default: [] as ContentProps[],
	key: getAtomKey('postsState')
});

export const projectsAtom = atom({
	default: [] as ContentProps[],
	key: getAtomKey('projectsState')
});

export const postsScrollAtom = atom({
	default: 0,
	key: getAtomKey('postsScrollState')
});

export const projectsScrollAtom = atom({
	default: 0,
	key: getAtomKey('projectsScrollState')
});