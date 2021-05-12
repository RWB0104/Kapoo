/**
 * 상태 관리 JavaScript
 *
 * @author RWB
 * @since 2021.05.08 Sat 14:30:43
 */

// 라이브러리 모듈
import cookie from "react-cookies";
import { atom } from "recoil";

// 테마 상태
export const darkAtom = atom({
	key: "darkState",
	default: cookie.load("theme") === "true"
});

// 메뉴 상태
export const menuAtom = new atom({
	key: "menuState",
	default: false
});