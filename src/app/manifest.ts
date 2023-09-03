/**
 * 메니페스트 모듈
 *
 * @author RWB
 * @since 2023.09.02 Sat 14:23:59
 */

import { APP_INFO } from '@kapoo/env';

import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest
{
	return {
		background_color: '#FFFFFF',
		description: APP_INFO.description,
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
		name: APP_INFO.title,
		scope: './',
		short_name: 'blog.itcode.dev',
		start_url: './',
		theme_color: '#FFFFFF'
	};
}