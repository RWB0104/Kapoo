/**
 * 뷰 프로그레스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.09.01 Fri 23:45:35
 */

'use client';

import { viewStore } from '@kapoo/store/markdown';

import Box from '@mui/material/Box';
import classNames from 'classnames/bind';
import { useScroll, motion } from 'framer-motion';
import { ReactNode } from 'react';

import styles from './ViewProgress.module.scss';

const cn = classNames.bind(styles);

/**
 * 뷰 프로그레스 organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewProgress(): ReactNode
{
	const { view } = viewStore();
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
			<motion.div className={cn('progress', view?.frontmatter.type)} style={{ scaleX: scrollYProgress }} />
		</Box>
	);
}