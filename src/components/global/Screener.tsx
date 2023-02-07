/**
 * 스크리너 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 19:44:15
 */

import { getRandomIndex } from '@kapoo/commons/common';
import { useGetImage } from '@kapoo/commons/query';
import styles from '@kapoo/styles/components/global/Screener.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useMemo, useRef, useState } from 'react';

interface Props
{
	title: string,
	menu: string,
	lower?: string,
	image?: string
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

	const { data } = useGetImage();

	const [ imageState ] = useState(image || data?.list[getRandomIndex(data?.list.length || 0)]);

	const videoRef = useRef<HTMLVideoElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);

	useEffect((): void =>
	{
		if (imageState)
		{
			// 동영상일 경우
			if (/(.mp4|webm)$/.test(imageState) && videoRef.current)
			{
				videoRef.current.src = imageState;
			}

			// 사진일 경우
			else if (imageRef.current)
			{
				imageRef.current.src = imageState;
			}
		}
	}, [ imageState ]);

	const tag = useMemo(() => (/(.mp4|webm)$/.test(imageState || '') ? <video className={cn('media')} ref={videoRef} autoPlay loop muted /> : <img alt='screen' className={cn('image')} ref={imageRef} />), [ imageState ]);

	return (
		<div className={cn('root')}>
			<div className={cn('image-wrapper')}>
				{imageState ? tag : null}

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