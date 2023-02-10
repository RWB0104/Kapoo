/**
 * 컨텐츠 박스 컴포넌트
 *
 * @author RWB
 * @since 2023.02.08 Wed 16:20:21
 */
import { ContentType } from '@kapoo/commons/common';
import { useGetCategories, useGetInfiniteContents } from '@kapoo/commons/query';
import ContentBoard from '@kapoo/components/contents/ContentBoard';
import ContentCategory from '@kapoo/components/contents/ContentCategory';
import ContentSearch from '@kapoo/components/contents/ContentSearch';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

export interface ContentBoxProps
{
	type: ContentType
}

/**
 * 컨텐츠 박스 컴포넌트 JSX 반환 메서드
 *
 * @param {ContentBoxProps} param0: ContentBoxProps
 *
 * @returns {JSX.Element} JSX
 */
export default function ContentBox({ type }: ContentBoxProps): JSX.Element
{
	const [ keywordState, setKeywordState ] = useState('');
	const [ categoryState, setCategoryState ] = useState<string[]>([]);

	const { data: postsData, hasNextPage, fetchNextPage, refetch } = useGetInfiniteContents(type, { categories: categoryState, keyword: keywordState });

	const { data: categoryData } = useGetCategories(type);

	useEffect(() =>
	{
		refetch();
	}, [ keywordState, categoryState ]);

	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) =>
	{
		setKeywordState(e.currentTarget.value);
	}, [ setKeywordState ]);

	const handleLast = useCallback(() =>
	{
		if (hasNextPage)
		{
			fetchNextPage();
		}
	}, [ postsData ]);

	const contents = useMemo(() => postsData?.pages.flatMap(({ list }) => list) || [], [ postsData?.pages ]);

	return (
		<>
			<ContentSearch onChange={handleChange} />
			<ContentCategory list={categoryData || []} onClick={setCategoryState} />
			<ContentBoard
				list={contents}
				onLast={handleLast}
			/>
		</>
	);
}