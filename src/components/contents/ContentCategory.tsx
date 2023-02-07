/**
 * 컨텐츠 카테고리 컴포넌트
 *
 * @author RWB
 * @since 2021.07.17 Sat 10:32:45
 */

import { CategoryProps, ContentTypeEnum } from '@kapoo/commons/common';
import { CATEGORY } from '@kapoo/commons/env';
import { postsCategoryAtom, postsPageAtom, projectsCategoryAtom, projectsPageAtom, themeAtom } from '@kapoo/commons/state';
import styles from '@kapoo/styles/components/contents/ContentCategory.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { useRecoilState, useRecoilValue } from 'recoil';

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
 * @returns {JSX.Element} JSX
 */
export default function ContentCategory({ type, list }: Props): JSX.Element
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

	const cn = classNames.bind(styles);

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
		<button className={cn('item')} data-type={type} key={index} onClick={() => toggleCategory(item.name)}>
			<img alt={item.name} className={cn('image')} src={`${CATEGORY[item.name] || CATEGORY.All}`} />

			<div className={cn('meta')}>
				<p>{item.name}</p>
				<p>{item.count}</p>
			</div>

			{categoryState.indexOf(item.name) > -1 && (
				<div className={cn('flag')}>
					<FaCheck color='white' />
				</div>
			)}
		</button>
	));

	return (
		<article className={cn('root-wrapper')}>
			<div className={cn('root', themeState)}>
				<div
					className={cn('header')}
					data-show={state}
					onClick={() =>
					{
						setState(state === undefined ? true : !state);

						// 페이지가 한 차례 이상 넘어간 경우
						if (pageState > 1)
						{
							setPageState(1);
						}
					}}
				>
					<h4 className={cn('title')}>📚 카테고리</h4>

					<IoIosArrowDown />
				</div>

				<div className={cn('body')} data-show={state}>
					{categories}
				</div>
			</div>
		</article>
	);
}