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
		<Box className={styles['image-wrapper']}>
			<video ref={videoRef} className={styles.media} autoPlay loop muted>
				<source src={image} />
			</video>

			<div className={styles.plate}></div>
		</Box>
	) : (
		<Box className={styles['image-wrapper']}>
			<div ref={imageRef} className={styles['image-basic']}></div>
		</Box>
	);

	return (
		<Box className={styles.root}>
			{media}

			<Typography component="h1" className={style} align="center">{title}</Typography>
			<Typography component="h3" className={styles.lower} align="center">{lower}</Typography>
		</Box>
	);
}