/**
 * 푸터 컴포넌트
 *
 * @author RWB
 * @since 2021.07.11 Sun 16:52:22
 */

import { TITLE } from '@commons/env';
import { themeAtom } from '@commons/state';
import Hits from '@components/global/Hits';
import styles from '@styles/components/footer/Footer.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FaCopyright, FaHashtag, FaRss, FaSitemap } from 'react-icons/fa';
import { IoLogoGithub, IoLogoLinkedin, IoLogoReact } from 'react-icons/io5';
import { SiGmail } from 'react-icons/si';
import { useRecoilValue } from 'recoil';

/**
 * 푸터 JSX 반환 함수
 *
 * @returns {JSX.Element} JSX
 */
export default function Footer(): JSX.Element
{
	const themeState = useRecoilValue(themeAtom);

	const [ hashState, setHashState ] = useState(undefined as string | undefined);

	const cn = classNames.bind(styles);

	useEffect(() =>
	{
		(async () =>
		{
			const list = await fetch('/build.txt');
			const text = await list.text();

			setHashState(text);
		})();
	}, []);

	return (
		<footer className={cn('root')}>
			<div className={cn('line', themeState)}>
				<hr />

				<img alt={TITLE} className={cn('logo')} src='/img/profile.jpg' />

				<hr />
			</div>

			<div className={cn('buttons')}>
				<a className={cn('button')} href='https://github.com/RWB0104' target='_blank' title='GitHub'>
					<IoLogoGithub />
				</a>

				<a className={cn('button')} href='https://www.linkedin.com/in/itcode/' target='_blank' title='Linkedin'>
					<IoLogoLinkedin />
				</a>

				<a className={cn('button')} href='mailto:psj2716@gmail.com' target='_blank' title='Mail'>
					<SiGmail />
				</a>
			</div>

			<div className={cn('buttons')}>
				<a className={cn('button')} href='https://itcode.dev' target='_blank' title='Project Page'>
					<IoLogoReact />
				</a>

				<a className={cn('button')} href='/sitemap.xml' target='_blank' title='Sitemap'>
					<FaSitemap />
				</a>

				<a className={cn('button')} href='/rss.xml' target='_blank' title='RSS'>
					<FaRss />
				</a>
			</div>

			<div className={cn('info')}>
				<p className={cn('text')}>
					<FaCopyright />
					{' '}
					Copyright RWB 2021.05
				</p>

				{hashState && (
					<p className={cn('text')}>
						<FaHashtag />
						{' '}
						{hashState}
					</p>
				)}

				<Hits />
			</div>
		</footer>
	);
}