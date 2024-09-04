/**
 * 툴바 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.08.29 Thu 17:49:53
 */

'use client';

import { editorStore, themeStore } from '@kapoo/state';
import Img from '@kapoo/ui-pack/organism/Img';
import NightsStay from '@mui/icons-material/NightsStay';
import WbSunny from '@mui/icons-material/WbSunny';
import Box from '@mui/material/Box';
import { amber, blue } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, { ToggleButtonGroupProps } from '@mui/material/ToggleButtonGroup';
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
	const { themeState, toggleThemeState } = themeStore();
	const { editorState, setEditorState } = editorStore();

	const handleClick = useCallback(() =>
	{
		toggleThemeState();
	}, [ toggleThemeState ]);

	const handleWrapChange = useCallback<Exclude<ToggleButtonGroupProps['onChange'], undefined>>((e, value) =>
	{
		console.log(value);

		setEditorState({ wrap: value[0] === 'wrap' });
	}, [ setEditorState ]);

	return (
		<Stack data-component='Toolbar' direction='row' gap={1} justifyContent='space-between' padding={1}>
			<Stack direction='row' gap={1}>
				<Box gap={1} width={150}>
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

				<ToggleButtonGroup value={editorState.wrap ? [ 'wrap' ] : undefined} onChange={handleWrapChange}>
					<ToggleButton size='small' value='wrap'>
						<WbSunny />
					</ToggleButton>
				</ToggleButtonGroup>
			</Stack>

			<Stack justifyContent='center'>
				<IconButton onClick={handleClick}>
					{themeState === 'light' ? <NightsStay htmlColor={blue[500]} /> : null}
					{themeState === 'dark' ? <WbSunny htmlColor={amber[500]} /> : null}
				</IconButton>
			</Stack>
		</Stack>
	);
}