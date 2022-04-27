/**
 * 커밋 리스트 컴포넌트
 *
 * @author RWB
 * @since 2022.04.10 Sun 19:17:35
 */

import { Container } from '@material-ui/core';
import { useEffect, useState } from 'react';

// 스타일
import styles from '@styles/components/about/commitlist.module.scss';
import { AccountTree } from '@material-ui/icons';

/**
 * 커밋 리스트 JSX 반환 메서드
 *
 * @returns {JSX.Element | null} JSX
 */
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
				if (json.length > 10)
				{
					json = json.slice(0, 10);
				}

				setCommits(json);
			}
		})();
	}, []);

	return commits.length > 0 ? (
		<Container maxWidth="md" className={styles.root}>
			{commits.map((commit, index) => (
				<div key={index} className={styles.item} data-index={index} data-sha={commit.sha}>
					<div>
						<AccountTree htmlColor="limegreen" />
					</div>

					<div className={styles.content}>
						<p>{commit.sha}</p>

						{commit.commit.message.split('\\n').map((spt, index1) => <p key={index1}>{spt}</p>)}
					</div>
				</div>
			))}
		</Container>
	) : null;
}