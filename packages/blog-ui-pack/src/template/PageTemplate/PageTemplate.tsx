/**
 * 페이지 template 컴포넌트
 *
 * @author RWB
 * @since 2024.04.03 Wed 09:07:11
 */

import Footer from '@kapoo/ui-pack/molecule/Footer';
import { SidebarItem } from '@kapoo/ui-pack/molecule/Sidebar';
import Navigation from '@kapoo/ui-pack/organism/Navigation';
import { Book, Code, Comment } from '@mui/icons-material';
import Home from '@mui/icons-material/Home';
import Box from '@mui/material/Box';
import pgk from 'package.json';
import { PropsWithChildren } from 'react';

export interface PageTemplateProps extends PropsWithChildren
{
	/**
	 * 타이틀
	 */
	title: string;
}

/**
 * 페이지 template 컴포넌트 반환 메서드
 *
 * @param {PageTemplateProps} param0: PageTemplateProps
 *
 * @returns {JSX.Element} JSX
 */
export default function PageTemplate({ title, children }: PageTemplateProps): JSX.Element
{
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

	return (
		<Box component='main' data-component='PageTemplate'>
			<Navigation
				items={menuList}
				logo='/logo.png'
				title={title}
				version={pgk.version}
			/>

			{children}

			<Footer />
		</Box>
	);
}