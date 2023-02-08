/**
 * 컨텐츠 카테고리 컴포넌트
 *
 * @author RWB
 * @since 2021.07.17 Sat 10:32:45
 */

import { CategoryProps } from '@kapoo/commons/common';
import { CATEGORY } from '@kapoo/commons/env';
import { themeAtom } from '@kapoo/commons/state';
import styles from '@kapoo/styles/components/contents/ContentCategory.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { useRecoilValue } from 'recoil';

interface Props
{
	list: CategoryProps[]
	onClick?: (category: string[]) => void
}

/**
 * 컨텐츠 카테고리 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element} JSX
 */
export default function ContentCategory({ list, onClick }: Props): JSX.Element
{
	const themeState = useRecoilValue(themeAtom);

	const [ state, setState ] = useState<boolean | undefined>(undefined);
	const [ categoryState, setCategoryState ] = useState<string[]>([]);

	const cn = classNames.bind(styles);

	const toggleCategory = (item: string) =>
	{
		let temp = categoryState.slice();

		// 전체 카테고리일 경우
		if (item === 'All')
		{
			temp = [];
		}

		// 나머지 카테고리일 경우
		else
		{
			const key = categoryState.indexOf(item);

			// 선택하지 않은 카테고리일 경우
			if (key > -1)
			{
				temp.splice(key, 1);
			}

			// 이미 선택한 카테고리일 경우
			else
			{
				temp.push(item);
			}
		}

		if (onClick)
		{
			onClick(temp);

			setCategoryState(temp);
		}
	};

	const categories = list.map((item, index: number): JSX.Element => (
		<button className={cn('item')} key={index} onClick={() => toggleCategory(item.name)}>
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