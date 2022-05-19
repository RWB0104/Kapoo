/**
 * 스크리너 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 19:44:15
 */

import styles from '@styles/components/global/Screener.module.scss';
import classNames from 'classnames/bind';
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
	const cn = classNames.bind(styles);

	const videoRef = useRef<HTMLVideoElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);

	useEffect((): void =>
	{
		// 동영상일 경우
		if (/(.mp4|webm)$/.test(image) && videoRef.current)
		{
			videoRef.current.src = image;
		}

		// 사진일 경우
		else if (imageRef.current)
		{
			imageRef.current.src = image;
		}
	}, [ image ]);

	return (
		<div className={cn('root')}>
			<div className={cn('image-wrapper')}>
				{/(.mp4|webm)$/.test(image) ? <video className={cn('media')} ref={videoRef} autoPlay loop muted /> : <img alt='screen' className={cn('image')} ref={imageRef} />}

				<div className={styles.plate} />
			</div>

			<div className={cn('title-wrapper')}>
				<h1 className={cn('title')}>{title}</h1>
				<h3 className={cn('menu')}>{menu}</h3>
				<h3 className={cn('lower')}>{lower}</h3>
			</div>
		</div>
	);
}