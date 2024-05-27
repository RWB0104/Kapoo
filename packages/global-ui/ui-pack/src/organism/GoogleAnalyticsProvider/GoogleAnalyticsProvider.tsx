/**
 * GA 프로바이더 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.05.27 Mon 18:18:04
 */

'use client';

import { PropsWithChildren } from 'react';
import reactGA from 'react-ga4';

export interface GoogleAnalyticsProviderProps extends PropsWithChildren
{
	/**
	 * GA 키
	 */
	gaKey: string;
}

/**
 * GA 프로바이더 organism 컴포넌트 반환 메서드
 *
 * @param {GoogleAnalyticsProviderProps} param0: GoogleAnalyticsProviderProps
 *
 * @returns {JSX.Element} JSX
 */
export default function GoogleAnalyticsProvider({ gaKey, children }: GoogleAnalyticsProviderProps): JSX.Element
{
	reactGA.initialize(gaKey);

	return <>{children}</>;
}