/**
 * 컨텐츠 그룹 컴포넌트
 *
 * @author RWB
 * @since 2021.07.24 Sat 10:01:18
 */

// 라이브러리 모듈
import Link from 'next/link';

// 사용자 모듈
import { ContentProps } from '@commons/common';

// 스타일
import styles from '@styles/components/contents/ContentGroup.module.scss';

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
	urls.splice(1, 1);

	const current = `/${urls.join('/')}`;

	// 유효한 그룹 객체가 있을 경우
	if (group && group.length > 0)
	{
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
			<article className={styles.root}>
				<div className={styles.meta}>
					<div className={styles.dimmer}>
						<div className={styles.prompt}>
							<h3 className={styles.title}>시리즈 톺아보기</h3>
							<p>{groupTitle}</p>
						</div>
					</div>

					<img className={styles.image} title={groupTitle} src={group[0].header.coverImage} />
				</div>

				<ul className={styles.list}>{groups}</ul>
			</article>
		);
	}

	// 없을 경우
	else
	{
		return null;
	}
}