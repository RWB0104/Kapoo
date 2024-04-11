/**
 * 마크다운 blockquote 태그 서브 컴포넌트
 *
 * @author RWB
 * @since 2024.04.06 Sat 04:19:29
 */

import { PaletteMode } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import { BlockquoteHTMLAttributes, DetailedHTMLProps } from 'react';

export interface MarkdownBlockquoteProps extends Omit<DetailedHTMLProps<BlockquoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>, 'ref'>
{
	/**
	 * 테마
	 */
	theme?: PaletteMode;
}

/**
 * 마크다운 blockquote 태그 서브 컴포넌트 반환 메서드
 *
 * @param {MarkdownBlockquoteProps} param0: MarkdownBlockquoteProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownBlockquote({ theme = 'light', children, ...props }: MarkdownBlockquoteProps): JSX.Element
{
	return (
		<Box component='blockquote' data-component='MarkdownBlockquote' margin={0} paddingBottom={4} paddingTop={4} {...props}>
			<Alert severity='info' variant={theme === 'light' ? 'standard' : 'outlined'}>
				<AlertTitle>메모</AlertTitle>

				{children}
			</Alert>
		</Box>
	);
}