/**
 * 마크다운 스크리너 template 컴포넌트
 *
 * @author RWB
 * @since 2024.04.29 Mon 17:32:15
 */

import { parseLocalDate } from '@kapoo/common';
import BaseScreenerTemplate from '@kapoo/ui-pack/template/BaseScreenerTemplate';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import { CSSProperties } from 'react';

import styles from './MarkdownScreenerTemplate.module.scss';

import MarkdownShareBox from '../../organism/MarkdownShareBox';

const cn = classNames.bind(styles);

export interface MarkdownScreenerTemplateProps
{
	/**
	 * 제목
	 */
	title: string;

	/**
	 * 설명
	 */
	description: string;

	/**
	 * URL
	 */
	url: string;

	/**
	 * 시간
	 */
	timestamp: number;

	/**
	 * 색상
	 */
	color?: CSSProperties['color'];
}

/**
 * 마크다운 스크리너 template 컴포넌트 반환 메서드
 *
 * @param {MarkdownScreenerTemplateProps} param0: MarkdownScreenerTemplateProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownScreenerTemplate({ title, description, url, timestamp, color }: MarkdownScreenerTemplateProps): JSX.Element
{
	const { year, month, date, hour, minute, second, weekday } = parseLocalDate(timestamp);

	return (
		<BaseScreenerTemplate className={cn('root')}>
			<Stack
				alignItems='center'
				gap={2}
				height='100%'
				justifyContent='center'
				padding={2}
				width='100%'
			>
				<Stack
					borderLeft={`5px solid ${color}`}
					color='white'
					paddingLeft={2}
					paddingRight={2}
				>
					<Typography className={cn('text')} fontWeight='bold' variant='h4'>{title}</Typography>
					<Typography className={cn('text')}>{`${year.text}-${month.text}-${date.text} (${weekday.text}) ${hour.text}:${minute.text}:${second.text}`}</Typography>
				</Stack>

				<MarkdownShareBox
					direction='row'
					gap={2}
					shareData={{
						text: description,
						title,
						url
					}}
				/>
			</Stack>
		</BaseScreenerTemplate>
	);
}