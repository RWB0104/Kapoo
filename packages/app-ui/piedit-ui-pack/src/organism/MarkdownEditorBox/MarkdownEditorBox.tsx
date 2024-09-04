/**
 * 마크다운 에디터 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.08.29 Thu 11:55:44
 */

'use client';

import { editorStore, themeStore } from '@kapoo/state';
import MarkdownViewer from '@kapoo/ui-pack/organism/MarkdownViewer';
import { OnChange } from '@monaco-editor/react';
import { Box, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useCallback, useMemo, useState } from 'react';

import MarkdownEditor from '../MarkdownEditor';

/**
 * 마크다운 에디터 박스 organism 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownEditorBox(): JSX.Element
{
	const { themeState } = themeStore();
	const { editorState } = editorStore();

	const { palette: { divider } } = useTheme();

	const [ textState, setTextState ] = useState<string>();

	const handleChange = useCallback<OnChange>((value) =>
	{
		setTextState(value);
	}, []);

	const content = useMemo(() =>
	{
		const regex = /^(---\s*[\s\S]*?\s*---)\s*([\s\S]*)/;

		const value = textState || '';

		const match = regex.exec(value);

		if (match)
		{
			return match[2];
		}

		return value;
	}, [ textState ]);

	return (
		<Stack
			data-component='MarkdownEditorBox'
			direction='row'
			gap={2}
			height='100%'
			padding={2}
			position='relative'
			width='100%'
		>
			<Stack
				height='100%'
				left={0}
				position='absolute'
				top={0}
				width='50%'
			>
				<MarkdownEditor
					options={{ wordWrap: editorState.wrap ? 'on' : undefined }}
					theme={themeState === 'light' ? 'GitHubLight' : 'GitHubDark'}
					onChange={handleChange}
				/>
			</Stack>

			<Stack
				height='100%'
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
						{content}
					</MarkdownViewer>
				</Box>
			</Stack>
		</Stack>
	);
}