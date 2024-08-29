/**
 * 마크다운 에디터 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.08.29 Thu 10:58:11
 */

'use client';

import { notoSans, ubuntuMono } from '@kapoo/common';
import DotLottieIcon from '@kapoo/ui-pack/atom/DotLottieIcon';
import MonacoEdtior, { EditorProps } from '@monaco-editor/react';
import Box from '@mui/material/Box';

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
	return (
		<MonacoEdtior
			data-component='MarkdownEditor'
			defaultLanguage='markdown'
			height='100%'
			width='100%'
			loading={(
				<Box maxHeight={200} maxWidth={200}>
					<DotLottieIcon iconName='web-development' />
				</Box>
			)}
			options={{
				fontFamily: fonts.join(', '),
				fontSize: 16
			}}
			{...props}
		/>
	);
}