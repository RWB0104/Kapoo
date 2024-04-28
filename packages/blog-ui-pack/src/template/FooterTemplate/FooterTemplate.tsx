/**
 * 푸터 template 컴포넌트
 *
 * @author RWB
 * @since 2024.04.29 Mon 00:05:32
 */

import CodeIcon from '@mui/icons-material/Code';
import GitHub from '@mui/icons-material/GitHub';
import Google from '@mui/icons-material/Google';
import LinkedIn from '@mui/icons-material/LinkedIn';
import RssFeed from '@mui/icons-material/RssFeed';
import Schema from '@mui/icons-material/Schema';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import pgk from 'package.json';

import FooterLinkButton from './sub/FooterLinkButton';

export interface FooterTemplateProps
{
	/**
	 * 타이틀
	 */
	title: string;
}

/**
 * 푸터 template 컴포넌트 반환 메서드
 *
 * @param {FooterTemplateProps} param0: FooterTemplateProps
 *
 * @returns {JSX.Element} JSX
 */
export default function FooterTemplate({ title }: FooterTemplateProps): JSX.Element
{
	return (
		<Stack alignItems='center' color='white' data-component='FooterTemplate' gap={2} padding={4}>
			<Stack alignItems='center' color='white'>
				<Typography fontWeight='bold' variant='h6'>{title}</Typography>
				<Typography variant='caption'>{pgk.version}</Typography>
			</Stack>

			<Box display='grid' gap={2} gridTemplateColumns='1fr 1fr 1fr'>
				<FooterLinkButton link='https://itcode.dev'>
					<img alt='itcode.dev' height='100%' src='https://itcode.dev/logo-transparent.png' width='100%' />
				</FooterLinkButton>

				<FooterLinkButton link='https://github.com/RWB0104'>
					<GitHub />
				</FooterLinkButton>

				<FooterLinkButton link='mailto:psj2716@mensakorea.org'>
					<Google />
				</FooterLinkButton>

				<FooterLinkButton link='https://www.linkedin.com/in/itcode/'>
					<LinkedIn />
				</FooterLinkButton>

				<FooterLinkButton link='/sitemap.xml'>
					<Schema />
				</FooterLinkButton>

				<FooterLinkButton link='/rss.xml'>
					<RssFeed />
				</FooterLinkButton>
			</Box>

			<Stack alignItems='center' color='white'>
				<Stack alignItems='center' direction='row' gap={0.5}>
					<CodeIcon fontSize='inherit' htmlColor='darkblue' />
					<Typography variant='caption'>Developed by RWB since 2021.05</Typography>
				</Stack>

				<Stack alignItems='center' direction='row' gap={0.5}>
					<UpgradeIcon fontSize='inherit' htmlColor='crimson' />
					<Typography variant='caption'>5th upgraded at 2024.05</Typography>
				</Stack>
			</Stack>
		</Stack>
	);
}