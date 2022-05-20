/**
 * 새 컨텐츠 태그 컴포넌트
 *
 * @author RWB
 * @since 2021.08.17 Tue 11:57:51
 */

import styles from '@styles/components/contents/NewContent.module.scss';
import classNames from 'classnames/bind';
import { BsCircleFill } from 'react-icons/bs';

interface Props
{
	flag: boolean
}

/**
 * 새 컨텐츠 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function NewContent({ flag }: Props): JSX.Element | null
{
	const cn = classNames.bind(styles);

	return flag ? <BsCircleFill className={cn('root')} /> : null;
}