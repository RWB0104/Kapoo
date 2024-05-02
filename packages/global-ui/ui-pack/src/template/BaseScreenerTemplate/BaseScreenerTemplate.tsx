/**
 * 기본 스크리너 template 컴포넌트
 *
 * @author RWB
 * @since 2024.04.28 Sun 23:31:48
 */

import Box from '@mui/material/Box';
import { PropsWithChildren } from 'react';

import Wave from '../../atom/Wave';

export interface BaseScreenerTemplateProps extends PropsWithChildren
{
	/**
	 * 클래스
	 */
	className?: string;
}

/**
 * 기본 스크리너 template 컴포넌트 반환 메서드
 *
 * @param {BaseScreenerTemplateProps} param0: BaseScreenerTemplateProps
 *
 * @returns {JSX.Element} JSX
 */
export default function BaseScreenerTemplate({ className, children }: BaseScreenerTemplateProps): JSX.Element
{
	return (
		<Box
			className={className}
			data-component='BaseScreenerTemplate'
			height='100%'
			position='relative'
			width='100%'
		>
			{children}

			<Box bottom={0} left={0} position='absolute' width='100%'>
				<Wave height={80} />
			</Box>
		</Box>
	);
}