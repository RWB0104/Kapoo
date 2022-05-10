/**
 * 컨텐츠 카테고리 컴포넌트
 *
 * @author RWB
 * @since 2021.07.17 Sat 10:32:45
 */

// 라이브러리 모듈
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IoIosArrowDown } from 'react-icons/io';

// 사용자 모듈
import NewContent from './NewContent';
import { CATEGORY } from '@commons/env';
import { CategoryProps, ContentTypeEnum } from '@commons/common';
import { postsCategoryAtom, postsPageAtom, projectsCategoryAtom, projectsPageAtom, themeAtom } from '@commons/state';

// 스타일
import styles from '@styles/components/contents/ContentCategory.module.scss';

interface Props
{
	type: string,
	list: CategoryProps[]
}

/**
 * 컨텐츠 카테고리 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function ContentCategory({ type, list }: Props): JSX.Element | null
{
	const themeState = useRecoilValue(themeAtom);

	const [ state, setState ] = useState(undefined as boolean | undefined);

	const [ postsPageState, setPostsPageState ] = useRecoilState(postsPageAtom);
	const [ projectsPageState, setProjectsPageState ] = useRecoilState(projectsPageAtom);

	const [ postsCategoryState, setPostsCategoryState ] = useRecoilState(postsCategoryAtom);
	const [ projectsCategoryState, setProjectsCategoryState ] = useRecoilState(projectsCategoryAtom);

	const pageState = type === ContentTypeEnum.POSTS ? postsPageState : projectsPageState;
	const setPageState = type === ContentTypeEnum.POSTS ? setPostsPageState : setProjectsPageState;

	const categoryState = type === ContentTypeEnum.POSTS ? postsCategoryState : projectsCategoryState;
	const setCategoryState = type === ContentTypeEnum.POSTS ? setPostsCategoryState : setProjectsCategoryState;

	const toggleCategory = (item: string) =>
	{
		// 전체 카테고리일 경우
		if (item === 'All')
		{
			setCategoryState([]);
		}

		// 나머지 카테고리일 경우
		else
		{
			const temp = categoryState.slice();
			const key = categoryState.indexOf(item);

			// 선택하지 않은 카테고리일 경우
			if (key > -1)
			{
				temp.splice(key, 1);
				setCategoryState(temp);
			}

			// 이미 선택한 카테고리일 경우
			else
			{
				temp.push(item);
				setCategoryState(temp);
			}
		}
	};

	const categories = list.map((item, index: number): JSX.Element => (
		<button key={index} className={styles.item} data-type={type} onClick={() => toggleCategory(item.name)}>
			<img className={styles.image} alt={item.name} src={`${CATEGORY[item.name] || CATEGORY['All']}`} />

			<div className={styles.meta}>
				<p>{item.name}</p>
				<p>( {item.count} )</p>
			</div>

			<div className={styles.flag}>
				<NewContent flag={categoryState.indexOf(item.name) > -1} />
			</div>
		</button>
	));

	return (
		<article className={styles['root-wrapper']}>
			<div className={styles[`root-${themeState}`]}>
				<div className={styles.header} onClick={() =>
				{
					setState(state === undefined ? true : !state);

					// 페이지가 한 차례 이상 넘어간 경우
					if (pageState > 1)
					{
						setPageState(1);
					}
				}} data-show={state}>
					<h4 className={styles.title}>📚 카테고리</h4>

					<IoIosArrowDown />
				</div>

				<div className={styles.body} data-show={state}>
					{categories}
				</div>
			</div>
		</article>
	);
}