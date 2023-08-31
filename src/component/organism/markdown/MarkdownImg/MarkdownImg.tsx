/**
 * 마크다운 이미지 태그 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.30 Wed 02:13:01
 */

import { imageModalStore } from '@kapoo/store/modal';

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import { DetailedHTMLProps, ImgHTMLAttributes, ReactNode, useCallback } from 'react';

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
	const { setImage } = imageModalStore();

	const handleClick = useCallback(() =>
	{
		setImage(src);
	}, [ src, setImage ]);

	return (
		<Stack alignItems='center' data-component='MarkdownImg' padding={4} spacing={1}>
			<ButtonBase onClick={handleClick}>
				<Box borderRadius={2} boxShadow='3px 3px 10px grey' display='inline-flex' overflow='hidden'>
					<img alt={alt} height='100%' src={src} width='100%' {...props} />
				</Box>
			</ButtonBase>

			{alt === 'null' ? null : <Typography color='GrayText' variant='caption'>{alt}</Typography>}
		</Stack>
	);
}