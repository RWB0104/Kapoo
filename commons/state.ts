/**
 * 상태 관리 모듈
 *
 * @author RWB
 * @since 2021.07.11 Sun 21:15:32
 */

// 라이브러리 모듈
import { atom } from 'recoil';

// 사용자 모듈
import { Theme } from './common';

export const themeAtom = atom({
	key: 'themeState',
	default: Theme.DARK
});

export const menuAtom = atom({
	key: 'menuState',
	default: undefined as boolean | undefined
});

export const loadingAtom = atom({
	key: 'loadingState',
	default: false
});

export const postsPageAtom = atom({
	key: 'postsPageState',
	default: 1
});

export const projectsPageAtom = atom({
	key: 'projectsPageState',
	default: 1
});

export const postsCategoryAtom = atom({
	key: 'postsCategoryState',
	default: [] as string[]
});

export const projectsCategoryAtom = atom({
	key: 'projectsCategoryState',
	default: [] as string[]
});

export const postsSearchAtom = atom({
	key: 'postsSearchState',
	default: ''
});

export const projectsSearchAtom = atom({
	key: 'projectsSearchState',
	default: ''
});