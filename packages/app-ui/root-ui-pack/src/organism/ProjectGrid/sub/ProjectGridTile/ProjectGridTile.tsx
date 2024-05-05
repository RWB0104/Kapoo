/**
 * 프로젝트 그리드 타일 서브 컴포넌트
 *
 * @author RWB
 * @since 2024.05.05 Sun 02:25:55
 */

import Tile from '@kapoo/ui-pack/atom/Tile';
import Img from '@kapoo/ui-pack/organism/Img';
import { Box, Typography } from '@mui/material';
import Stack, { StackProps } from '@mui/material/Stack';

export interface ProjectGridTileProps extends StackProps
{
	/**
	 * 아이디
	 */
	idx: string;

	/**
	 * 제목
	 */
	name: string;

	/**
	 * 아이콘
	 */
	icon: string;

	/**
	 * 제작자
	 */
	author: string;

	/**
	 * 시작일자
	 */
	startDate: number;

	/**
	 * 종료일자
	 */
	endDate?: number;

	/**
	 * 썸네일
	 */
	thumbnail: string;
}

export default function ProjectGridTile({ idx, name, icon, author, startDate, endDate, thumbnail, ...props }: ProjectGridTileProps): JSX.Element
{
	return (
		<Stack data-component='ProjectGridTileProps' {...props}>
			<Stack direction='row'>
				<Img height={40} src={icon} width={40} />

				<Stack>
					<Typography>{name}</Typography>

					<Stack direction='row' justifyContent='space-between'>
						<Typography color='GrayText' variant='caption'>{author}</Typography>
						<Typography>{name}</Typography>
					</Stack>
				</Stack>
			</Stack>

			<Tile>
				<Box left={0} position='absolute' top={0}>
					<Img src={thumbnail} />
				</Box>
			</Tile>
		</Stack>
	);
}