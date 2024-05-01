/**
 * 마크다운 그리드 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.11 Thu 02:11:51
 */

'use client';

import { refererStore, themeStore } from '@kapoo/state';
import DotLottieIcon from '@kapoo/ui-pack/atom/DotLottieIcon/DotLottieIcon';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { motion } from 'framer-motion';
import { MouseEventHandler, useCallback } from 'react';

import { BlogMarkdownDetailProps, MarkdownHeaderProps } from '../../common';
import MarkdownCard from '../MarkdownCard';

export interface MarkdownGridProps
{
	/**
	 * 리스트
	 */
	list: BlogMarkdownDetailProps<MarkdownHeaderProps>[];

	/**
	 * 리퍼러 비활성화 여부
	 */
	disabledReferer?: boolean;
}

/**
 * 마크다운 그리드 organism 컴포넌트 반환 메서드
 *
 * @param {MarkdownGridProps} param0: MarkdownGridProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownGrid({ list, disabledReferer }: MarkdownGridProps): JSX.Element
{
	const { themeState } = themeStore();
	const { setRefererState } = refererStore();

	const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(() =>
	{
		sessionStorage.setItem('scroll', `${window.scrollY}`);

		// 리퍼러가 활성화된 경우
		if (!disabledReferer)
		{
			setRefererState(window.location.search);
		}
	}, [ disabledReferer ]);

	return (
		<Grid data-component='MarkdownGrid' spacing={4} container>
			{list.length === 0 ? (
				<Grid xs={12} item>
					<Stack alignItems='center' justifyContent='center' width='100%'>
						<DotLottieIcon iconName='empty-file' maxWidth={200} width='100%' />
					</Stack>
				</Grid>
			) : null}

			{list.length > 0 ? list.map(({ meta, url }) => (
				<Grid key={url} md={4} sm={6} xs={12} item>
					<motion.div
						className='h-full'
						initial={{ opacity: 0, translateY: '20px' }}
						transition={{ duration: 1 }}
						viewport={{ amount: 0.5, once: true }}
						whileInView={{ opacity: 1, translateY: '0px' }}
					>
						<MarkdownCard
							category={meta.category}
							description={meta.excerpt}
							href={url}
							tags={meta.tag}
							theme={themeState}
							thumbnail={meta.coverImage}
							timestamp={meta.date}
							title={meta.title}
							type={meta.type}
							onClick={handleClick}
						/>
					</motion.div>
				</Grid>
			)) : null}
		</Grid>
	);
}