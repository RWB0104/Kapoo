/**
 * 로딩 컴포넌트
 *
 * @author RWB
 * @since 2021.07.31 Sat 00:16:04
 */

import { loadingAtom, themeAtom } from '@kapoo/commons/state';
import LottieIcon from '@kapoo/components/global/LottieIcon';
import styles from '@kapoo/styles/components/global/Loading.module.scss';
import classNames from 'classnames/bind';
import { useRecoilValue } from 'recoil';

/**
 * 로딩 JSX 반환 함수
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Loading(): JSX.Element | null
{
	const themeState = useRecoilValue(themeAtom);
	const loadingState = useRecoilValue(loadingAtom);

	const cn = classNames.bind(styles);

	return loadingState ? (
		<article className={cn('root', themeState)}>
			<div className={cn('logo-wrapper')}>
				<LottieIcon icon='loading' />
			</div>
		</article>
	) : null;
}