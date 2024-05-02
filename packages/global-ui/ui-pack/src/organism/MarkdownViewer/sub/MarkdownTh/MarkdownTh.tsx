/**
 * 마크다운 th 태그 서브 컴포넌트
 *
 * @author RWB
 * @since 2024.04.06 Sat 11:14:22
 */

import { PaletteMode } from '@mui/material';
import Box from '@mui/material/Box';
import classNames from 'classnames/bind';

import styles from './MarkdownTh.module.scss';

const cn = classNames.bind(styles);

export interface MarkdownThProps extends Omit<JSX.IntrinsicElements['th'], 'ref'>
{
	/**
	 * 테마
	 */
	theme?: PaletteMode;
}

/**
 * 마크다운 th 태그 서브 컴포넌트 반환 메서드
 *
 * @param {MarkdownThProps} param0: MarkdownThProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownTh({ theme, className, ...props }: MarkdownThProps): JSX.Element
{
	return (
		<Box
			className={cn('th', { dark: theme === 'dark' }, className)}
			component='th'
			data-component='MarkdownTh'
			padding='8px 24px'
			whiteSpace='nowrap'
			{...props}
		/>
	);
}