/**
 * 사이드바 molecule 컴포넌트
 *
 * @author RWB
 * @since 2024.04.01 Mon 01:18:06
 */

import Drawer, { DrawerProps } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';

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
}

/**
 * 사이드바 molecule 컴포넌트 반환 메서드
 *
 * @param {SidebarProps} param0: SidebarProps
 *
 * @returns {JSX.Element} JSX
 */
export default function Sidebar({ ...props }: SidebarProps): JSX.Element
{
	return (
		<Drawer data-component='Sidebar' {...props}>
			<Stack />
		</Drawer>
	);
}