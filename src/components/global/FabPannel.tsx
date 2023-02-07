/**
 * Fab 패널 컴포넌트
 *
 * @author RWB
 * @since 2022.05.06 Fri 13:36:27
 */

import styles from '@kapoo/styles/components/global/FabPannel.module.scss';
import classNames from 'classnames/bind';

interface Props
{
	children: JSX.Element | JSX.Element[] | null
}

/**
 * Fab 패널 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function FabPannel({ children }: Props): JSX.Element
{
	const cn = classNames.bind(styles);

	return <div className={cn('root')}>{children}</div>;
}