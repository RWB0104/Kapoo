/**
 * 뷰 프로그레스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.09.01 Fri 23:45:35
 */

'use client';

import { MarkdownType } from '@kapoo/util/markdown';

import Box from '@mui/material/Box';
import classNames from 'classnames/bind';
import { useScroll, motion } from 'framer-motion';
import { ReactNode } from 'react';

import styles from './ViewProgress.module.scss';

const cn = classNames.bind(styles);

export interface ViewProgressProps
{
	/**
	 * 마크다운 타입
	 */
	type: MarkdownType;
}

/**
 * 뷰 프로그레스 organism 컴포넌트 JSX 반환 메서드
 *
 * @param {ViewProgressProps} param0: ViewProgressProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewProgress({ type }: ViewProgressProps): ReactNode
{
	const { scrollYProgress } = useScroll();

	return (
		<Box
			data-component='ViewProgress'
			height={3}
			left={0}
			position='fixed'
			top={0}
			width='100%'
			zIndex={10000}
		>
			<motion.div className={cn('progress', type)} style={{ scaleX: scrollYProgress }} />
		</Box>
	);
}