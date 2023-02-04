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
import classNames from 'classnames/bind';
import { useRecoilValue } from 'recoil';

import MenuList from './MenuList';

/**
 * 헤더 JSX 반환 함수
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Header(): JSX.Element | null
{
	const cn = classNames.bind(styles);

	const themeState = useRecoilValue(themeAtom);
	const scrollState = useScrollTopHook();

	return (
		<header className={cn('root', themeState)} data-top={scrollState}>
			<div className={cn('wrapper')}>
				<img alt='logo' height={32} src='/img/icon-48x48.png' width={32} />

				<h4 className={cn('title')}>{TITLE}</h4>

				<MenuList />
			</div>
		</header>
	);
}