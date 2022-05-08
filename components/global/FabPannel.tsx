/**
 * Fab 패널 컴포넌트
 *
 * @author RWB
 * @since 2022.05.06 Fri 13:36:27
 */

// 스타일
import styles from '@styles/components/global/FabPannel.module.scss';

interface Props
{
	children: JSX.Element | JSX.Element[] | null
}

/**
 * Fab 패널 JSX 반환 메서드
 *
 * @returns {JSX.Element | null} JSX
 */
export default function FabPannel({ children }: Props): JSX.Element | null
{
	return <div className={styles.root}>{children}</div>;
}