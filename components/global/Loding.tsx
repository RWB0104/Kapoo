/**
 * 로딩 컴포넌트
 *
 * @author RWB
 * @since 2021.07.31 Sat 00:16:04
 */

// 라이브러리 모듈
import { useRecoilValue } from 'recoil';

// 사용자 모듈
import { loadingAtom, themeAtom } from '@commons/state';
import { React } from '@commons/icons';

// 스타일
import styles from '@styles/components/global/Loading.module.scss';

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
				<React className={styles.logo} />
			</div>
		</article>
	) : null;
}