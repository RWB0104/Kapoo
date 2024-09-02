/**
 * 마크다운 에디터 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.08.29 Thu 10:58:11
 */

'use client';

import { notoSans, ubuntuMono } from '@kapoo/common';
import DotLottieIcon from '@kapoo/ui-pack/atom/DotLottieIcon';
import MonacoEdtior, { EditorProps, useMonaco } from '@monaco-editor/react';
import Box from '@mui/material/Box';
import GitHubDark from 'monaco-themes/themes/GitHub Dark.json';
import GitHubLight from 'monaco-themes/themes/GitHub Light.json';
import { useLayoutEffect } from 'react';

export type MarkdownEditorProps = EditorProps;

const fonts = [ ubuntuMono.style.fontFamily, notoSans.style.fontFamily, 'sans-serif' ];

/**
 * 마크다운 에디터 organism 컴포넌트 반환 메서드
 *
 * @param {MarkdownEditorProps} param0: MarkdownEditorProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownEditor({ ...props }: MarkdownEditorProps): JSX.Element
{
	const monaco = useMonaco();

	useLayoutEffect(() =>
	{
		if (monaco)
		{
			monaco.editor.defineTheme('GitHubLight', GitHubLight as Parameters<typeof monaco.editor.defineTheme>[1]);
			monaco.editor.defineTheme('GitHubDark', GitHubDark as Parameters<typeof monaco.editor.defineTheme>[1]);

			monaco.editor.setTheme('GitHubDark');
			monaco.editor.setTheme('GitHubLight');
		}
	}, [ monaco ]);

	return (
		<MonacoEdtior
			data-component='MarkdownEditor'
			defaultLanguage='markdown'
			height='100%'
			theme='test'
			width='100%'
			loading={(
				<Box maxHeight={200} maxWidth={200}>
					<DotLottieIcon iconName='web-development' />
				</Box>
			)}
			options={{
				automaticLayout: true,
				fontFamily: fonts.join(', '),
				fontSize: 16,
				minimap: { enabled: false }
			}}
			{...props}
		/>
	);
}