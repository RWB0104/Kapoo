/**
 * 마크다운 에디터 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.08.29 Thu 11:55:44
 */

'use client';

import { themeStore } from '@kapoo/state';
import MarkdownViewer from '@kapoo/ui-pack/organism/MarkdownViewer';
import { OnChange } from '@monaco-editor/react';
import { Box, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import matter from 'gray-matter';
import { useCallback, useState } from 'react';

import MarkdownEditor from '../MarkdownEditor';

/**
 * 마크다운 에디터 박스 organism 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownEditorBox(): JSX.Element
{
	const { themeState } = themeStore();

	const { palette: { divider } } = useTheme();

	const [ textState, setTextState ] = useState<string>();

	const handleChange = useCallback<OnChange>((value) =>
	{
		setTextState(value);
	}, []);

	return (
		<Stack
			borderTop={`1px solid ${divider}`}
			data-component='MarkdownEditorBox'
			direction='row'
			gap={2}
			height='100%'
			padding={2}
			position='relative'
			width='100%'
		>
			<Stack border='1px solid' borderColor={divider} width='50%'>
				<MarkdownEditor theme={themeState === 'light' ? 'GitHubLight' : 'GitHubDark'} onChange={handleChange} />
			</Stack>

			<Stack
				height='100%'
				padding={2}
				position='absolute'
				right={0}
				top={0}
				width='50%'
				zIndex={2}
			>
				<Box
					border='1px solid'
					borderColor={divider}
					height='100%'
					overflow='auto'
					padding={2}
				>
					<MarkdownViewer>
						{matter(textState || '').content}
					</MarkdownViewer>
				</Box>
			</Stack>
		</Stack>
	);
}