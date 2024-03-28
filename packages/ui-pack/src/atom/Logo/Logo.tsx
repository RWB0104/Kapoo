/**
 * 로고 atom 컴포넌트
 *
 * @author RWB
 * @since 2023.08.23 Wed 22:18:33
 */

import Paper, { PaperProps } from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { CSSProperties, ReactNode } from 'react';

export interface LogoProps extends PaperProps
{
	/**
	 * 사이즈
	 */
	size?: CSSProperties['width'];
}

/**
 * 로고 atom 컴포넌트 JSX 반환 메서드
 *
 * @param {LogoProps} param0: LogoProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function Logo({ size, ...props }: LogoProps): ReactNode
{
	return (
		<Paper data-component='Logo' {...props}>
			<Stack alignItems='center' height={size} justifyContent='center' width={size}>
				<img alt='logo' height='100%' src='/logo.png' width='100%' />
			</Stack>
		</Paper>
	);
}