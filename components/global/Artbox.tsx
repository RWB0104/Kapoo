/**
 * 아트박스 컴포넌트
 *
 * @author RWB
 * @since 2021.07.14 Wed 23:52:50
 */

// 라이브러리 모듈
import { ReactElement, useEffect, useRef } from 'react';


import { getRandomIndex } from '@commons/common';
import { PIECE } from '@commons/env';

// 스타일
import styles from '@styles/components/global/ArtBox.module.scss';

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
		<article className={styles.root}>
			<div className={styles['image-wrapper']}>
				<div ref={imageRef} className={styles.image}></div>
			</div>

			<div className={styles['text-wrapper']}>
				<h1 ref={titleRef} className={styles.title}></h1>
				<h3 ref={subRef} className={styles.sub}></h3>
			</div>
		</article>
	);
}