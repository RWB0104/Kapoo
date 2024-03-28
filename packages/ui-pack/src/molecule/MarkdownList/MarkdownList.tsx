/**
 * 마크다운 리스트 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.09.10 Sun 03:54:57
 */

import LottieIcon from '@kapoo/atom/LottieIcon';
import MarkdownListItem from '@kapoo/molecule/MarkdownListItem';
import { getNewist } from '@kapoo/util/common';
import { MarkdownListItemProps } from '@kapoo/util/markdown';

import Box from '@mui/material/Box';
import Grid, { GridProps } from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Variants, motion } from 'framer-motion';
import { MouseEventHandler, ReactNode } from 'react';

export interface MarkdownListProps extends GridProps
{
	/**
	 * 마크다운 리스트
	 */
	markdown?: MarkdownListItemProps[];

	/**
	 * 카드 클릭 이벤트 메서드
	 */
	onCardClick?: MouseEventHandler<HTMLAnchorElement>;
}

/**
 * 마크다운 리스트 molecule 컴포넌트 JSX 반환 메서드
 *
 * @param {MarkdownListProps} param0: MarkdownListProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function MarkdownList({ markdown = [], onCardClick, ...props }: MarkdownListProps): ReactNode
{
	const variants: Variants = {
		initial: {
			opacity: 0,
			translateY: 50
		},
		view: {
			opacity: 1,
			translateY: 0
		}
	};

	return (
		<Box data-component='MarkdownList'>
			<Grid spacing={4} container {...props}>
				{markdown.length > 0 ? markdown.map(({ frontmatter, url }) => (
					<Grid key={url} lg={4} sm={6} xs={12} item>
						<motion.div
							className='fullheight'
							initial='initial'
							transition={{ duration: 1 }}
							variants={variants}
							viewport={{ amount: 0.3, once: true }}
							whileInView='view'
						>
							<MarkdownListItem
								category={frontmatter.category}
								date={frontmatter.date}
								excerpt={frontmatter.excerpt}
								href={url}
								newist={getNewist(frontmatter.date)}
								thumb={frontmatter.coverImage}
								title={frontmatter.title}
								type={frontmatter.type}
								onClick={onCardClick}
							/>
						</motion.div>
					</Grid>
				)) : (
					<Stack alignItems='center' spacing={2} width='100%'>
						<LottieIcon iconName='empty' width={180} />
						<Typography variant='h5'>표시할 항목이 없어요...</Typography>
					</Stack>
				)}
			</Grid>
		</Box>
	);
}