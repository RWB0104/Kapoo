/**
 * 명함 컴포넌트
 *
 * @author RWB
 * @since 2022.05.14 Sat 02:26:30
 */

import { themeAtom } from '@commons/state';
import styles from '@styles/components/about/NameCard.module.scss';
import classNames from 'classnames/bind';
import { IoLogoGithub, IoLogoLinkedin, IoLogoReact } from 'react-icons/io5';
import { SiGmail } from 'react-icons/si';
import { useRecoilValue } from 'recoil';

/**
 * 명함 컴포넌트 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function NameCard(): JSX.Element
{
	const themeState = useRecoilValue(themeAtom);

	const cn = classNames.bind(styles);

	return (
		<article className={cn('root', themeState)}>
			<div className={cn('wrapper')}>
				<div className={cn('image-wrapper')}>
					<img alt='profile' src='https://user-images.githubusercontent.com/50317129/167695995-bb7080e0-dd19-455e-abdc-b16a0cafd98d.png' title='profile' />
				</div>

				<div className={cn('content-wrapper')}>
					<div className={cn('head')}>
						<h3>RWB</h3>
					</div>

					<div className={cn('body')}>
						<p>To be FullStack Developer</p>
						<p>2019.03 ~ now</p>

						<img alt='sign' src='https://itcode.dev/images/signature.png' />
					</div>

					<div className={cn('footer')}>
						<a href='https://github.com/RWB0104' rel='noreferrer' target='_blank' title='GitHub'>
							<IoLogoGithub />
						</a>

						<a href='https://www.linkedin.com/in/itcode/' rel='noreferrer' target='_blank' title='Linkedin'>
							<IoLogoLinkedin />
						</a>

						<a href='mailto:psj2716@gmail.com' rel='noreferrer' target='_blank' title='Mail'>
							<SiGmail />
						</a>

						<a href='https://itcode.dev' rel='noreferrer' target='_blank' title='Project Page'>
							<IoLogoReact />
						</a>
					</div>
				</div>
			</div>
		</article>
	);
}