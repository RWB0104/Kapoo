/**
 * 마크다운 그룹 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.15 Mon 02:25:29
 */

import Img from '@kapoo/ui-pack/organism/Img';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import { BlogMarkdownDetailGroupProps } from '../../common';

export interface MarkdownGroupProps
{
	/**
	 * 그룹명
	 */
	title: string;

	/**
	 * 현재
	 */
	current?: string;

	/**
	 * 썸네일
	 */
	thumbnail: string;

	/**
	 * 그룹 리스트
	 */
	groups: BlogMarkdownDetailGroupProps[];
}

/**
 * 마크다운 그룹 organism 컴포넌트 반환 메서드
 *
 * @param {MarkdownGroupProps} param0: MarkdownGroupProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownGroup({ title, current, thumbnail, groups }: MarkdownGroupProps): JSX.Element
{
	const currentIndex = groups.length - groups.findIndex(({ url }) => url === current);

	return (
		<Stack data-component='MarkdownGroup' width='100%'>
			<Box height='100%' minHeight={150} position='relative' width='100%'>
				<Box height='100%' left={0} position='absolute' top={0} width='100%'>
					<Img height='100%' src={thumbnail} width='100%' />
				</Box>

				<Stack
					alignItems='center'
					bgcolor='#00000070'
					gap={1}
					height='100%'
					justifyContent='center'
					padding={1}
					position='absolute'
					width='100%'
				>
					<Typography color='white' variant='caption'>시리즈 모아보기</Typography>
					<Typography color='dodgerblue' fontWeight='bold'>{title}</Typography>
					<Typography color='white'>{currentIndex} / {groups.length}</Typography>
				</Stack>
			</Box>

			<Stack paddingLeft={2} paddingRight={2}>
				<Box component='ul'>
					{groups.map(({ title, url }) => (
						<Box component='li' key={url}>
							<Link href={url}>
								<Typography color={url === current ? 'primary' : undefined} variant='caption'>{title}</Typography>
							</Link>
						</Box>
					))}
				</Box>
			</Stack>
		</Stack>
	);
}