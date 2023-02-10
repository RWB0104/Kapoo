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
import { useEffect, useMemo, useState } from 'react';

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

	const [ imageState, setImageState ] = useState(image);

	useEffect(() =>
	{
		// 이미지가 유효하지 않을 경우
		if (image === undefined)
		{
			setImageState(data?.list[getRandomIndex(data?.list.length)]);
		}
	}, [ image, data ]);

	const tag = useMemo(() => (/(.mp4|webm)$/.test(imageState || '') ? <video className={cn('media')} src={imageState} autoPlay loop muted /> : <img alt='screen' className={cn('image')} src={imageState} />), [ imageState ]);

	return (
		<div className={cn('root')}>
			<div className={cn('image-wrapper')}>
				{imageState ? tag : null}

				<div className={cn('plate')} />
			</div>

			<div className={cn('title-wrapper')}>
				<h1 className={cn('title')}>{title}</h1>
				<h3 className={cn('menu')}>{menu}</h3>
				<h3 className={cn('lower')}>{lower}</h3>
			</div>
		</div>
	);
}