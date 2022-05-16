/**
 * 명함 컴포넌트
 *
 * @author RWB
 * @since 2022.05.14 Sat 02:26:30
 */

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
		<article className={styles[`root-${themeState}`]}>
			<div className={styles.wrapper}>
				<div className={styles['image-wrapper']}>
					<img src="https://user-images.githubusercontent.com/50317129/167695995-bb7080e0-dd19-455e-abdc-b16a0cafd98d.png" title="profile" />
				</div>

				<div className={styles['content-wrapper']}>
					<div className={styles.head}>
						<h3>RWB</h3>
					</div>

					<div className={styles.body}>
						<p>To be FullStack Developer</p>
						<p>2019.03 ~ now</p>

						<img src="https://itcode.dev/images/signature.png" />
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