/**
 * manifest 에셋 모듈
 *
 * @author RWB
 * @since 2024.04.08 Mon 16:56:47
 */

import { MetadataRoute } from 'next';

/**
 * manifest 에셋 모듈 반환 메서드
 *
 * @returns {MetadataRoute.Manifest} manifest
 */
export default function manifest(): MetadataRoute.Manifest
{
	return {
		background_color: '#FFFFFF',
		description: process.env.DESCRIPTION,
		display: 'standalone',
		icons: [
			{
				sizes: '72x72',
				src: '/icons/icon-72x72.png',
				type: 'image/png'
			},
			{
				sizes: '96x96',
				src: '/icons/icon-96x96.png',
				type: 'image/png'
			},
			{
				sizes: '128x128',
				src: '/icons/icon-128x128.png',
				type: 'image/png'
			},
			{
				sizes: '144x144',
				src: '/icons/icon-144x144.png',
				type: 'image/png'
			},
			{
				sizes: '152x152',
				src: '/icons/icon-152x152.png',
				type: 'image/png'
			},
			{
				purpose: 'any',
				sizes: '192x192',
				src: '/icons/icon-192x192.png',
				type: 'image/png'
			},
			{
				sizes: '384x384',
				src: '/icons/icon-384x384.png',
				type: 'image/png'
			},
			{
				sizes: '512x512',
				src: '/icons/icon-512x512.png',
				type: 'image/png'
			}
		],
		name: process.env.TITLE,
		scope: './',
		short_name: 'blog.itcode.dev',
		start_url: './',
		theme_color: '#FFFFFF'
	};
}