/**
 * 탑 Fab 컴포넌트
 *
 * @author RWB
 * @since 2022.05.06 Fri 13:48:37
 */

// 라이브러리 모듈
import { useScrollTopHook } from '@commons/hook';
import { IoArrowUp } from 'react-icons/io5';
import { useRecoilValue } from 'recoil';

// 사용자 모듈
import { themeAtom } from '@commons/state';

// 스타일
import styles from '@styles/components/global/TopFab.module.scss';

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