/**
 * 마크다운 tr 태그 서브 컴포넌트
 *
 * @author RWB
 * @since 2024.04.06 Sat 11:22:15
 */

import { PaletteMode } from '@mui/material';
import Box from '@mui/material/Box';
import classNames from 'classnames/bind';

import styles from './MarkdownTr.module.scss';

const cn = classNames.bind(styles);

export interface MarkdownTrProps extends Omit<JSX.IntrinsicElements['tr'], 'ref'>
{
	/**
	 * 테마
	 */
	theme?: PaletteMode;
}

/**
 * 마크다운 tr 태그 서브 컴포넌트 반환 메서드
 *
 * @param {MarkdownTrProps} param0: MarkdownTrProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownTr({ theme, className, ...props }: MarkdownTrProps): JSX.Element
{
	return (
		<Box
			className={cn('tr', { dark: theme === 'dark' }, className)}
			component='tr'
			data-component='MarkdownTr'
			{...props}
		/>
	);
}