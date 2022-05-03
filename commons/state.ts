/**
 * 상태 관리 모듈
 *
 * @author RWB
 * @since 2021.07.11 Sun 21:15:32
 */

// 라이브러리 모듈
import { atom } from 'recoil';
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