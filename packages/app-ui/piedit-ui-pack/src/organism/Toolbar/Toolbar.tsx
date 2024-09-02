/**
 * 툴바 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.08.29 Thu 17:49:53
 */

'use client';

import { themeStore } from '@kapoo/state';
import Img from '@kapoo/ui-pack/organism/Img';
import WbSunny from '@mui/icons-material/WbSunny';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCallback } from 'react';

type SelectType = 'root' | 'blog';

interface SelectProps
{
	/**
	 * 라벨
	 */
	label: string;

	/**
	 * 로고
	 */
	logo: string;

	/**
	 * 값
	 */
	value: SelectType;
}

const list: SelectProps[] = [
	{
		label: '블로그',
		logo: 'https://blog.itcode.dev/favicon.ico',
		value: 'blog'
	},
	{
		label: '소개',
		logo: 'https://itcode.dev/favicon.ico',
		value: 'root'
	}
];

export default function Toolbar(): JSX.Element
{
	const { toggleThemeState } = themeStore();

	const handleClick = useCallback(() =>
	{
		toggleThemeState();
	}, [ toggleThemeState ]);

	return (
		<Stack bgcolor='black' data-component='Toolbar' direction='row' padding={1}>
			<Box width={150}>
				<Select defaultValue='blog' size='small' fullWidth>
					{list.map(({ label, logo, value }) => (
						<MenuItem key={value} value={value}>
							<Stack alignItems='center' direction='row' gap={1}>
								<Img alt={logo} height={24} src={logo} width={24} />

								<Typography>{label}</Typography>
							</Stack>
						</MenuItem>
					))}
				</Select>
			</Box>

			<IconButton onClick={handleClick}>
				<WbSunny />
			</IconButton>
		</Stack>
	);
}