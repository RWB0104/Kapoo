/**
 * Hits atom 컴포넌트
 *
 * @author RWB
 * @since 2024.04.09 Tue 13:38:23
 */

import { CSSProperties, DetailedHTMLProps, ImgHTMLAttributes } from 'react';

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
 * Hits atom 컴포넌트 반환 메서드
 *
 * @param {HitsProps} param0: HitsProps
 *
 * @returns {JSX.Element} JSX
 */
export default function Hits({ unique, countBgcolor, titleBgcolor, icon, iconColor, text, isFlat, ...props }: HitsProps): JSX.Element
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

	return (
		<img
			alt={`https://hits.seeyoufarm.com/api/count/incr/badge.svg?${param}`}
			data-component='Hits'
			src={`https://hits.seeyoufarm.com/api/count/incr/badge.svg?${param}`}
			{...props}
		/>
	);
}