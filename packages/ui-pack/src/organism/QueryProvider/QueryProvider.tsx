/**
 * react-query 프로바이더 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.08 Mon 17:42:13
 */

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren, useMemo } from 'react';

export interface QueryProviderProps extends PropsWithChildren
{
	/**
	 * QueryClient
	 */
	defaultClient?: QueryClient;
}

/**
 * react-query 프로바이더 organism 컴포넌트 반환 메서드
 *
 * @param {QueryClientProviderProps} param0: QueryClientProviderProps
 *
 * @returns {JSX.Element} JSX
 */
export default function QueryProvider({ defaultClient, children, ...props }: QueryProviderProps): JSX.Element
{
	const client = useMemo(() => defaultClient || new QueryClient({ defaultOptions: { queries: { staleTime: 3600 * 1000 } } }), [ defaultClient ]);

	return (
		<QueryClientProvider client={client} {...props}>
			{children}

			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}