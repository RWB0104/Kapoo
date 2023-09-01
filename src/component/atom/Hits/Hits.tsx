/**
 * Hits atom 컴포넌트
 *
 * @author RWB
 * @since 2023.08.28 Mon 02:01:28
 */

import { CSSProperties, DetailedHTMLProps, ImgHTMLAttributes, ReactNode, useMemo } from 'react';

export interface HitsProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
{
	/**
	 * 유니크
	 */
	unique: string;

	/**
	 * 카운트 배경색
	 */
	countBgcolor?: CSSProperties['backgroundColor'];

	/**
	 * 타이틀 배경색
	 */
	titleBgcolor?: CSSProperties['backgroundColor'];

	/**
	 * 아이콘
	 */
	icon?: string;

	/**
	 * 아이콘 색상
	 */
	iconColor?: CSSProperties['backgroundColor'];

	/**
	 * 텍스트
	 */
	text: string;

	/**
	 * 플랫 여부
	 */
	isFlat?: boolean;
}

/**
 * Hits atom 컴포넌트 JSX 반환 메서드
 *
 * @param {HitsProps} param0: HitsProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function Hits({ unique, countBgcolor, titleBgcolor, icon, iconColor, text, isFlat, ...props }: HitsProps): ReactNode
{
	const src = useMemo(() =>
	{
		const obj = {
			count_bg: countBgcolor,
			edge_flat: isFlat,
			icon,
			icon_color: iconColor,
			title: text,
			title_bg: titleBgcolor,
			url: unique
		};

		const param = Object
			.entries(obj)
			.filter((i) => i[1])
			.map(([ k, v ]) => `${k}=${encodeURIComponent(v || '')}`)
			.join('&');

		return `https://hits.seeyoufarm.com/api/count/incr/badge.svg?${param}`;
	}, [ unique, countBgcolor, titleBgcolor, icon, iconColor, text, isFlat ]);

	return (
		<img alt={text} data-component='Hits' src={src} {...props} />
	);
}