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
				sizes: 'any',
				src: '/favicon.ico',
				type: 'image/x-icon'
			}
		],
		name: APP_INFO.title,
		short_name: 'blog.itcode.dev',
		start_url: '.',
		theme_color: '#FFFFFF'
	};
}