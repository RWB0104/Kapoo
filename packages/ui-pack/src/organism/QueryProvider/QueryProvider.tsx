/**
 * react-query 프로바이더 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.08 Mon 17:42:13
 */

'use client';

import { QueryClient, QueryClientProvider, QueryClientProviderProps } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useMemo } from 'react';

/**
 * react-query 프로바이더 organism 컴포넌트 반환 메서드
 *
 * @param {QueryClientProviderProps} param0: QueryClientProviderProps
 *
 * @returns {JSX.Element} JSX
 */
export default function QueryProvider({ client, children, ...props }: QueryClientProviderProps): JSX.Element
{
	const clientObj = useMemo(() => client || new QueryClient({ defaultOptions: { queries: { staleTime: 3600 * 1000 } } }), [ client ]);

	return (
		<QueryClientProvider client={clientObj} {...props}>
			{children}

			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}