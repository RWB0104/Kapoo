/**
 * 구글 애드센스 컴포넌트
 *
 * @author RWB
 * @since 2023.02.13 Mon 22:06:12
 */

import { useEffect } from 'react';

/**
 * 구글 애드센스 컴포넌트 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function Adsense(): JSX.Element
{
	useEffect(() =>
	{
		try
		{
			(window.adsbygoogle = window.adsbygoogle || []).push({});
			console.log('Advertise is pushed');
		}

		catch (e)
		{
			console.error('AdvertiseError', e);
		}
	}, []);

	return (
		<ins
			className='adsbygoogle'
			data-ad-client='ca-pub-5522045122225064'
			data-ad-format='auto'
			data-ad-slot='8348565597'
			data-full-width-responsive='true'
		/>
	);
}