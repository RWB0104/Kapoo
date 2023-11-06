/**
 * 홈 인기 게시글 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.09.03 Sun 23:44:01
 */

'use client';

import { useGetGooglePopularData } from '@kapoo/api';
import LottieIcon from '@kapoo/atom/LottieIcon';
import MarkdownList from '@kapoo/molecule/MarkdownList';
import { MarkdownListItemProps, MarkdownType } from '@kapoo/util/markdown';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactNode, useMemo } from 'react';

export interface HomePopularBoxProps
{
	/**
	 * 마크다운 타입
	 */
	type: MarkdownType;

	/**
	 * 마크다운 리스트
	 */
	markdownList: MarkdownListItemProps[];
}

/**
 * 홈 인기 게시글 박스 organism 컴포넌트 JSX 반환 메서드
 *
 * @param {HomePopularBoxProps} param0: HomePopularBoxProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function HomePopularBox({ type, markdownList }: HomePopularBoxProps): ReactNode
{
	const { data, isLoading } = useGetGooglePopularData(type);

	const text = useMemo(() => (type === 'posts' ? '게시글' : '프로젝트'), [ type ]);

	const markdown: MarkdownListItemProps[] = useMemo(() =>
	{
		const urls = data?.rows.map(({ dimensionValues }) => dimensionValues[0].value) || [];

		return urls.map((i) => markdownList.filter(({ url }) => i === url)[0]) || [];
	}, [ data, markdownList ]);

	return (
		<Stack data-component='HomePopularBox' paddingBottom={4} paddingTop={4} spacing={8}>
			<Stack spacing={2}>
				<Typography fontWeight='bold' variant='h4'>👑 인기 {text}</Typography>
				<Typography color='GrayText'>한 달 이내의 Google Analytics 데이터 중, 가장 조회수가 높은 {text}의 목록입니다.</Typography>
			</Stack>

			{isLoading ? (
				<Stack alignItems='center'>
					<LottieIcon iconName='loading' maxWidth={200} width='100%' />
				</Stack>
			) : (
				<MarkdownList markdown={markdown} />
			)}
		</Stack>
	);
}