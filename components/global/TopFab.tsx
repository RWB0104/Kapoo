/**
 * 탑 Fab 컴포넌트
 *
 * @author RWB
 * @since 2022.05.06 Fri 13:48:37
 */

import { useScrollTopHook } from '@commons/hook';
import { themeAtom } from '@commons/state';
import styles from '@styles/components/global/TopFab.module.scss';
import { IoArrowUp } from 'react-icons/io5';
import { useRecoilValue } from 'recoil';

/**
 * 탑 Fab JSX 반환 메서드
 *
 * @returns {JSX.Element | null} JSX
 */
export default function TopFab(): JSX.Element | null
{
	const scrollState = useScrollTopHook();

	const themeState = useRecoilValue(themeAtom);

	return scrollState ? null : (
		<button className={styles[`root-${themeState}`]} onClick={() => window.scrollTo(0, 0)}>
			<IoArrowUp />
		</button>
	);
}