/**
 * 상단 template 컴포넌트
 *
 * @author RWB
 * @since 2024.09.08 Sun 04:16:02
 */

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export interface TopTemplateProps
{
	/**
	 * 타이틀
	 */
	title: string;

	/**
	 * 로고
	 */
	logo: string;
}

/**
 * 상단 template 컴포넌트 반환 메서드
 *
 * @param {TopTemplateProps} param0: TopTemplateProps
 *
 * @returns {JSX.Element} JSX
 */
export default function TopTemplate({ title, logo }: TopTemplateProps): JSX.Element
{
	return (
		<Box data-component='TopTemplate' paddingX={2} paddingY={1}>
			<Stack alignItems='center' direction='row' gap={2}>
				<img alt={title} height={24} src={logo} width={24} />
				<Typography fontSize='1.2rem' fontWeight='bold'>{title}</Typography>
			</Stack>
		</Box>
	);
}