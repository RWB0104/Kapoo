/**
 * 마크다운 코드 인라인 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.08.30 Wed 02:47:37
 */

import { themeStore } from '@kapoo/store/theme';

import Box from '@mui/material/Box';
import { CSSProperties, ReactNode, useMemo } from 'react';
import { CodeProps } from 'react-markdown/lib/ast-to-react';

export type MarkdownCodeInlineProps = CodeProps;

export default function MarkdownCodeInline({ ...props }: MarkdownCodeInlineProps): ReactNode
{
	const { theme } = themeStore();

	const bgcolor: CSSProperties['backgroundColor'] = useMemo(() => (theme === 'light' ? 'whitesmoke' : '#222222'), [ theme ]);
	const borderColor: CSSProperties['borderColor'] = useMemo(() => (theme === 'light' ? 'gainsboro' : '#333333'), [ theme ]);

	return (
		<Box
			bgcolor={bgcolor}
			border='1px solid'
			borderColor={borderColor}
			borderRadius={1}
			component='code'
			data-component='MarkdownCodeInline'
			marginLeft={0.5}
			marginRight={0.5}
			padding='2px 5px'
			{...props}
		/>
	);
}