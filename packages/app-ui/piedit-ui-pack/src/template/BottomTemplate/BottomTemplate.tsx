/**
 * 하단 template 컴포넌트
 *
 * @author RWB
 * @since 2024.09.08 Sun 04:15:15
 */

import { author } from '@kapoo/common';
import Email from '@mui/icons-material/Email';
import GitHub from '@mui/icons-material/GitHub';
import Home from '@mui/icons-material/Home';
import LinkedIn from '@mui/icons-material/LinkedIn';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export interface BottomTemplateProps
{
	/**
	 * 버전
	 */
	version: string;
}

/**
 * 하단 template 컴포넌트 반환 메서드
 *
 * @param {BottomTemplateProps} param0: BottomTemplateProps
 *
 * @returns {JSX.Element} JSX
 */
export default function BottomTemplate({ version }: BottomTemplateProps): JSX.Element
{
	return (
		<Stack alignItems='center' data-component='BottomTemplate' direction='row' gap={1} justifyContent='space-between' paddingX={2} paddingY={1}>

			<Stack direction='row' gap={1}>
				<Link href='https://itcode.dev' target='_blank'>
					<IconButton size='small'>
						<Home />
					</IconButton>
				</Link>

				<Link href={author.social.github.link} target='_blank'>
					<IconButton size='small'>
						<GitHub />
					</IconButton>
				</Link>

				<Link href={author.social.linkedin.link} target='_blank'>
					<IconButton size='small'>
						<LinkedIn />
					</IconButton>
				</Link>

				<Link href={`mailto:${author.email}`} target='_blank'>
					<IconButton size='small'>
						<Email />
					</IconButton>
				</Link>
			</Stack>

			<Typography color='GrayText' variant='caption'>v{version}</Typography>

		</Stack>
	);
}