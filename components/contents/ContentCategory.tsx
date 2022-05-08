/**
 * 컨텐츠 카테고리 컴포넌트
 *
 * @author RWB
 * @since 2021.07.17 Sat 10:32:45
 */

// 라이브러리 모듈
import { Dispatch, SetStateAction, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

// 사용자 모듈
import { CATEGORY } from '@commons/env';
import { CategoryProps } from '@commons/common';
import NewContent from './NewContent';

// 스타일
import styles from '@styles/components/contents/ContentCategory.module.scss';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '@commons/state';

interface Props
{
	type: string,
	list: CategoryProps,
	categoryState: string[],
	setCategoryState: Dispatch<SetStateAction<string[]>>
}

/**
 * 컨텐츠 카테고리 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function ContentCategory({ type, list, categoryState, setCategoryState }: Props): JSX.Element | null
{
	const themeState = useRecoilValue(themeAtom);

	const [ state, setState ] = useState(undefined as boolean | undefined);

	const toggleCategory = (item: string) =>
	{
		if (item === 'All')
		{
			setCategoryState([]);
		}

		else
		{
			const temp = categoryState.slice();
			const key = categoryState.indexOf(item);

			if (key > -1)
			{
				temp.splice(key, 1);
				setCategoryState(temp);
			}

			else
			{
				temp.push(item);
				setCategoryState(temp);
			}
		}
	};

	const categories = Object.keys(list).sort().map((item, index: number): JSX.Element => (
		<button key={index} className={styles.item} data-type={type} onClick={() => toggleCategory(item)}>
			<img className={styles.image} alt={item} src={`${CATEGORY[item] || CATEGORY['All']}`} />

			<div className={styles.meta}>
				<p>{item}</p>
				<p>( {list[item].count} )</p>
			</div>

			<div className={styles.flag}>
				<NewContent flag={categoryState.indexOf(item) > -1} />
			</div>
		</button>
	));

	return (
		<article className={styles['root-wrapper']}>
			<div className={styles[`root-${themeState}`]}>
				<div className={styles.header} onClick={() => setState(state === undefined ? true : !state)} data-show={state}>
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