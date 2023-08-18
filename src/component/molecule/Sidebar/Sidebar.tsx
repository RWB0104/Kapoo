/**
 * 사이드바 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 토 04:53:25
 */

'use client';

import { APP_INFO } from '@kapoo/env';
import pkg from '@kapoo/package';

import AutoStories from '@mui/icons-material/AutoStories';
import Code from '@mui/icons-material/Code';
import Home from '@mui/icons-material/Home';
import Box from '@mui/material/Box';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { ReactNode, useCallback } from 'react';

export type SidebarProps = DrawerProps;

/**
 * 사이드바 molecule 컴포넌트 JSX 반환 메서드
 *
 * @param {SidebarProps} param0: SidebarProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function Sidebar({ ...props }: SidebarProps): ReactNode
{
	const handleClick = useCallback(() =>
	{
		// onClose 객체가 유효할 경우
		if (props.onClose)
		{
			props.onClose({}, 'backdropClick');
		}
	}, [ props.onClose ]);

	return (
		<Drawer data-component='Sidebar' sx={{ zIndex: 10001 }} {...props}>
			<Stack alignItems='center' height='100%' justifyContent='space-between'>
				<Box minWidth={250}>
					<List>
						<ListItem>
							<Link className='fullwidth' href='/' onClick={handleClick}>
								<ListItemButton>
									<ListItemIcon>
										<Home />
									</ListItemIcon>

									<ListItemText primary='홈' />
								</ListItemButton>
							</Link>
						</ListItem>

						<ListItem>
							<Link className='fullwidth' href='/posts' onClick={handleClick}>
								<ListItemButton>
									<ListItemIcon>
										<Code />
									</ListItemIcon>

									<ListItemText primary='포스트' />
								</ListItemButton>
							</Link>
						</ListItem>

						<ListItem>
							<Link className='fullwidth' href='/projects' onClick={handleClick}>
								<ListItemButton>
									<ListItemIcon>
										<Code />
									</ListItemIcon>

									<ListItemText primary='프로젝트' />
								</ListItemButton>
							</Link>
						</ListItem>

						<ListItem>
							<Link className='fullwidth' href='/comments' onClick={handleClick}>
								<ListItemButton>
									<ListItemIcon>
										<AutoStories />
									</ListItemIcon>

									<ListItemText primary='방명록' />
								</ListItemButton>
							</Link>
						</ListItem>
					</List>
				</Box>

				<Stack alignItems='center' marginBottom={4} spacing={1}>
					<Typography variant='caption'>{APP_INFO.title}</Typography>
					<Typography color='GrayText' variant='caption'>{pkg.version}</Typography>
				</Stack>
			</Stack>
		</Drawer>
	);
}