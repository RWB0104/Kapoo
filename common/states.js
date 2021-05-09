/**
 * 상태 관리 JavaScript
 *
 * @author RWB
 * @since 2021.05.08 Sat 14:30:43
 */

// 라이브러리 모듈
import { atom } from "recoil";

export const darkAtom = atom({
	key: "darkState",
	default: true
});

// 메뉴 상태
export const menuAtom = new atom({
	key: "menuState",
	default: false
});