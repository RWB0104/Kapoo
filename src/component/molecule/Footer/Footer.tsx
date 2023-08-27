/**
 * 푸터 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.08.28 Mon 01:53:33
 */

'use client';

import Hits from '@kapoo/atom/Hits';
import LinkIconButton from '@kapoo/atom/LinkIconButton';
import { APP_INFO, AUTHOR } from '@kapoo/env';
import pkg from '@kapoo/package';

import Copyright from '@mui/icons-material/Copyright';
import GitHub from '@mui/icons-material/GitHub';
import Google from '@mui/icons-material/Google';
import IntegrationInstructions from '@mui/icons-material/IntegrationInstructions';
import LinkedIn from '@mui/icons-material/LinkedIn';
import RssFeed from '@mui/icons-material/RssFeed';
import Schema from '@mui/icons-material/Schema';
import Terminal from '@mui/icons-material/Terminal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

/**
 * 푸터 molecule 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function Footer(): ReactNode
{
	return (
		<Box component='footer' data-component='Footer' padding={4} paddingTop={10}>
			<Stack spacing={10}>
				<Stack alignItems='center' direction='row' justifyContent='center' spacing={2}>
					<LinkIconButton link='https://github.com/RWB0104' tooltip='GitHub 프로필'>
						<GitHub />
					</LinkIconButton>

					<LinkIconButton link={`mailto:${AUTHOR.email}`} tooltip={AUTHOR.email}>
						<Google />
					</LinkIconButton>

					<LinkIconButton link='https://www.linkedin.com/in/itcode/' tooltip='LinkedIn'>
						<LinkedIn />
					</LinkIconButton>

					<LinkIconButton link='/sitemap.xml' tooltip='Sitemap XML'>
						<Schema />
					</LinkIconButton>

					<LinkIconButton link='/rss.xml' tooltip='RSS XML'>
						<RssFeed />
					</LinkIconButton>
				</Stack>

				<Stack spacing={3}>
					<Stack alignItems='center' justifyContent='center' spacing={1}>
						<Typography fontWeight='bold' textAlign='center' variant='h5'>{APP_INFO.title}</Typography>
						<Typography color='GrayText' variant='caption'>v{pkg.version}</Typography>
					</Stack>

					<Stack alignItems='center' justifyContent='center' spacing={1}>
						<Stack alignItems='center' direction='row' justifyContent='center' spacing={1}>
							<Copyright color='primary' />
							<Typography>Copyright. All rights reserved.</Typography>
						</Stack>

						<Stack alignItems='center' direction='row' justifyContent='center' spacing={1}>
							<Terminal color='warning' />
							<Typography>Developed by {AUTHOR.nickname} since 2021.05</Typography>
						</Stack>

						<Stack alignItems='center' direction='row' justifyContent='center' spacing={1}>
							<IntegrationInstructions color='error' />
							<Typography>4th Upgraded at 2023.08</Typography>
						</Stack>
					</Stack>

					<Stack direction='row' justifyContent='center'>
						<Hits
							countBgcolor='#222222'
							icon='react.svg'
							iconColor='#00d8ff'
							text='views'
							titleBgcolor='#333333'
							unique='https://blog.itcode.dev'
						/>
					</Stack>
				</Stack>
			</Stack>
		</Box>
	);
}