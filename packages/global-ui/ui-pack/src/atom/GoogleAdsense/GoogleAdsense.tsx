/**
 * 구글 애드센스 atom 컴포넌트
 *
 * @author RWB
 * @since 2024.06.12 Wed 11:57:39
 */

'use client';

import { Adsense } from '@ctrl/react-adsense';
import Stack from '@mui/material/Stack';

/**
 * 구글 애드센스 atom 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function GoogleAdsense(): JSX.Element
{
	return (
		<Stack alignItems='center' data-component='GoogleAdsense' justifyContent='center' width='100%'>
			<Adsense
				adTest='on'
				client='ca-pub-5522045122225064'
				format='fluid'
				layout='in-article'
				responsive='true'
				slot='4917762755'
				style={{
					display: 'block',
					width: '100%'
				}}
			/>
		</Stack>
	);
}