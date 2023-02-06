/**
 * 컨텐츠 보드 컴포넌트
 *
 * @author RWB
 * @since 2021.07.17 Sat 09:57:28
 */

import { ContentProps } from '@commons/common';
import styles from '@styles/components/contents/ContentBoard.module.scss';
import classNames from 'classnames/bind';

import ContentList from './ContentList';

interface Props
{
	list: ContentProps[]
}

/**
 * 컨텐츠 보드 JSX 반환 함수
 *
 * @returns {JSX.Element} JSX
 */
export default function ContentBoard({ list }: Props): JSX.Element
{
	const cn = classNames.bind(styles);

	return (
		<article className={cn('root')}>
			<ContentList list={list} />
		</article>
	);
}