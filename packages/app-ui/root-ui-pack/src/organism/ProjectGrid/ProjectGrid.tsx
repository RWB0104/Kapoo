/**
 * 프로젝트 그리드 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.05.04 Sat 13:18:39
 */

import { MarkdownDetailProps } from '@kapoo/markdown-kit';
import Grid from '@mui/material/Grid';

import ProjectGridTile, { ProjectGridTileProps } from './sub/ProjectGridTile';

import { MarkdownHeaderProps, getId } from '../../common';

export interface ProjectGridProps
{
	/**
	 * 타입
	 */
	mode: ProjectGridTileProps['mode'];

	/**
	 * 리스트
	 */
	list: MarkdownDetailProps<MarkdownHeaderProps>[];
}

/**
 * 프로젝트 그리드 organism 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function ProjectGrid({ mode, list }: ProjectGridProps): JSX.Element
{
	return (
		<Grid data-component='ProjectGrid' spacing={1} container>
			{list.map(({ filename, meta }) => (
				<Grid key={filename} md={3} sm={4} xs={6} item>
					<ProjectGridTile mode={mode} project={meta} unique={getId(filename)} />
				</Grid>
			))}
		</Grid>
	);
}