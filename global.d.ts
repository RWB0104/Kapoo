interface Body
{
	json<T = unknown>(): Promise<T>;
}

interface NextPageProps<T = void, K = void>
{
	/**
	 * 파라미터
	 */
	params: T;

	/**
	 * 쿼리 파라미터
	 */
	searchParams?: K;
}

type Func<T> = Exclude<T, undefined>;