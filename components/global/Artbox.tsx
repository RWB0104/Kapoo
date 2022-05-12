/**
 * 아트박스 컴포넌트
 *
 * @author RWB
 * @since 2021.07.14 Wed 23:52:50
 */

// 라이브러리 모듈
import { useEffect, useRef, useState } from 'react';

// 사용자 모듈
import { getRandomIndex } from '@commons/common';
import { PIECE } from '@commons/env';

// 스타일
import styles from '@styles/components/global/ArtBox.module.scss';
import { IoMdRefresh } from 'react-icons/io';

/**
 * 아트박스 JSX 반환 함수
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Artbox(): JSX.Element | null
{
	const videoRef = useRef<HTMLVideoElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subRef = useRef<HTMLHeadingElement>(null);

	const [ state, setState ] = useState(true);

	useEffect((): void =>
	{
		const index = getRandomIndex(PIECE.length);

		const { title, author, images } = PIECE[index];

		// videoRef, imageRef의 HTML 노드가 null이 아닐 경우
		if (videoRef.current && imageRef.current)
		{
			// 동영상일 경우
			if (/\.(mp4|webm)$/.test(images))
			{
				videoRef.current.src = images;
				videoRef.current.style.display = 'initial';
				imageRef.current.style.display = 'none';
			}

			// 아닐 경우
			else
			{
				imageRef.current.src = images;
				imageRef.current.style.display = 'initial';
				videoRef.current.style.display = 'none';
			}
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
	}, [ state ]);

	return (
		<article className={styles.root}>
			<div className={styles['image-wrapper']}>
				<img ref={imageRef} className={styles.image} />
				<video ref={videoRef} className={styles.image} autoPlay loop muted />
			</div>

			<div className={styles['text-wrapper']}>
				<h1 ref={titleRef} className={styles.title}></h1>
				<h3 ref={subRef} className={styles.sub}></h3>
			</div>

			<div className={styles['button-wrapper']} onClick={() => setState(!state)}>
				<button className={styles.button}><IoMdRefresh /></button>
			</div>
		</article>
	);
}