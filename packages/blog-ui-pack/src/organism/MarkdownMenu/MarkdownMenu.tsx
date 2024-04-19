/**
 * 마크다운 메뉴 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.15 Mon 15:18:47
 */

'use client';

import { refererStore } from '@kapoo/state';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Menu from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Link from 'next/link';

import MarkdownMenuSideCard from './sub/MarkdownMenuSideCard';

import { BlogMarkdownDetailSideProps, MarkdownType } from '../../common';

export interface MarkdownMenuProps
{
	/**
	 * 마크다운 타입
	 */
	type: MarkdownType;

	/**
	 * 이전 페이지
	 */
	prev?: BlogMarkdownDetailSideProps;

	/**
	 * 다음 페이지
	 */
	next?: BlogMarkdownDetailSideProps;
}

/**
 * 마크다운 메뉴 organism 컴포넌트 반환 메서드
 *
 * @param {MarkdownMenuProps} param0: MarkdownMenuProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownMenu({ type, prev, next }: MarkdownMenuProps): JSX.Element
{
	const { refererState } = refererStore();

	return (
		<Stack data-component='MarkdownMenu' gap={2} marginTop={20}>
			<Grid spacing={2} container>
				<Grid md={6} xs={12} item>
					{prev ? (
						<MarkdownMenuSideCard
							href={prev.url}
							icon={<KeyboardArrowLeft htmlColor='white' />}
							subtitle='이전 게시글'
							thumbnail={prev.thumbnail}
							title={prev.title}
						/>
					) : null}
				</Grid>

				<Grid md={6} xs={12} item>
					{next ? (
						<MarkdownMenuSideCard
							href={next.url}
							icon={<KeyboardArrowRight htmlColor='white' />}
							iconPosition='end'
							subtitle='다음 게시글'
							thumbnail={next.thumbnail}
							title={next.title}
						/>
					) : null}
				</Grid>
			</Grid>

			<Divider />

			<Stack alignItems='end'>
				<Link href={`/${type}${refererState || ''}`}>
					<Button color='inherit' startIcon={<Menu />} variant='outlined'>
						메뉴
					</Button>
				</Link>
			</Stack>
		</Stack>
	);
}