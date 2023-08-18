/**
 * react-query 프로바이더 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 토 02:18:47
 */

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren, ReactNode, useMemo } from 'react';

export type ReactQueryProviderProps = PropsWithChildren

/**
 * react-query 프로바이더 organism 컴포넌트 JSX 반환 메서드
 *
 * @param {ReactQueryProviderProps} param0: ReactQueryProviderProps 객체
 *
 * @returns {ReactNode}
 */
export default function ReactQueryProvider({ children }: ReactQueryProviderProps): ReactNode
{
	const client = useMemo(() => new QueryClient(), []);

	return (
		<QueryClientProvider client={client} data-component='ReactQueryProvider'>
			{children}

			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}