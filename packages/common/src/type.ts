/**
 * 타입 모듈
 *
 * @author RWB
 * @since 2024.04.01 Mon 09:20:31
 */

export interface NextPageProps<T = Record<string, string>, K = Record<string, string>> {
	params: T;
	searchParams?: K;
}
export type Func<T> = Exclude<T, undefined>;