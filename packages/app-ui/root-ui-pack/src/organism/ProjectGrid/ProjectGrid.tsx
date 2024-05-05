/**
 * 프로젝트 그리드 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.05.04 Sat 13:18:39
 */

import Grid from '@mui/material/Grid';

import ProjectGridTile, { ProjectGridTileProps } from './sub/ProjectGridTile/ProjectGridTile';

export interface ProjectGridProps
{
	/**
	 * 리스트
	 */
	list: ProjectGridTileProps[];
}

/**
 * 프로젝트 그리드 organism 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function ProjectGrid({ list }: ProjectGridProps): JSX.Element
{
	return (
		<Grid data-component='ProjectGrid'>
			{list.map((props) => <ProjectGridTile key={props.name} {...props} />)}
		</Grid>
	);
}