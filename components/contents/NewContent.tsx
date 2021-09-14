/**
 * 새 컨텐츠 태그 컴포넌트
 *
 * @author RWB
 * @since 2021.08.17 Tue 11:57:51
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Box } from '@material-ui/core';

// 스타일
import styles from '@styles/components/contents/newcontent.module.scss';

interface Props {
	flag: boolean
}

/**
 * 새 컨텐츠 ReactElement 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {ReactElement | null} ReactElement
 */
export default function NewContent({ flag }: Props): ReactElement | null
{
	return flag ? <Box position="absolute" className={styles.root} top={10} right={10}></Box> : null;
}