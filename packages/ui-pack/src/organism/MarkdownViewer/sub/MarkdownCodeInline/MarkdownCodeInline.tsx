/**
 * 마크다운 코드라인 태그 서브 컴포넌트
 *
 * @author RWB
 * @since 2024.04.08 Mon 10:14:31
 */

import { PaletteMode } from '@mui/material';
import Typography, { TypographyProps } from '@mui/material/Typography';
import classNames from 'classnames/bind';
import { CSSProperties, useMemo } from 'react';

import styles from './MarkdownCodeInline.module.scss';

const cn = classNames.bind(styles);

export interface MarkdownCodeInlineProps extends Omit<TypographyProps, 'ref'>
{
	/**
	 * 테마
	 */
	theme?: PaletteMode;
}

/**
 * 마크다운 코드라인 태그 서브 컴포넌트 반환 메서드
 *
 * @param {MarkdownCodeInlineProps} param0: MarkdownCodeInlineProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownCodeInline({ theme, ...props }: MarkdownCodeInlineProps): JSX.Element
{
	const bgcolor: CSSProperties['backgroundColor'] = useMemo(() => (theme === 'dark' ? '#333333' : 'whitesmoke'), [ theme ]);
	const borderColor: CSSProperties['borderColor'] = useMemo(() => (theme === 'dark' ? '#444444' : 'gainsboro'), [ theme ]);

	return (
		<Typography
			bgcolor={bgcolor}
			border='1px solid'
			borderColor={borderColor}
			borderRadius={1}
			className={cn('codeline', 'selectable')}
			component='span'
			data-component='MarkdownCodeInline'
			marginLeft={0.5}
			marginRight={0.5}
			padding='2px 5px'
			{...props}
		/>
	);
}