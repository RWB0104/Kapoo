/**
 * 컨텐츠 그룹 컴포넌트
 *
 * @author RWB
 * @since 2021.07.24 Sat 10:01:18
 */

import { ContentProps } from '@commons/common';
import { themeAtom } from '@commons/state';
import styles from '@styles/components/contents/ContentGroup.module.scss';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';

interface Props
{
	urls: string[],
	group?: ContentProps[] | null
}

/**
 * 컨텐츠 그룹 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function ContentGroup({ urls, group }: Props): JSX.Element | null
{
	const themeState = useRecoilValue(themeAtom);

	// 유효한 그룹 객체가 있을 경우
	if (group && group.length > 0)
	{
		const current = `/${group[0].header.type}/${urls.slice(2, 6).join('/')}`;

		const groups = group.map((item, index) =>
		{
			const title = item.header.title;
			const url = `/${item.header.type}/${item.url.slice(1, 5).join('/')}`;

			return (
				<li key={index}>
					{current === url ? (
						<p title={title}>👀 <b>{title}</b></p>
					) : (
						<Link href={url}>
							<a title={title}>{title}</a>
						</Link>
					)}
				</li>
			);
		});

		const groupTitle = group[0].header.group;

		return (
			<article className={styles[`root-${themeState}`]}>
				<div className={styles.meta}>
					<div className={styles.dimmer}>
						<div className={styles.prompt}>
							<h3 className={styles.title}>시리즈 톺아보기</h3>
							<p>{groupTitle}</p>
						</div>
					</div>

					<img className={styles.image} src={group[0].header.coverImage} title={groupTitle} />
				</div>

				<div className={styles.body}>
					<ul className={styles.list}>{groups}</ul>
				</div>
			</article>
		);
	}

	// 없을 경우
	else
	{
		return null;
	}
}