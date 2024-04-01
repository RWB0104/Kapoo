import styles from './root-ui-pack.module.scss';

/* eslint-disable-next-line */
export interface RootUiPackProps {}

export function RootUiPack(props: RootUiPackProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to RootUiPack!</h1>
    </div>
  );
}

export default RootUiPack;
