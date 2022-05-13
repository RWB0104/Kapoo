/**
 * 명함 컴포넌트
 *
 * @author RWB
 * @since 2022.05.14 Sat 02:26:30
 */

import { DESCRIPTION, TITLE } from '@commons/env';
import { themeAtom } from '@commons/state';
import styles from '@styles/components/about/NameCard.module.scss';
import { IoLogoGithub, IoLogoLinkedin, IoLogoReact } from 'react-icons/io5';
import { SiGmail } from 'react-icons/si';
import { useRecoilValue } from 'recoil';


/**
 * 명함 컴포넌트 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export function NameCard(): JSX.Element
{
	const themeState = useRecoilValue(themeAtom);

	return (
		<article className={styles.root}>
			<div className={styles[`wrapper-${themeState}`]}>
				<div className={styles['image-wrapper']}>
					<img src="https://user-images.githubusercontent.com/50317129/167695995-bb7080e0-dd19-455e-abdc-b16a0cafd98d.png" title="profile" />
				</div>

				<div className={styles['content-wrapper']}>
					<div className={styles.head}>
						<h3>{TITLE}</h3>
						<p>{DESCRIPTION}</p>
					</div>

					<div className={styles.body}>
						<p>R W B</p>
						<p>2019.03 ~ NOW</p>

						<br />

						<p>To be FullStack Develpoer</p>
					</div>

					<div className={styles.footer}>
						<a href="https://github.com/RWB0104" target="_blank" title='GitHub'>
							<IoLogoGithub />
						</a>

						<a href="https://www.linkedin.com/in/itcode/" target="_blank" title='Linkedin'>
							<IoLogoLinkedin />
						</a>

						<a href="mailto:psj2716@gmail.com" target="_blank" title='Mail'>
							<SiGmail />
						</a>

						<a href="https://itcode.dev" target="_blank" title='Project Page'>
							<IoLogoReact />
						</a>
					</div>
				</div>
			</div>
		</article>
	);
}