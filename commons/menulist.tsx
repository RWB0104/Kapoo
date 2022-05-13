/**
 * 메뉴 리스트 모듈
 *
 * @author RWB
 * @since 2022.05.09 Mon 21:03:29
 */

import { FaAt, FaBook, FaComment, FaHome, FaRocket } from 'react-icons/fa';

import { DESCRIPTION } from './env';

export const MENU_LIST = [
	{
		desc: DESCRIPTION,
		icon: <FaHome />,
		id: 1,
		title: 'Welcome',
		url: { pathname: '/' }
	},
	{
		desc: '무언가 끄적끄적 쓰는 중...',
		icon: <FaBook />,
		id: 2,
		title: 'Posts',
		url: { pathname: '/posts' }
	},
	{
		desc: '무언가 뚝딱뚝딱 하는 중...',
		icon: <FaRocket />,
		id: 3,
		title: 'Projects',
		url: { pathname: '/projects' }
	},
	{
		desc: '나름 멋들어진 자기소개를 준비하는 중...',
		icon: <FaAt />,
		id: 4,
		title: 'About',
		url: { pathname: '/about' }
	},
	{
		desc: '두근대며 읽어보는 중...',
		icon: <FaComment />,
		id: 5,
		title: 'Comments',
		url: { pathname: '/comments' }
	}
];