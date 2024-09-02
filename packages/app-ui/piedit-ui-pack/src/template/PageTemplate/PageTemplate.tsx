/**
 * 페이지 template 컴포넌트
 *
 * @author RWB
 * @since 2024.04.03 Wed 09:07:11
 */

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { PropsWithChildren } from 'react';

import AppNavigation from '../../organism/AppNavigation';
import Toolbar from '../../organism/Toolbar';

export interface PageTemplateProps extends PropsWithChildren
{
	/**
	 * 타이틀
	 */
	title: string;

	/**
	 * 버전
	 */
	version: string;
}

/**
 * 페이지 template 컴포넌트 반환 메서드
 *
 * @param {PageTemplateProps} param0: PageTemplateProps
 *
 * @returns {JSX.Element} JSX
 */
export default function PageTemplate({ title, version, children }: PageTemplateProps): JSX.Element
{
	return (
		<Stack component='main' data-component='PageTemplate' height='100vh'>
			<Stack>
				<AppNavigation
					title={title}
					version={version}
				/>
			</Stack>

			<Toolbar />

			<Box height='100%'>
				{children}
			</Box>
		</Stack>
	);
}