/**
 * 푸터 molecule 컴포넌트
 *
 * @author RWB
 * @since 2024.04.01 Mon 00:54:30
 */

import Box, { BoxProps } from '@mui/material/Box';

export interface FooterProps extends BoxProps
{
	/**
	 * 로고
	 */
	logo?: string;

	/**
	 * 타이틀
	 */
	title?: string;
}

/**
 * 푸터 molecule 컴포넌트 반환 메서드
 *
 * @param {FooterProps} param0: FooterProps
 *
 * @returns {JSX.Element} JSX
 */
export default function Footer({ logo, title, ...props }: FooterProps): JSX.Element
{
	return (
		<Box component='footer' data-component='Footer' {...props}>
			sdf
		</Box>
	);
}