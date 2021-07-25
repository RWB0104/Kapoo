/**
 * 아트박스 컴포넌트
 *
 * @author RWB
 * @since 2021.07.14 Wed 23:52:50
 */

// 라이브러리 모듈
import { ReactElement, useEffect, useRef } from 'react';
import { Box, Typography } from '@material-ui/core';

// 사용자 모듈
import { getRandomIndex } from '@commons/common';
import { PIECE } from '@commons/env';

// 스타일
import styles from '@styles/components/global/artbox.module.scss';

/**
 * 아트박스 ReactElement 반환 함수
 *
 * @returns {ReactElement} ReactElement
 */
export default function Artbox(): ReactElement
{
	const imageRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subRef = useRef<HTMLHeadingElement>(null);

	const index = getRandomIndex(PIECE.length);

	const { title, author, images } = PIECE[index];

	useEffect((): void =>
	{
		// imageRef, imageRef의 HTML 노드가 null이 아닐 경우
		if (imageRef && imageRef.current)
		{
			imageRef.current.style.backgroundImage = `url(${images})`;
		}

		// titleRef, titleRef의 HTML 노드가 null이 아닐 경우
		if (titleRef && titleRef.current)
		{
			titleRef.current.innerText = title;
		}

		// subRef, subRef의 HTML 노드가 null이 아닐 경우
		if (subRef && subRef.current)
		{
			subRef.current.innerText = author;
		}
	});

	return (
		<Box className={styles.root} component="article" position="relative" display="flex" flexDirection="column" justifyContent="center">
			<Box className={styles.wrapper} position="absolute">
				<div ref={imageRef} className={styles.image}></div>
			</Box>

			<Box display="grid">
				<Typography ref={titleRef} component="h1" className={styles.title} gutterBottom></Typography>
				<Typography ref={subRef} component="h3" className={styles.sub}></Typography>
			</Box>
		</Box>
	);
}