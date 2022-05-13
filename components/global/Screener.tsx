/**
 * 스크리너 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 19:44:15
 */

import styles from '@styles/components/global/Screener.module.scss';
import { useEffect, useRef } from 'react';

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
 * @returns {JSX.Element} JSX
 */
export default function Screener({ title, menu, lower, image }: Props): JSX.Element
{
	const videoRef = useRef<HTMLVideoElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);

	useEffect((): void =>
	{
		// 동영상일 경우
		if (/(.mp4|webm)$/.test(image))
		{
			// video DOM이 null이 아닐 경우
			if (videoRef.current)
			{
				videoRef.current.src = image;
			}
		}

		// 사진일 경우
		else
		{
			// img DOM이 null이 아닐 경우
			if (imageRef.current)
			{
				imageRef.current.src = image;
			}
		}
	}, [ image ]);

	return (
		<div className={styles.root}>
			<div className={styles['image-wrapper']}>
				{/(.mp4|webm)$/.test(image) ? <video className={styles.media} ref={videoRef} autoPlay loop muted /> : <img className={styles['image-basic']} ref={imageRef} />}

				<div className={styles.plate}></div>
			</div>

			<div className={styles['title-wrapper']}>
				<h1 className={styles.title}>{title}</h1>
				<h3 className={styles.menu}>{menu}</h3>
				<h3 className={styles.lower}>{lower}</h3>
			</div>
		</div>
	);
}