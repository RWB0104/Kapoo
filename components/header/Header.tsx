/**
 * 헤더 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 15:01:10
 */

// 라이브러리 모듈
import { useRecoilValue } from 'recoil';

// 사용자 모듈
import MenuList from './MenuList';
import { TITLE } from '@commons/env';
import { React } from '@commons/icons';
import { darkAtom } from '@commons/state';

// 스타일
import styles from '@styles/components/header/Header.module.scss';

/**
 * 헤더 JSX 반환 함수
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Header(): JSX.Element | null
{
	const darkState = useRecoilValue(darkAtom);

	return (
		<header className={styles[`root-${darkState ? 'dark' : 'light'}`]} data-top="true">
			<div className={styles.wrapper}>
				<React className={styles.logo} width={48} height={48} />

				<h4 className={styles.title}>{TITLE}</h4>

				<MenuList />
			</div>
		</header>
	);
}