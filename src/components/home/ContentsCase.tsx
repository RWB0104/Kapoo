/**
 * 컨텐츠 케이스 컴포넌트
 *
 * @author RWB
 * @since 2021.07.15 Thu 19:56:14
 */

import { ContentProps } from '@kapoo/commons/common';
import { themeAtom } from '@kapoo/commons/state';
import ContentList from '@kapoo/components/contents/ContentList';
import LottieIcon from '@kapoo/components/global/LottieIcon';
import styles from '@kapoo/styles/components/home/ContentsCase.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';
import React from 'react';
import { useRecoilValue } from 'recoil';

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
{
	num: number,
	title: string,
	url: { pathname: string },
	list: ContentProps[],
	loading?: boolean
}

/**
 * 컨텐츠 케이스 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element} JSX
 */
export default function ContentsCase({ num, title, url, list, loading, className, ...props }: Props): JSX.Element
{
	const cn = classNames.bind(styles);

	const themeState = useRecoilValue(themeAtom);

	return (
		<article className={cn('root', className)} {...props}>
			<h1 className={cn('title')}>{title}</h1>

			{loading ? (
				<div className={cn('loading')}>
					<LottieIcon icon='search' />
				</div>
			) : (
				<ContentList list={list.slice(0, num)} />
			)}

			<Link href={url} legacyBehavior passHref>
				<a className={cn('more', themeState)} href='#replace' title='more'>M O R E</a>
			</Link>
		</article>
	);
}