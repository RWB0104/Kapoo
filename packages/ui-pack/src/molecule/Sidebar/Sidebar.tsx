/**
 * 사이드바 molecule 컴포넌트
 *
 * @author RWB
 * @since 2024.04.01 Mon 01:18:06
 */

import Box from '@mui/material/Box';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { CSSProperties } from 'react';

export interface SidebarItem
{
	/**
	 * 아이콘
	 */
	icon?: JSX.Element;

	/**
	 * 타이틀
	 */
	title: string;

	/**
	 * URL
	 */
	url: string;
}

export interface SidebarProps extends DrawerProps
{
	/**
	 * 아이템 배열
	 */
	items?: SidebarItem[];

	/**
	 * 현재 URL
	 */
	currentUrl?: string;

	/**
	 * 상단 여백
	 */
	paddingTop?: CSSProperties['paddingTop'];
}

/**
 * 사이드바 molecule 컴포넌트 반환 메서드
 *
 * @param {SidebarProps} param0: SidebarProps
 *
 * @returns {JSX.Element} JSX
 */
export default function Sidebar({ items, currentUrl, paddingTop, ...props }: SidebarProps): JSX.Element
{
	const isSelected = (url: string): boolean =>
	{
		// 홈일 경우
		if (url === '/')
		{
			return currentUrl === url;
		}

		return currentUrl?.startsWith(url) || false;
	};

	return (
		<Drawer data-component='Sidebar' {...props}>
			<Stack marginTop={paddingTop}>
				<Box minWidth={250}>
					<List>
						{items?.map(({ icon, title, url }) => (
							<ListItem key={title}>
								<Link className='w-full' href={url}>
									<ListItemButton selected={isSelected(url)}>
										<ListItemIcon color='inherit'>
											{icon}
										</ListItemIcon>

										<ListItemText color='inherit' primary={title} />
									</ListItemButton>
								</Link>
							</ListItem>
						))}
					</List>
				</Box>
			</Stack>
		</Drawer>
	);
}