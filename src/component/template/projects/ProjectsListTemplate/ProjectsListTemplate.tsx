/**
 * 프로젝트 리스트 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.23 Wed 18:49:21
 */

import ProjectsListBox from '@kapoo/organism/projects/ProjectsListBox';

import Container from '@mui/material/Container';
import { ReactNode } from 'react';

/**
 * 프로젝트 리스트 박스 organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ProjectsListTemplate(): ReactNode
{
	return (
		<Container data-component='ProjectsListTemplate'>
			<ProjectsListBox />
		</Container>
	);
}