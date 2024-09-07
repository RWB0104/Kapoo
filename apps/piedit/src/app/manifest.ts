/**
 * manifest 에셋 모듈
 *
 * @author RWB
 * @since 2024.09.08 Sun 05:21:57
 */

import { MetadataRoute } from 'next';

/**
 * manifest 에셋 모듈 반환 메서드
 *
 * @returns {MetadataRoute.Manifest} manifest
 */
export default function ManifestAssets(): MetadataRoute.Manifest
{
	return {
		background_color: '#000000',
		description: process.env.NEXT_PUBLIC_DESCRIPTION,
		display: 'standalone',
		icons: [
			{
				sizes: '72x72',
				src: '/piedit/icons/icon-72x72.png',
				type: 'image/png'
			},
			{
				sizes: '96x96',
				src: '/piedit/icons/icon-96x96.png',
				type: 'image/png'
			},
			{
				sizes: '128x128',
				src: '/piedit/icons/icon-128x128.png',
				type: 'image/png'
			},
			{
				sizes: '144x144',
				src: '/piedit/icons/icon-144x144.png',
				type: 'image/png'
			},
			{
				sizes: '152x152',
				src: '/piedit/icons/icon-152x152.png',
				type: 'image/png'
			},
			{
				purpose: 'any',
				sizes: '192x192',
				src: '/piedit/icons/icon-192x192.png',
				type: 'image/png'
			},
			{
				sizes: '384x384',
				src: '/piedit/icons/icon-384x384.png',
				type: 'image/png'
			},
			{
				sizes: '512x512',
				src: '/piedit/icons/icon-512x512.png',
				type: 'image/png'
			}
		],
		name: process.env.NEXT_PUBLIC_TITLE,
		scope: './',
		short_name: 'piedit',
		start_url: './',
		theme_color: '#FFFFFF'
	};
}