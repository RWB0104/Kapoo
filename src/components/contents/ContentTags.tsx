/**
 * 컨텐츠 태그 컴포넌트
 *
 * @author RWB
 * @since 2021.07.16 Fri 00:42:43
 */

import { themeAtom } from '@kapoo/commons/state';
import styles from '@kapoo/styles/components/contents/ContentTags.module.scss';
import classNames from 'classnames/bind';
import { useRecoilValue } from 'recoil';

interface Props
{
	type: string
	tags: string[]
}

/**
 * 컨텐츠 태그 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element} JSX
 */
export default function ContentTags({ type, tags }: Props): JSX.Element
{
	const cn = classNames.bind(styles);
	const theme = useRecoilValue(themeAtom);

	return <>{tags.map((item, index) => <p className={cn('root', theme)} data-type={type} key={index}>{item}</p>)}</>;
}