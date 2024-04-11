/**
 * 마크다운 카테고리 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.11 Thu 17:56:40
 */

import Tile from '@kapoo/ui-pack/atom/Tile';
import Img from '@kapoo/ui-pack/organism/Img';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCallback } from 'react';

export interface MarkdownCategoryItem
{
	/**
	 * 라벨
	 */
	label: string;

	/**
	 * 카운트
	 */
	count: number;

	/**
	 * 선택 여부
	 */
	selected?: boolean;
}

export interface MarkdownCategoryProps
{
	/**
	 * 카테고리
	 */
	categories: MarkdownCategoryItem[];
}

/**
 * 마크다운 카테고리 organism 컴포넌트 반환 메서드
 *
 * @param {MarkdownCategoryProps} param0: MarkdownCategoryProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownCategory({ categories }: MarkdownCategoryProps): JSX.Element
{
	const handleClick = useCallback((label: string) =>
	{
		const urlParams = new URLSearchParams(window.location.search);
	}, []);

	return (
		<Accordion data-component='MarkdownCategory'>
			<AccordionSummary expandIcon={<ExpandMore />}>
				<Stack>
					<Typography># 카테고리</Typography>
				</Stack>
			</AccordionSummary>

			<AccordionDetails>
				<Grid container>
					{categories.map(({ label, count, selected }) => (
						<Grid key={label} md={2} sm={3} xs={4} item>
							<Tile>
								<ButtonBase
									sx={{
										height: '100%',
										position: 'absolute',
										width: '100%'
									}}
									onClick={() => handleClick(label)}
								>
									<Box height='100%' position='absolute' width='100%'>
										<Img
											height='100%'
											src={`https://datastore.itcode.dev/blog/category/${encodeURIComponent(label)}.png`}
											width='100%'
										/>
									</Box>

									<Stack
										height='100%'
										justifyContent='space-between'
										left={0}
										position='absolute'
										top={0}
										width='100%'
									>
										{label}
										{count}
									</Stack>
								</ButtonBase>
							</Tile>
						</Grid>
					))}
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
}