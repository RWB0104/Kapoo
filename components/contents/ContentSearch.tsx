/**
 * 컨텐츠 리스트 컴포넌트
 *
 * @author RWB
 * @since 2022.05.10 Tue 01:01:15
 */

// 라이브러리 모듈
import React, { useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { SetterOrUpdater, useRecoilValue } from 'recoil';
import { IoClose } from 'react-icons/io5';

// 사용자 모듈
import { themeAtom } from '@commons/state';

// 스타일
import styles from '@styles/components/contents/ContentSearch.module.scss';

interface Props
{
	search: string,
	setSearch: SetterOrUpdater<string>,
	setPage: SetterOrUpdater<number>,
	setCategory: SetterOrUpdater<string[]>
}

/**
 * 컨텐츠 리스트 컴포넌트 JSX 반환 메서드
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element} JSX
 */
export default function ContentSearch({ search, setSearch, setPage, setCategory }: Props): JSX.Element
{
	const ref = useRef<HTMLInputElement>(null);

	const themeState = useRecoilValue(themeAtom);

	return (
		<article className={styles['root-wrapper']}>
			<div className={styles[`root-${themeState}`]}>
				<FaSearch />

				<input type="text" className={styles.text} ref={ref} value={search} onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
				{
					setSearch(e.target.value);
					setCategory([]);
					setPage(1);
				}} />

				<button onClick={() =>
				{
					setSearch('');
					setCategory([]);
					setPage(1);

					ref.current?.focus();
				}}><IoClose /></button>
			</div>
		</article>
	);
}