/**
 * 메뉴 리스트 모듈
 *
 * @author RWB
 * @since 2022.05.09 Mon 21:03:29
 */

// 라이브러리 모듈
import { FaAt, FaBook, FaHome, FaRocket } from 'react-icons/fa';

// 사용자 모듈
import { DESCRIPTION } from './env';

export const MENU_LIST = [
	{
		id: 1,
		title: 'Welcome',
		desc: DESCRIPTION,
		url: { pathname: '/' },
		icon: <FaHome />
	},
	{
		id: 2,
		title: 'Posts',
		desc: '무언가 끄적끄적 쓰는 중...',
		url: { pathname: '/posts' },
		icon: <FaBook />
	},
	{
		id: 3,
		title: 'Projects',
		desc: '무언가 뚝딱뚝딱 하는 중...',
		url: { pathname: '/projects' },
		icon: <FaRocket />
	},
	{
		id: 4,
		title: 'About',
		desc: '나름 멋들어진 자기소개를 준비하는 중...',
		url: { pathname: '/about' },
		icon: <FaAt />
	}
];