import { calcDuring, parseLocalDate } from '@kapoo/common';
import Img from '@kapoo/ui-pack/organism/Img';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';

import styles from './Markdown.module.scss';

const cn = classNames.bind(styles);

export interface MarkdownCardProps
{
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
	 * 날짜
	 */
	timestamp: number;
}

export default function MarkdownCard({ href, title, description, category, thumbnail, timestamp }: MarkdownCardProps): JSX.Element
{
	const { year, month, date, hour, minute, second, weekday } = parseLocalDate(timestamp);

	const dateText = `${year.text}-${month.text}-${date.text} (${weekday.text}) ${hour.text}:${minute.text}:${second.text}`;
	const during = calcDuring(timestamp);

	return (
		<Box borderRadius={1} overflow='hidden'>
			<ButtonBase className='w-full' href={href}>
				<Stack width='100%'>
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

					<Stack gap={2} padding={1}>
						<Stack alignItems='center' direction='row' gap={1}>
							<Img
								alt={category}
								height={32}
								src={`https://datastore.itcode.dev/blog/category/${category}.png`}
								width={32}
								containerProps={{
									borderRadius: '50%',
									overflow: 'hidden'
								}}
							/>

							<Typography component='span'>{category}</Typography>
						</Stack>

						<Stack gap={1}>
							<Typography fontWeight='bold'>{title}</Typography>

							<Typography color='GrayText' variant='caption'>{description}</Typography>
						</Stack>

						<Stack alignItems='center' direction='row' justifyContent='space-between'>
							<Typography color='GrayText' variant='caption'>{dateText}</Typography>

							<Typography color='GrayText' variant='caption'>{during}</Typography>
						</Stack>
					</Stack>
				</Stack>
			</ButtonBase>
		</Box>
	);
}