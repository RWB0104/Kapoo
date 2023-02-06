/**
 * react-query 레이아웃 컴포넌트
 */

import { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClientProviderProps } from 'react-query/types/react';

export type QueryLayoutProps = Pick<QueryClientProviderProps, 'children'>

/**
 * react-query 레이아웃 컴포넌트 JSX 반환 메서드
 *
 * @param {QueryLayoutProps} param0: QueryLayoutProps 객체
 *
 * @returns {JSX.Element} JSX
 */
export default function QueryLayout({ children }: QueryLayoutProps): JSX.Element
{
	const client = useMemo(() => new QueryClient({
		defaultOptions: {
			queries: {
				cacheTime: Infinity,
				refetchOnWindowFocus: false,
				retry: 0,
				staleTime: 300 * 1000
			}
		}
	}), []);

	return (
		<QueryClientProvider client={client}>
			{children}

			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}