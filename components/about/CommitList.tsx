/**
 * 커밋 리스트 컴포넌트
 *
 * @author RWB
 * @since 2022.04.10 Sun 19:17:35
 */

import { useEffect, useState } from 'react';

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
				const json = await response.json();

				setCommits(json);
			}
		})();
	}, []);

	return commits.length > 0 ? (
		<article id='commits'>
			{commits.map((commit, index) => (
				<div key={index} className='item' data-index={index} data-sha={commit.sha}>
					<h4>{commit.sha}</h4>

					{commit.commit.message.split('\\n').map((spt, index) => <p>{spt}</p>)}
				</div>
			))}
		</article>
	) : null;
}