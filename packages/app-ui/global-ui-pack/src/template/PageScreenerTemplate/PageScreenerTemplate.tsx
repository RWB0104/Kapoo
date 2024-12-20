/**
 * 페이지 스크리너 template 컴포넌트
 *
 * @author RWB
 * @since 2024.04.29 Mon 00:25:04
 */

import BaseScreenerTemplate from '@kapoo/ui-pack/template/BaseScreenerTemplate';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import { CSSProperties } from 'react';

import styles from './PageScreenerTemplate.module.scss';

const cn = classNames.bind(styles);

export interface PageScreenerTemplateProps
{
	/**
	 * 제목
	 */
	title: string;

	/**
	 * 부제목
	 */
	subtitle: string;

	/**
	 * 텍스트
	 */
	text: string;

	/**
	 * 색상
	 */
	color?: CSSProperties['color'];
}

/**
 * 페이지 스크리너 template 컴포넌트 반환 메서드
 *
 * @param {PageScreenerTemplateProps} param0: PageScreenerTemplateProps
 *
 * @returns {JSX.Element} JSX
 */
export default function PageScreenerTemplate({ title, subtitle, text, color }: PageScreenerTemplateProps): JSX.Element
{
	return (
		<BaseScreenerTemplate className={cn('root')}>
			<Stack
				alignItems='center'
				height='100%'
				justifyContent='center'
				padding={2}
				width='100%'
			>
				<Stack direction='row'>
					<Box bgcolor={color} boxShadow='0px 0px 5px black' height='100%' width={5} />

					<Stack
						color='white'
						paddingLeft={2}
						paddingRight={2}
					>
						<Typography className={cn('text')} fontWeight='bold' variant='h5'>{title}</Typography>
						<Typography className={cn('text')} fontWeight='bold'>{subtitle}</Typography>
						<Typography className={cn('text')} color={color} fontWeight='bold'>{text}</Typography>
					</Stack>
				</Stack>
			</Stack>
		</BaseScreenerTemplate>
	);
}