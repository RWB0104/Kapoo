/**
 * 홈 인기 리스트 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.09.03 Sun 23:24:42
 */

import MarkdownListItem from '@kapoo/molecule/MarkdownListItem';
import { MarkdownListItemProps } from '@kapoo/util/markdown';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Variants, motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface HomePopularListProps
{
	/**
	 * 마크다운 리스트
	 */
	markdown: MarkdownListItemProps[];
}

/**
 * 홈 인기 리스트 organism 컴포넌트 JSX 반환 메서드
 *
 * @param {HomePopularListProps} param0: HomePopularListProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function HomePopularList({ markdown }: HomePopularListProps): ReactNode
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
		<Box data-component='HomePopularList'>
			<Grid spacing={4} container>
				{markdown.map(({ frontmatter, url }) => (
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
								thumb={frontmatter.coverImage}
								title={frontmatter.title}
							/>
						</motion.div>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}