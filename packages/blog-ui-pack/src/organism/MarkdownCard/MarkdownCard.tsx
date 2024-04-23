/**
 * 마크다운 카드 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.11 Thu 12:20:07
 */

import { calcDuring, colors, parseLocalDate } from '@kapoo/common';
import Img from '@kapoo/ui-pack/organism/Img';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { blue, green } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { MouseEventHandler } from 'react';

import styles from './MarkdownCard.module.scss';

import { MarkdownType } from '../../common';

const cn = classNames.bind(styles);

export interface MarkdownCardProps
{
	/**
	 * 마크다운 타입
	 */
	type: MarkdownType;

	/**
	 * 링크
	 */
	href: string;

	/**
	 * 타이틀
	 */
	title: string;

	/**
	 * 설명
	 */
	description: string;

	/**
	 * 카테고리
	 */
	category: string;

	/**
	 * 썸네일
	 */
	thumbnail: string;

	/**
	 * 태그
	 */
	tags: string[];

	/**
	 * 날짜
	 */
	timestamp: number;

	/**
	 * 클릭 이벤트 메서드
	 */
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * 마크다운 카드 organism 컴포넌트 반환 메서드
 *
 * @param {MarkdownCardProps} param0: MarkdownCardProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownCard({ type, href, title, description, category, thumbnail, tags, timestamp, onClick }: MarkdownCardProps): JSX.Element
{
	const { year, month, date, hour, minute, second, weekday } = parseLocalDate(timestamp);

	const dateText = `${year.text}-${month.text}-${date.text} (${weekday.text}) ${hour.text}:${minute.text}:${second.text}`;
	const during = calcDuring(timestamp);

	const color = type === 'posts' ? blue[500] : green[500];

	return (
		<Box
			borderRadius={1}
			boxShadow={`0px 0px 10px ${colors.shadow.default}`}
			className={cn('card')}
			data-component='MarkdownCard'
			height='100%'
			overflow='hidden'
			width='100%'
		>
			<ButtonBase className={cn('button')} onClick={onClick}>
				<Link className={cn('button')} href={href} title={title}>
					<Stack height='100%' width='100%'>
						<Box className={cn('thumbnail')} position='relative'>
							<Img
								src={thumbnail}
								containerProps={{
									height: '100%',
									left: 0,
									overflow: 'hidden',
									position: 'absolute',
									top: 0,
									width: '100%'
								}}
							/>
						</Box>

						<Stack flex={1} gap={2} padding={2}>
							<Stack alignItems='center' direction='row' gap={1}>
								<Img
									alt={category}
									height={24}
									src={`https://datastore.itcode.dev/blog/category/${category}.png`}
									width={24}
									containerProps={{
										borderRadius: '50%',
										overflow: 'hidden'
									}}
								/>

								<Typography component='span' variant='caption'>{category}</Typography>
							</Stack>

							<Stack gap={1} height='100%'>
								<Typography fontWeight='bold' textAlign='start'>{title}</Typography>

								<Typography className={cn('description')} color='GrayText' textAlign='start' variant='caption'>{description}</Typography>
							</Stack>

							<Stack direction='row' flexWrap='wrap' gap={1} width='100%'>
								{tags.map((i) => (
									<Stack border='1px solid' borderColor={color} borderRadius={100} key={i} paddingLeft={1} paddingRight={1}>
										<Typography color={color} variant='caption'># {i}</Typography>
									</Stack>
								))}
							</Stack>

							<Stack alignItems='center' direction='row' justifyContent='space-between'>
								<Typography color='GrayText' variant='caption'>{dateText}</Typography>

								<Typography color='GrayText' variant='caption'>{during}</Typography>
							</Stack>
						</Stack>
					</Stack>
				</Link>
			</ButtonBase>
		</Box>
	);
}