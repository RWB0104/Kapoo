/**
 * 개발 스택 그리드 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.05.03 Fri 17:24:45
 */

import { DevStackItem } from '@kapoo/api';
import Grid from '@mui/material/Grid';

import DevStackGridTile from './sub/DevStackGridTile';

export interface DevStackGridProps
{
	/**
	 * 개발 스택 리스트
	 */
	list: DevStackItem[];
}

/**
 * 개발 스택 그리드 organism 컴포넌트 반환 메서드
 *
 * @param {DevStackGridProps} param0: DevStackGridProps
 *
 * @returns {JSX.Element} JSX
 */
export default function DevStackGrid({ list }: DevStackGridProps): JSX.Element
{
	return (
		<Grid data-component='DevStackGrid' spacing={1} container>
			{list.map(({ icon, name }) => (
				<Grid key={name} md={3} sm={4} xs={6} item>
					<DevStackGridTile image={icon} name={name} />
				</Grid>
			))}
		</Grid>
	);
}