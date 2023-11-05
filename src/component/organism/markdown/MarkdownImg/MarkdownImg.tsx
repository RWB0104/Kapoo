/**
 * 마크다운 이미지 태그 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.30 Wed 02:13:01
 */

'use client';

import Image from '@kapoo/atom/Image';
import { imageModalStore } from '@kapoo/store/modal';
import { themeStore } from '@kapoo/store/theme';

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import classNames from 'classnames/bind';
import { DetailedHTMLProps, ImgHTMLAttributes, ReactNode, useCallback } from 'react';

import styles from './MarkdownImg.module.scss';

const cn = classNames.bind(styles);

export type MarkdownImgProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

/**
 * 마크다운 이미지 태그 organism 컴포넌트 JSX 반환 메서드
 *
 * @param {MarkdownImgProps} param0: MarkdownImgProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function MarkdownImg({ alt, src, ...props }: MarkdownImgProps): ReactNode
{
	const { theme } = themeStore();
	const { setImage } = imageModalStore();

	const handleClick = useCallback(() =>
	{
		setImage(src);
	}, [ src, setImage ]);

	return (
		<Stack alignItems='center' data-component='MarkdownImg' padding={4} spacing={1}>
			<ButtonBase onClick={handleClick}>
				<Box borderRadius={2} className={cn('image', theme)} display='inline-flex' overflow='hidden'>
					<Image alt={alt} height='100%' src={src} width='100%' {...props} />
				</Box>
			</ButtonBase>

			{alt === 'null' ? null : <Typography color='GrayText' variant='caption'>{alt}</Typography>}
		</Stack>
	);
}