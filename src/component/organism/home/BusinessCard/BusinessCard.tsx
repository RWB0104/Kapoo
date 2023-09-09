/**
 * 명함 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.09.04 Mon 01:35:27
 */

'use client';

import Logo from '@kapoo/atom/Logo';
import { APP_INFO, AUTHOR } from '@kapoo/env';

import Email from '@mui/icons-material/Email';
import GitHub from '@mui/icons-material/GitHub';
import LinkedIn from '@mui/icons-material/LinkedIn';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import Link from 'next/link';

import styles from './BusinessCard.module.scss';

const cn = classNames.bind(styles);

/**
 * 명함 organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function BusinessCard(): JSX.Element
{
	const { palette: { background: { default: defaultBackground } } } = useTheme();

	return (
		<motion.div
			initial={{ opacity: 0, translateY: 50 }}
			transition={{ duration: 1 }}
			viewport={{ once: true }}
			whileInView={{ opacity: 1, translateY: 0 }}
		>
			<Box
				borderRadius={2}
				boxShadow='3px 3px 10px black'
				className={cn('card')}
				data-component='BusinessCard'
				height={380}
				maxWidth={280}
				padding={0.5}
				width='100%'
			>
				<Box bgcolor={defaultBackground} borderRadius={2} height='100%' padding={2}>
					<Stack height='100%' justifyContent='space-between' width='100%'>
						<Stack alignItems='center' direction='row' justifyContent='space-between' width='100%'>
							<Typography className={cn('text')} fontWeight='bold' variant='h4'>{AUTHOR.nickname}</Typography>

							<Logo size={42} />
						</Stack>

						<Stack spacing={1}>
							<Typography className={cn('text')} fontWeight='bold'>{APP_INFO.title}</Typography>

							<Stack alignItems='center' direction='row' spacing={1}>
								<img alt='홈페이지' height={24} src='https://itcode.dev/logo.png' width={24} />

								<Link href='https://itcode.dev'>
									<Typography>홈페이지</Typography>
								</Link>
							</Stack>

							<Stack alignItems='center' direction='row' spacing={1}>
								<Email />

								<Link href={`mailto:${AUTHOR.email}`}>
									<Typography>{AUTHOR.email}</Typography>
								</Link>
							</Stack>

							<Stack alignItems='center' direction='row' spacing={1}>
								<GitHub />

								<Link href={AUTHOR.social.github.link} target='_blank'>
									<Typography>{AUTHOR.social.github.name}</Typography>
								</Link>
							</Stack>

							<Stack alignItems='center' direction='row' spacing={1}>
								<LinkedIn />

								<Link href={AUTHOR.social.linkedin.link} target='_blank'>
									<Typography>{AUTHOR.social.linkedin.name}</Typography>
								</Link>
							</Stack>
						</Stack>
					</Stack>
				</Box>
			</Box>
		</motion.div>
	);
}