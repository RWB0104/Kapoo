import styles from './blog-ui-pack.module.scss';

/* eslint-disable-next-line */
export interface BlogUiPackProps {}

export function BlogUiPack(props: BlogUiPackProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to BlogUiPack!</h1>
    </div>
  );
}

export default BlogUiPack;
