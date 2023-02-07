/**
 * 테마 Fab 컴포넌트
 *
 * @author RWB
 * @since 2021.07.12 Mon 00:53:20
 */

import { Theme } from '@kapoo/commons/common';
import { themeAtom } from '@kapoo/commons/state';
import { useRecoilValue } from 'recoil';

import ThemeDarkFab from './ThemeDarkFab';
import ThemeLightFab from './ThemeLightFab';

/**
 * 테마 Fab JSX 반환 함수
 *
 * @returns {JSX.Element} JSX
 */
export default function ThemeFab(): JSX.Element
{
	const themeState = useRecoilValue(themeAtom);

	return themeState === Theme.DARK ? <ThemeLightFab /> : <ThemeDarkFab />;
}