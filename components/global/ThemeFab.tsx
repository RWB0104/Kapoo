/**
 * 테마 Fab 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 00:53:20
 */

// 라이브러리 모듈
import { useRecoilValue } from 'recoil';

// 사용자 모듈
import ThemeDarkFab from './ThemeDarkFab';
import ThemeLightFab from './ThemeLightFab';
import { themeAtom } from '@commons/state';
import { Theme } from '@commons/common';

/**
 * 테마 Fab JSX 반환 함수
 *
 * @returns {JSX.Element | null} JSX
 */
export default function ThemeFab(): JSX.Element | null
{
	const themeState = useRecoilValue(themeAtom);

	return themeState === Theme.DARK ? <ThemeLightFab /> : <ThemeDarkFab />;
}