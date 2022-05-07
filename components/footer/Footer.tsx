/**
 * 푸터 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 16:52:22
 */

// 라이브러리 모듈
import { IoLogoGithub, IoLogoLinkedin, IoLogoReact } from 'react-icons/io5';
import { SiGmail } from 'react-icons/si';
import { FaCopyright, FaHashtag, FaRss, FaSitemap } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';

// 사용자 모듈
import { TITLE } from '@commons/env';
import Hits from '@components/global/Hits';
import { themeAtom } from '@commons/state';

// 스타일
import styles from '@styles/components/footer/Footer.module.scss';

interface Props
{
	hash: string
}

/**
 * 푸터 JSX 반환 함수
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Footer({ hash }: Props): JSX.Element | null
{
	const themeState = useRecoilValue(themeAtom);

	return (
		<footer className={styles.root}>
			<div className={styles[`line-${themeState}`]}>
				<hr />

				<img className={styles.logo} alt={TITLE} src="/img/profile.jpg" />

				<hr />
			</div>

			<div className={styles.buttons}>
				<a className={styles.button} target="_blank" href="https://github.com/RWB0104" title='GitHub'>
					<IoLogoGithub />
				</a>

				<a className={styles.button} target="_blank" href="https://www.linkedin.com/in/itcode/" title='Linkedin'>
					<IoLogoLinkedin />
				</a>

				<a className={styles.button} target="_blank" href="mailto:psj2716@gmail.com" title='Mail'>
					<SiGmail />
				</a>
			</div>

			<div className={styles.buttons}>
				<a className={styles.button} target="_blank" href="https://itcode.dev" title='Project Page'>
					<IoLogoReact />
				</a>

				<a className={styles.button} target="_blank" href="/sitemap.xml" title='Sitemap'>
					<FaSitemap />
				</a>

				<a className={styles.button} target="_blank" href="/rss.xml" title='RSS'>
					<FaRss />
				</a>
			</div>

			<div className={styles.info}>
				<p className={styles.text}><FaCopyright /> Copyright RWB 2021.05</p>

				{hash && <p className={styles.text}><FaHashtag /> {hash}</p>}

				<Hits />
			</div>
		</footer>
	);
}