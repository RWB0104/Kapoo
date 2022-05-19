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
import classNames from 'classnames/bind';
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
	const cn = classNames.bind(styles);

	const semantic = useSemanticHook();

	const [ menuState, setMenuState ] = useRecoilState(menuAtom);

	return semantic ? (
		<nav className={cn('root')}>
			{MENU_LIST.map((element) => (
				<Link href={element.url} key={element.id} passHref>
					<a className={cn('link')} href='#replace' title={element.title}>{element.icon}</a>
				</Link>
			))}
		</nav>
	) : (
		<button className={cn('button')} onClick={() => setMenuState(menuState === undefined ? true : !menuState)}>
			{menuState ? <IoClose /> : <IoMenu />}
		</button>
	);
}