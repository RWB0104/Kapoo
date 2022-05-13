/**
 * 헤더 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 15:01:10
 */

import { TITLE } from '@commons/env';
import { useScrollTopHook } from '@commons/hook';
import { themeAtom } from '@commons/state';
import styles from '@styles/components/header/Header.module.scss';
import { FaReact } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';

import MenuList from './MenuList';

/**
 * 헤더 JSX 반환 함수
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Header(): JSX.Element | null
{
	const themeState = useRecoilValue(themeAtom);
	const scrollState = useScrollTopHook();

	return (
		<header className={styles[`root-${themeState}`]} data-top={scrollState}>
			<div className={styles.wrapper}>
				<FaReact className={styles.logo} height={48} width={48} />

				<h4 className={styles.title}>{TITLE}</h4>

				<MenuList />
			</div>
		</header>
	);
}