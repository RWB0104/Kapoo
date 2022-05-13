/**
 * 로딩 컴포넌트
 *
 * @author RWB
 * @since 2021.07.31 Sat 00:16:04
 */

import { loadingAtom, themeAtom } from '@commons/state';
import styles from '@styles/components/global/Loading.module.scss';
import { FaReact } from 'react-icons/fa';
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

	return loadingState ? (
		<article className={styles[`root-${themeState}`]}>
			<div className={styles['logo-wrap']}>
				<FaReact className={styles.logo} />
			</div>
		</article>
	) : null;
}