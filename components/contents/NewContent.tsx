/**
 * 새 컨텐츠 태그 컴포넌트
 *
 * @author RWB
 * @since 2021.08.17 Tue 11:57:51
 */

// 라이브러리 모듈
import { BsCircleFill } from 'react-icons/bs';

// 스타일
import styles from '@styles/components/contents/NewContent.module.scss';

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
	return flag ? <BsCircleFill className={styles.root} /> : null;
}