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
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import WbSunny from '@mui/icons-material/WbSunny';
import WrapText from '@mui/icons-material/WrapText';
import Box from '@mui/material/Box';
import { amber, blue } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, { ToggleButtonGroupProps } from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { useCallback, useMemo } from 'react';

type SelectType = 'root' | 'blog';
type PannelType = 'preview' | 'wrap';

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

	const pannel = useMemo<PannelType[]>(() =>
	{
		const list: PannelType[] = [];

		if (editorState.preview)
		{
			list.push('preview');
		}

		if (editorState.wrap)
		{
			list.push('wrap');
		}

		return list;
	}, [ editorState ]);

	const handleClick = useCallback(() =>
	{
		toggleThemeState();
	}, [ toggleThemeState ]);

	const handlePannelChange = useCallback<Exclude<ToggleButtonGroupProps['onChange'], undefined>>((e, value) =>
	{
		const list: PannelType[] = Array.isArray(value) ? value : [];

		setEditorState((state) => ({
			...state,
			editorState: {
				preview: list.includes('preview'),
				wrap: list.includes('wrap')
			}
		}));
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

				<ToggleButtonGroup value={pannel} onChange={handlePannelChange}>
					<ToggleButton size='small' value='wrap'>
						<WrapText />
					</ToggleButton>

					<ToggleButton size='small' value='preview'>
						<VisibilityOutlined />
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