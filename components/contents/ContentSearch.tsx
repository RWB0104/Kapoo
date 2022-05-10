/**
 * 컨텐츠 리스트 컴포넌트
 *
 * @author RWB
 * @since 2022.05.10 Tue 01:01:15
 */

// 라이브러리 모듈
import React, { useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IoClose } from 'react-icons/io5';

// 사용자 모듈
import { postsCategoryAtom, postsPageAtom, postsSearchAtom, projectsCategoryAtom, projectsPageAtom, projectsSearchAtom, themeAtom } from '@commons/state';
import { ContentType, ContentTypeEnum } from '@commons/common';

// 스타일
import styles from '@styles/components/contents/ContentSearch.module.scss';

interface Props
{
	type: ContentType
}

/**
 * 컨텐츠 리스트 컴포넌트 JSX 반환 메서드
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element} JSX
 */
export default function ContentSearch({ type }: Props): JSX.Element
{
	const ref = useRef<HTMLInputElement>(null);

	const themeState = useRecoilValue(themeAtom);

	const [ postsSearchState, setPostsSearchState ] = useRecoilState(postsSearchAtom);
	const [ projectsSearchState, setProjectsSearchState ] = useRecoilState(projectsSearchAtom);

	const [ postsPageState, setPostsPageState ] = useRecoilState(postsPageAtom);
	const [ projectsPageState, setProjectsPageState ] = useRecoilState(projectsPageAtom);

	const [ postsCategoryState, setPostsCategoryState ] = useRecoilState(postsCategoryAtom);
	const [ projectsCategoryState, setProjectsCategoryState ] = useRecoilState(projectsCategoryAtom);

	const searchState = type === ContentTypeEnum.POSTS ? postsSearchState : projectsSearchState;
	const setSearchState = type === ContentTypeEnum.POSTS ? setPostsSearchState : setProjectsSearchState;

	const pageState = type === ContentTypeEnum.POSTS ? postsPageState : projectsPageState;
	const setPageState = type === ContentTypeEnum.POSTS ? setPostsPageState : setProjectsPageState;

	const categoryState = type === ContentTypeEnum.POSTS ? postsCategoryState : projectsCategoryState;
	const setCategoryState = type === ContentTypeEnum.POSTS ? setPostsCategoryState : setProjectsCategoryState;

	return (
		<article className={styles['root-wrapper']}>
			<div className={styles[`root-${themeState}`]}>
				<FaSearch />

				<input type="text" className={styles.text} ref={ref} value={searchState} onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
				{
					setSearchState(e.target.value);

					// 선택된 카테고리가 있을 경우
					if (categoryState.length > 0)
					{
						setCategoryState([]);
					}

					// 페이지가 한 차례 이상 넘어간 경우
					if (pageState > 1)
					{
						setPageState(1);
					}
				}} />

				<button onClick={() =>
				{
					setSearchState('');

					// 선택된 카테고리가 있을 경우
					if (categoryState.length > 0)
					{
						setCategoryState([]);
					}

					// 페이지가 한 차례 이상 넘어간 경우
					if (pageState > 1)
					{
						setPageState(1);
					}

					ref.current?.focus();
				}}><IoClose /></button>
			</div>
		</article>
	);
}