/**
 * 컨텐츠 케이스 컴포넌트
 *
 * @author RWB
 * @since 2021.07.15 Thu 19:56:14
 */

import { ContentProps } from '@commons/common';
import ContentList from '@components/contents/ContentList';
import styles from '@styles/components/home/ContentsCase.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';

interface Props
{
	num: number,
	title: string,
	url: { pathname: string },
	list: ContentProps[]
}

/**
 * 컨텐츠 케이스 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element} JSX
 */
export default function ContentsCase({ num, title, url, list }: Props): JSX.Element
{
	const cn = classNames.bind(styles);

	return (
		<article className={cn('root')}>
			<h1 className={cn('title')}>{title}</h1>

			<ContentList list={list.slice(0, num)} />

			<Link href={url} passHref>
				<a className={cn('more')} href='#replace' title='more'>M O R E</a>
			</Link>
		</article>
	);
}