/**
 * 마크다운 TOC 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.12 Fri 13:28:53
 */

'use client';

import { Menu } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';

export interface MarkdownTocListItem
{
	/**
	 * 텍스트
	 */
	text: string;

	/**
	 * 레벨
	 */
	level: number;

	/**
	 * 인덱스
	 */
	idx: string;
}

export interface MarkdownTocBoxProps
{
	/**
	 * 마크다운 TOC 리스트
	 */
	list: MarkdownTocListItem[];
}

/**
 * 마크다운 TOC 박스 organism 컴포넌트 반환 메서드
 *
 * @param {MarkdownTocBoxProps} param0: MarkdownTocBoxProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownTocBox({ list }: MarkdownTocBoxProps): JSX.Element
{
	const { palette: { divider, primary } } = useTheme();

	return (
		<Stack border={`1px solid ${divider}`}>
			<Stack
				alignItems='center'
				bgcolor={primary.main}
				color={primary.contrastText}
				direction='row'
				gap={1}
				padding={1}
			>
				<Menu />

				<Typography fontWeight='bold'>Table of Contents</Typography>
			</Stack>

			<List dense disablePadding>
				{list.map(({ text, level, idx }, num) => (
					<Fragment key={text}>
						<ListItem disablePadding>
							<Box bgcolor={level === 1 ? `${primary.main}20` : undefined} width='100%'>
								<ListItemButton href={`#${text.replaceAll(' ', '-')}`}>
									<Box paddingLeft={(level - 1)}>
										<Typography variant='caption'>
											{idx} {text}
										</Typography>
									</Box>
								</ListItemButton>
							</Box>
						</ListItem>

						{num < list.length - 1 ? <Divider /> : null}
					</Fragment>
				))}
			</List>
		</Stack>
	);
}