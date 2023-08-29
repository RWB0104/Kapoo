/**
 * 마크다운 이미지 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.08.30 Wed 02:13:01
 */

import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { DetailedHTMLProps, ImgHTMLAttributes, ReactNode } from 'react';

export type MarkdownImgProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

/**
 * 마크다운 이미지 molecule 컴포넌트 JSX 반환 메서드
 *
 * @param {MarkdownImgProps} param0: MarkdownImgProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function MarkdownImg({ alt, src, ...props }: MarkdownImgProps): ReactNode
{
	return (
		<Stack alignItems='center' data-component='MarkdownImg' paddingBottom={2} paddingTop={2} spacing={1}>
			<Link href={src || '#'} target='_blank' title={src}>
				<img alt={alt} src={src} {...props} width='100%' />
			</Link>

			{alt === 'null' ? null : <Typography color='GrayText' variant='caption'>{alt}</Typography>}
		</Stack>
	);
}