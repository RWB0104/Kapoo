/**
 * 마크다운 코드 인라인 태그 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.30 Wed 02:47:37
 */

'use client';

import { ubuntuMono } from '@kapoo/organism/global/AppThemeProvider';
import { themeStore } from '@kapoo/store/theme';

import Box from '@mui/material/Box';
import classNames from 'classnames/bind';
import { CSSProperties, ReactNode, useMemo } from 'react';
import { CodeProps } from 'react-markdown/lib/ast-to-react';

import styles from './MarkdownCodeInline.module.scss';

const cn = classNames.bind(styles);

export type MarkdownCodeInlineProps = CodeProps;

/**
 * 마크다운 코드 인라인 태그 organism 컴포넌트 JSX 반환 메서드
 *
 * @param {MarkdownCodeInlineProps} param0: MarkdownCodeInlineProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function MarkdownCodeInline({ ...props }: MarkdownCodeInlineProps): ReactNode
{
	const { theme } = themeStore();

	const bgcolor: CSSProperties['backgroundColor'] = useMemo(() => (theme === 'light' ? 'whitesmoke' : '#333333'), [ theme ]);
	const borderColor: CSSProperties['borderColor'] = useMemo(() => (theme === 'light' ? 'gainsboro' : '#444444'), [ theme ]);

	return (
		<Box
			bgcolor={bgcolor}
			border='1px solid'
			borderColor={borderColor}
			borderRadius={1}
			className={cn('codeline', 'selectable')}
			component='span'
			data-component='MarkdownCodeInline'
			fontFamily={[ ubuntuMono.style.fontFamily ]}
			marginLeft={0.5}
			marginRight={0.5}
			padding='2px 5px'
			{...props}
		/>
	);
}