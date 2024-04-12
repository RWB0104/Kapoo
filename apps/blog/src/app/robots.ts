/**
 * 🤖 에셋 컴포넌트
 *
 * @author RWB
 * @since 2024.04.12 금 12:13:04
 */

import { MetadataRoute } from 'next';

/**
 * 🤖 에셋 컴포넌트 반환 메서드
 *
 * @returns {MetadataRoute.Robots} 🤖
 */
export default function RobotsAssets(): MetadataRoute.Robots
{
	return {
		host: process.env.NEXT_PUBLIC_BASE_URL,
		rules: {
			allow: '/',
			userAgent: '*'
		},
		sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`
	};
}