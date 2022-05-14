/**
 * 정보 컴포넌트
 *
 * @author RWB
 * @since 2022.05.14 Sat 11:47:28
 */

import { DESCRIPTION, TITLE } from '@commons/env';
import styles from '@styles/components/about/Info.module.scss';
import { FaGithub, FaMarkdown, FaReact, FaSass } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript } from 'react-icons/si';

/**
 * 정보 컴포넌트 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function Info(): JSX.Element
{
	return (
		<article className={styles.root}>
			<div className={styles.head}>
				<div className={styles.icon}>
					<FaReact />
				</div>

				<div className={styles.prompt}>
					<h3>{TITLE}</h3>
					<p>{DESCRIPTION}</p>
				</div>
			</div>

			<div className={styles.associate}>
				<div>
					<h3>Associated with</h3>
				</div>

				<div className={styles.brands}>
					<a href="https://ko.reactjs.org/" target="_blank" title="React">
						<FaReact color='#00D8FF' />
					</a>

					<a data-brand="nextjs" href="https://nextjs.org/" target="_blank" title="Next.js">
						<SiNextdotjs />
					</a>

					<a data-brand="github" href="https://pages.github.com/" target="_blank" title="GitHub Pages">
						<FaGithub />
					</a>

					<a data-brand="typescript" href="https://www.typescriptlang.org/" target="_blank" title="TypeScript">
						<SiTypescript color="dodgerblue" />
					</a>

					<a data-brand="scss" href="https://sass-lang.com/" target="_blank" title="SCSS">
						<FaSass color="hotpink" />
					</a>

					<a data-brand="scss" href="https://www.markdownguide.org/" target="_blank" title="Markdown">
						<FaMarkdown />
					</a>
				</div>
			</div>
		</article>
	);
}