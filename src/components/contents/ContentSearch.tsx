/**
 * 컨텐츠 리스트 컴포넌트
 *
 * @author RWB
 * @since 2022.05.10 Tue 01:01:15
 */

import { themeAtom } from '@kapoo/commons/state';
import styles from '@kapoo/styles/components/contents/ContentSearch.module.scss';
import classNames from 'classnames/bind';
import React, { ChangeEventHandler, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useRecoilValue } from 'recoil';

interface Props
{
	onChange?: ChangeEventHandler<HTMLInputElement>
}

/**
 * 컨텐츠 리스트 컴포넌트 JSX 반환 메서드
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element} JSX
 */
export default function ContentSearch({ onChange }: Props): JSX.Element
{
	const ref = useRef<HTMLInputElement>(null);

	const themeState = useRecoilValue(themeAtom);

	const cn = classNames.bind(styles);

	return (
		<article className={cn('root-wrapper')}>
			<div className={cn('root', themeState)}>
				<FaSearch />

				<input
					className={cn('text')}
					ref={ref}
					type='text'
					onChange={onChange}
				/>

				<button
					data-show
					onClick={() =>
					{
						if (ref.current)
						{
							ref.current.value = '';
							ref.current.focus();
						}
					}}
				><IoClose />
				</button>
			</div>
		</article>
	);
}