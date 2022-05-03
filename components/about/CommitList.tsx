/**
 * 커밋 리스트 컴포넌트
 *
 * @author RWB
 * @since 2022.04.10 Sun 19:17:35
 */

import { useEffect, useState } from 'react';

// 스타일






export default function CommitList(): JSX.Element | null
{
	const [ commits, setCommits ] = useState([]);

	useEffect(() =>
	{
		(async () =>
		{
			const response = await fetch('https://api.github.com/repos/RWB0104/blog.itcode.dev/commits');

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

	/*
	return commits.length > 0 ? (
		<Container maxWidth="md" className={styles.root}>
			{commits.map((commit, index) => (
				<div key={index} className={styles.item} data-index={index} data-sha={commit.sha}>
					<div className={styles.header}>
						<a href={commit.author.html_url} target="_blank"><img src={commit.author.avatar_url} /></a>
						<p><b><a href={commit.author.html_url} target="_blank">{commit.author.login}</a></b> has commits <small>at {commit.commit.author.date}</small></p>
					</div>

					<div className={styles.content}>
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
			))}
		</Container>
	) : null;
	*/
	return null;
}