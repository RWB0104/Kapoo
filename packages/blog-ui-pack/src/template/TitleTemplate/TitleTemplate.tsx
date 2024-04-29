/**
 * 타이틀 template 컴포넌트
 *
 * @author RWB
 * @since 2024.04.24 Wed 00:04:30
 */

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PropsWithChildren } from 'react';

export interface TitleTemplateProps extends PropsWithChildren
{
	/**
	 * 제목
	 */
	title: string;

	/**
	 * 부제목
	 */
	subtitle?: string;
}

/**
 * 타이틀 template 컴포넌트 반환 메서드
 *
 * @param {TitleTemplateProps} param0: TitleTemplateProps
 *
 * @returns {JSX.Element} JSX
 */
export default function TitleTemplate({ title, subtitle, children }: TitleTemplateProps): JSX.Element
{
	return (
		<Stack alignItems='center' data-component='TitleTemplate' gap={8} justifyContent='center'>
			<Stack alignItems='center' gap={1} justifyContent='center' width='100%'>
				<Typography fontWeight='bold' variant='h4'>{title}</Typography>

				<Box color='red' maxWidth='sm' width='100%'>
					<Divider variant='fullWidth' />
				</Box>

				<Typography color='GrayText'>{subtitle}</Typography>
			</Stack>

			<Box width='100%'>
				{children}
			</Box>
		</Stack>
	);
}