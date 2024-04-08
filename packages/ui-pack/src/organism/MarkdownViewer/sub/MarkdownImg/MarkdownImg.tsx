/**
 * 마크다운 이미지 태그 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.08 Mon 12:27:05
 */

import { PaletteMode, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import classNames from 'classnames/bind';
import { MouseEventHandler } from 'react';

import styles from './MarkdownImg.module.scss';

import Img, { ImgProps } from '../../../Img';

const cn = classNames.bind(styles);

export interface MarkdownImgProps extends ImgProps
{
	/**
	 * 테마
	 */
	theme?: PaletteMode;

	/**
	 * 이미지 클릭 이벤트 메서드
	 */
	onImageClick?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * 마크다운 이미지 태그 organism 컴포넌트 반환 메서드
 *
 * @param {MarkdownImgProps} param0: MarkdownImgProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownImg({ theme, onImageClick, alt, ...props }: MarkdownImgProps): JSX.Element
{
	return (
		<Stack alignItems='center' data-component='MarkdownImg' padding={4} spacing={1} width='100%'>
			<ButtonBase onClick={onImageClick}>
				<Box borderRadius={2} className={cn('image', theme)} display='inline-flex' overflow='hidden'>
					<Img alt={alt} height='100%' width='100%' {...props} />
				</Box>
			</ButtonBase>

			{alt === 'null' ? null : <Typography color='GrayText' variant='caption'>{alt}</Typography>}
		</Stack>
	);
}