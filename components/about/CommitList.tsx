/**
 * 커밋 리스트 컴포넌트
 *
 * @author RWB
 * @since 2022.04.10 Sun 19:17:35
 */

// 라이브러리 모듈
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

// 사용자 모듈
import { getDateDetail } from '@commons/common';
import { themeAtom } from '@commons/state';

// 스타일
import styles from '@styles/components/about/CommitList.module.scss';

interface CommitProps
{
	sha: string,
	commit: {
		author: {
			date: string
		},
		message: string
	},
	author: {
		html_url: string,
		avatar_url: string,
		login: string
	},
	html_url: string
}

export default function CommitList(): JSX.Element | null
{
	const [ commits, setCommits ] = useState([] as CommitProps[]);
	const themeState = useRecoilValue(themeAtom);

	useEffect(() =>
	{
		(async () =>
		{
			const response = await fetch('https://api.github.com/repos/RWB0104/blog.itcode.dev/commits');

			// 응답이 유효할 경우
			if (response.ok)
			{
				let json = await response.json();

				// 커밋 이력이 10개보다 많을 경우
				if (json.length > 20)
				{
					json = json.slice(0, 20);
				}

				console.dir(commits);

				setCommits(json);
			}
		})();
	}, []);

	return commits.length > 0 ? (
		<article className={styles.root}>
			<h3>History of Repository</h3>

			{commits.map((commit, index) =>
			{
				const { year, month, day, week, hour, minute, second } = getDateDetail(commit.commit.author.date);
				const date = `${year}-${month}-${day} ${week} ${hour}:${minute}:${second}`;

				return (
					<div key={index} className={styles[`item-${themeState}`]} data-index={index} data-sha={commit.sha}>
						<div className={styles.header}>
							<a href={commit.author.html_url} target="_blank"><img src={commit.author.avatar_url} /></a>
							<p><b><a href={commit.author.html_url} target="_blank">{commit.author.login}</a></b> has commits <small>at {date}</small></p>
						</div>

						<div className={styles[`content-${themeState}`]}>
							<div>
								<h4><a href={commit.html_url} target="_blank">{commit.commit.message.split('\n')[0]}</a></h4>
							</div>

							<div>
								{commit.commit.message.split('\n').map((spt, index1) => index1 > 0 && <p key={index1}><small>{spt}</small></p>)}
							</div>

							<div>
								<p><small></small><small>{commit.sha}</small></p>
							</div>
						</div>
					</div>
				);
			})}
		</article>
	) : null;
}