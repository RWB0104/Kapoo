import styles from './piedit-ui-pack.module.scss';

/* eslint-disable-next-line */
export interface PieditUiPackProps {}

export function PieditUiPack(props: PieditUiPackProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to PieditUiPack!</h1>
    </div>
  );
}

export default PieditUiPack;
