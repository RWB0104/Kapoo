/**
 * 스크리너 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 19:44:15
 */

// 라이브러리 모듈
import { ReactElement, useEffect, useRef } from 'react';
import { Box, Typography } from '@material-ui/core';

// 스타일
import styles from '@styles/components/global/screener.module.scss';

interface Props {
	title: string,
	lower?: string,
	image: string
	special?: boolean
}

/**
 * 스크리너 ReactElement 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {ReactElement} ReactElement
 */
export default function Screener({ title, lower, image, special }: Props): ReactElement | null
{
	const style = special ? styles['title-special'] : styles.title;

	const ref = useRef<HTMLDivElement>(null);

	useEffect((): void =>
	{
		// ref, ref의 HTML 노드가 null이 아닐 경우
		if (ref && ref.current)
		{
			ref.current.style.backgroundImage = `url(${image})`;
		}
	}, []);

	return (
		<Box className={styles.root} position="relative" display="grid" gridAutoRows="auto" gridRowGap={100} alignContent="center">
			<Box className={styles['image-wrapper']} position="absolute">
				<div ref={ref} className={styles['image-basic']}></div>
			</Box>

			<Typography component="h1" className={style} align="center">{title}</Typography>
			<Typography component="h3" className={styles.lower} align="center">{lower}</Typography>
		</Box>
	);
}