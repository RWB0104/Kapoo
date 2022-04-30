/**
 * 메뉴 리스트 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 20:07:12
 */

// 라이브러리 모듈
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { IoClose, IoMenu } from 'react-icons/io5';

// 사용자 모듈
import { MENU_LIST } from '@commons/env';
import { menuAtom } from '@commons/state';

// 스타일
import styles from '@styles/components/header/MenuList.module.scss';

/**
 * 메뉴 리스트 JSX 반환 함수
 *
 * @returns {JSX.Element | null}: JSX
 */
export default function MenuList(): JSX.Element | null
{
	const router = useRouter();
	const [ menuState, setMenuState ] = useRecoilState(menuAtom);

	return (
		<>
			<button className={styles.button} onClick={() => setMenuState(!menuState)}>
				{menuState ? <IoClose /> : <IoMenu />}
			</button>

			<nav className={styles.root}>
				{MENU_LIST.map((element) => <a key={element.id} className={styles.link} title={element.title} href="#" onClick={() => router.push(element.url)}>{element.icon}</a>)}
			</nav>
		</>
	);
}