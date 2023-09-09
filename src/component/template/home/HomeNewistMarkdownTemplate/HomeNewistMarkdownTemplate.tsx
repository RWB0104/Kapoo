/**
 * 홈 신규 컨텐츠 template 컴포넌트
 *
 * @author RWB
 * @since 2023.09.10 Sun 03:56:35
 */

import HomeNewistBox from '@kapoo/organism/home/HomeNewistBox';

import Container from '@mui/material/Container';
import { ReactNode } from 'react';

export default function HomeNewistMarkdownTemplate(): ReactNode
{
	return (
		<Container data-component='HomePopularPostsTemplate'>
			<HomeNewistBox />
		</Container>
	);
}