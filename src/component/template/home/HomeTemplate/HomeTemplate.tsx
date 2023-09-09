/**
 * 홈 template 컴포넌트
 *
 * @author RWB
 * @since 2023.09.03 Sun 12:22:46
 */

import BusinessCard from '@kapoo/organism/home/BusinessCard';
import HomeNewistMarkdownTemplate from '@kapoo/template/home/HomeNewistMarkdownTemplate';
import HomePopularPostsTemplate from '@kapoo/template/home/HomePopularPostsTemplate';
import HomePopularProjectsTemplate from '@kapoo/template/home/HomePopularProjectsTemplate';
import HomeScreenerTemplate from '@kapoo/template/home/HomeScreenerTemplate';
import HomeWelcomeTemplate from '@kapoo/template/home/HomeWelcomeTemplate';

import Stack from '@mui/material/Stack';
import { ReactNode } from 'react';

/**
 * 홈 template 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function HomeTemplate(): ReactNode
{
	return (
		<Stack alignItems='center' data-component='HomeTemplate' spacing={10}>
			<HomeScreenerTemplate />
			<HomeWelcomeTemplate />
			<HomeNewistMarkdownTemplate />
			<HomePopularPostsTemplate />
			<HomePopularProjectsTemplate />
			<BusinessCard />
		</Stack>
	);
}