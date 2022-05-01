/**
 * 상태 관리 모듈
 *
 * @author RWB
 * @since 2021.07.11 Sun 21:15:32
 */

// 라이브러리 모듈
import { atom } from 'recoil';

export const darkAtom = atom({
	key: 'darkState',
	default: true
});

export const topAtom = atom({
	key: 'topState',
	default: true
});

export const menuAtom = atom({
	key: 'menuState',
	default: undefined as boolean | undefined
});

export const loadingAtom = atom({
	key: 'loadingState',
	default: false
});

export const semanticAtom = atom({
	key: 'semanticState',
	default: true
});