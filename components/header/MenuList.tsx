/**
 * 메뉴 리스트 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 20:07:12
 */

import { useSemanticHook } from '@commons/hook';
import { MENU_LIST } from '@commons/menulist';
import { menuAtom } from '@commons/state';
import styles from '@styles/components/header/MenuList.module.scss';
import Link from 'next/link';
import { IoClose, IoMenu } from 'react-icons/io5';
import { useRecoilState } from 'recoil';

/**
 * 메뉴 리스트 JSX 반환 함수
 *
 * @returns {JSX.Element | null}: JSX
 */
export default function MenuList(): JSX.Element | null
{
	const semantic = useSemanticHook();

	const [ menuState, setMenuState ] = useRecoilState(menuAtom);

	return semantic ? (
		<nav className={styles.root}>
			{MENU_LIST.map((element) => (
				<Link href={element.url} key={element.id}>
					<a className={styles.link} title={element.title}>{element.icon}</a>
				</Link>
			))}
		</nav>
	) : (
		<button className={styles.button} onClick={() => setMenuState(menuState === undefined ? true : !menuState)}>
			{menuState ? <IoClose /> : <IoMenu />}
		</button>
	);
}