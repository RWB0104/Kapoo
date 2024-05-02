import styles from './global-ui-pack.module.scss';

/* eslint-disable-next-line */
export interface GlobalUiPackProps {}

export function GlobalUiPack(props: GlobalUiPackProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to GlobalUiPack!</h1>
    </div>
  );
}

export default GlobalUiPack;
