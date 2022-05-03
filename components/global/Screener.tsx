/**
 * 스크리너 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 19:44:15
 */

// 라이브러리 모듈
import { useEffect, useRef } from 'react';

// 스타일
import styles from '@styles/components/global/Screener.module.scss';

interface Props
{
	title: string,
	menu: string,
	lower?: string,
	image: string
}

/**
 * 스크리너 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Screener({ title, menu, lower, image }: Props): JSX.Element | null
{
	const videoRef = useRef<HTMLVideoElement>(null);
	const imageRef = useRef<HTMLDivElement>(null);

	useEffect((): void =>
	{
		// 동영상일 경우
		if (/(.mp4|webm)$/.test(image))
		{
			// video DOM이 null이 아닐 경우
			if (videoRef && videoRef.current)
			{
				videoRef.current.src = image;
			}
		}

		// 사진일 경우
		else
		{
			// img DOM이 null이 아닐 경우
			if (imageRef && imageRef.current)
			{
				imageRef.current.style.backgroundImage = `url(${image})`;
			}
		}
	}, [ image ]);

	const media = /(.mp4|webm)$/.test(image) ? (
		<div className={styles['image-wrapper']}>
			<video ref={videoRef} className={styles.media} autoPlay loop muted>
				<source src={image} />
			</video>

			<div className={styles.plate}></div>
		</div>
	) : (
		<div className={styles['image-wrapper']}>
			<div ref={imageRef} className={styles['image-basic']}></div>
		</div>
	);

	return (
		<div className={styles.root}>
			{media}

			<div className={styles['title-wrapper']}>
				<h1 className={styles.title}>{title}</h1>
				<h3 className={styles.menu}>{menu}</h3>
				<h3 className={styles.lower}>{lower}</h3>
			</div>
		</div>
	);
}