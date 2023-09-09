/**
 * 마크다운 리스트 아이템 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.08.25 Fri 02:19:38
 */

import { themeStore } from '@kapoo/store/theme';
import { DAY_EPOCH, dateParse } from '@kapoo/util/common';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import Link, { LinkProps } from 'next/link';
import { ReactNode, useMemo } from 'react';

import styles from './MarkdownListItem.module.scss';

const cn = classNames.bind(styles);

export interface MarkdownListItemProps extends LinkProps
{
	/**
	 * 타이틀
	 */
	title: string;

	/**
	 * 요약
	 */
	excerpt: string;

	/**
	 * 썸네일
	 */
	thumb: string;

	/**
	 * 카테고리
	 */
	category: string;

	/**
	 * 날짜
	 */
	date: string;

	/**
	 * 신규 여부
	 */
	newist?: boolean;
}

/**
 * 마크다운 리스트 아이템 molecule 컴포넌트 JSX 반환 메서드
 *
 * @param {MarkdownListItemProps} param0: MarkdownListItemProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function MarkdownListItem({ title, excerpt, thumb, category, date, newist, ...props }: MarkdownListItemProps): ReactNode
{
	const { theme } = themeStore();

	const dateTime = useMemo(() =>
	{
		const { year, month, day, hour, minute, second } = dateParse(date);

		return `${year.text}-${month.text}-${day.text} ${hour.text}:${minute.text}:${second.text}`;
	}, [ date ]);

	const dateText = useMemo(() =>
	{
		const epoch = new Date(date).getTime();
		const now = new Date().getTime();

		const diff = now - epoch;

		// 하루가 지나지 않았을 경우
		if (diff < DAY_EPOCH)
		{
			return '방금 전';
		}

		// 2주 이내일 경우
		if (diff < DAY_EPOCH * 15)
		{
			return `${Math.round(diff / DAY_EPOCH)}일 전`;
		}

		// 1년 이내일 경우
		if (diff < DAY_EPOCH * 365)
		{
			return `${Math.round(diff / (DAY_EPOCH * 30))}달 전`;
		}

		return `${Math.round(diff / (DAY_EPOCH * 365))}년 전`;
	}, [ date ]);

	return (
		<Link className={cn('link', { dark: theme === 'dark' })} data-component='MarkdownListItem' {...props}>
			<Paper className={cn('item')} variant='outlined'>
				<ButtonBase className='fullwidth fullheight'>
					<Stack height='100%' width='100%'>
						<Box className={cn('thumb')} position='relative' width='100%'>
							<img alt={title} className={cn('image')} height='100%' src={thumb} width='100%' />
						</Box>

						<Stack alignItems='start' flex={1} justifyContent='start' padding={3} spacing={1}>
							<Stack alignItems='center' direction='row' justifyContent='space-between' spacing={1} width='100%'>
								<Stack alignItems='center' direction='row' spacing={1}>
									<Avatar
										alt={category}
										className={cn('category')}
										src={`https://datastore.itcode.dev/blog/category/${category}.png`}
									/>

									<Typography variant='caption'>{category}</Typography>
								</Stack>

								<Stack alignItems='center' direction='row' spacing={1}>
									{newist ? (
										<Box bgcolor='hotpink' borderRadius={1} padding='1px 10px'>
											<Typography color='white' fontSize={8}>NEW</Typography>
										</Box>
									) : null}
								</Stack>
							</Stack>

							<Box>
								<Typography fontWeight='bold' textAlign='start'>{title}</Typography>
							</Box>

							<Stack flex={1} paddingBottom={2}>
								<Typography className={cn('excerpt')} color='GrayText' textAlign='start' variant='caption'>{excerpt}</Typography>
							</Stack>

							<Stack alignItems='center' direction='row' justifyContent='space-between' width='100%'>
								<Typography color='GrayText' textAlign='start' variant='caption'>{dateTime}</Typography>

								<Typography color='GrayText' textAlign='start' variant='caption'>{dateText}</Typography>
							</Stack>
						</Stack>
					</Stack>
				</ButtonBase>
			</Paper>
		</Link>
	);
}