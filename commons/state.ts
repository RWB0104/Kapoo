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