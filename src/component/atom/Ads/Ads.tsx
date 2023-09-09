/**
 * 애드센스 atom 컴포넌트
 *
 * @author RWB
 * @since 2023.09.10 Sun 00:32:14
 */

'use client';

import { Adsense } from '@ctrl/react-adsense';
import classNames from 'classnames/bind';
import { ReactNode } from 'react';

import styles from './Ads.module.scss';

const cn = classNames.bind(styles);

/**
 * 애드센스 atom 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function Ads(): ReactNode
{
	return (
		<Adsense
			adTest='on'
			className={cn('ads')}
			client='ca-pub-5522045122225064'
			data-component='Ads'
			format='fluid'
			layout='in-article'
			responsive='true'
			slot='4917762755'
		/>
	);
}