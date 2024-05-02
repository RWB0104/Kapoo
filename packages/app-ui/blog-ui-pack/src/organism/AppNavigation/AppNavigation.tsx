/**
 * 앱 네비게이션 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.19 Fri 16:58:18
 */

'use client';

import { themeStore } from '@kapoo/state';
import { SidebarItem } from '@kapoo/ui-pack/molecule/Sidebar';
import Navigation, { NavigationProps } from '@kapoo/ui-pack/organism/Navigation';
import Book from '@mui/icons-material/Book';
import Code from '@mui/icons-material/Code';
import Comment from '@mui/icons-material/Comment';
import Home from '@mui/icons-material/Home';

const menuList: SidebarItem[] = [
	{
		icon: <Home />,
		title: '홈',
		url: '/'
	},
	{
		icon: <Book />,
		title: '게시글',
		url: '/posts'
	},
	{
		icon: <Code />,
		title: '프로젝트',
		url: '/projects'
	},
	{
		icon: <Comment />,
		title: '방명록',
		url: '/comments'
	}
];

/**
 * 앱 네비게이션 organism 컴포넌트 반환 메서드
 *
 * @param {NavigationProps} param0: NavigationProps
 *
 * @returns {JSX.Element} JSX
 */
export default function AppNavigation({ ...props }: NavigationProps): JSX.Element
{
	const { themeState } = themeStore();

	return (
		<Navigation
			items={menuList}
			logo='/logo.png'
			theme={themeState}
			{...props}
		/>
	);
}