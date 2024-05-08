/**
 * 프로젝트 그리드 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.05.04 Sat 13:18:39
 */

import Grid from '@mui/material/Grid';

import ProjectGridTile from './sub/ProjectGridTile/ProjectGridTile';

import { MarkdownHeaderProps } from '../../common';

export interface ProjectGridProps
{
	/**
	 * 리스트
	 */
	list: MarkdownHeaderProps[];
}

/**
 * 프로젝트 그리드 organism 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function ProjectGrid({ list }: ProjectGridProps): JSX.Element
{
	return (
		<Grid data-component='ProjectGrid' spacing={1} container>
			{list.map((project) => (
				<Grid key={project.title} md={3} sm={4} xs={6} item>
					<ProjectGridTile project={project} />
				</Grid>
			))}
		</Grid>
	);
}