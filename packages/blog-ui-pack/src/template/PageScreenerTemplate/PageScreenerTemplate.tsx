/**
 * 페이지 스크리너 template 컴포넌트
 *
 * @author RWB
 * @since 2024.04.29 Mon 00:25:04
 */

import BaseScreenerTemplate from '@kapoo/ui-pack/template/BaseScreenerTemplate';
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
	 * 테두리 색상
	 */
	borderColor?: CSSProperties['borderColor'];
}

/**
 * 페이지 스크리너 template 컴포넌트 반환 메서드
 *
 * @param {PageScreenerTemplateProps} param0: PageScreenerTemplateProps
 *
 * @returns {JSX.Element} JSX
 */
export default function PageScreenerTemplate({ title, subtitle, borderColor }: PageScreenerTemplateProps): JSX.Element
{
	return (
		<BaseScreenerTemplate className={cn('root')}>
			<Stack
				alignItems='center'
				height='100%'
				justifyContent='center'
				width='100%'
			>
				<Stack
					borderColor={borderColor}
					borderLeft='5px solid'
					color='white'
					gap={1}
					paddingLeft={2}
					paddingRight={2}
				>
					<Typography fontWeight='bold' variant='h4'>{title}</Typography>

					<Typography fontWeight='bold' variant='h6'>{subtitle}</Typography>
				</Stack>
			</Stack>
		</BaseScreenerTemplate>
	);
}