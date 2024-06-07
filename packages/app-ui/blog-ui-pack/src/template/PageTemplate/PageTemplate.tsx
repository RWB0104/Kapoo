/**
 * 페이지 template 컴포넌트
 *
 * @author RWB
 * @since 2024.04.03 Wed 09:07:11
 */

import Footer from '@kapoo/ui-pack/molecule/Footer';
import Box from '@mui/material/Box';
import pgk from 'package.json';
import { PropsWithChildren } from 'react';

import AppNavigation from '../../organism/AppNavigation/AppNavigation';
import FooterTemplate from '../FooterTemplate';

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
		<Box component='main' data-component='PageTemplate'>
			<AppNavigation
				title={title}
				version={pgk.version}
			/>

			{children}

			<Footer mainColor='#6fb1fc'>
				<FooterTemplate title={title} version={version} />
			</Footer>
		</Box>
	);
}