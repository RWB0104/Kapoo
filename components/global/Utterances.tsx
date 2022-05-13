/**
 * Utterances 컴포넌트
 *
 * @author RWB
 * @since 2021.07.25 Sun 19:42:46
 */

import { themeAtom } from '@commons/state';
import styles from '@styles/components/contents/Utterances.module.scss';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

interface Props
{
	flag: boolean
}

/**
 * Utterances JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function Utterances({ flag }: Props): JSX.Element | null
{
	const themeState = useRecoilValue(themeAtom);

	useEffect(() =>
	{
		// 댓글을 사용할 경우
		if (flag)
		{
			// 댓글 DOM이 있을 경우
			if (document.querySelectorAll('#utterances > div').length !== 0)
			{
				const frame = document.querySelector('#utterances iframe') as HTMLIFrameElement | null;

				// 태그가 유효할 경우
				if (frame !== null)
				{
					frame.contentWindow?.postMessage({ theme: `github-${themeState}`, type: 'set-theme' }, 'https://utteranc.es/');
				}
			}
		}
	}, [ themeState ]);

	return flag ? (
		<article className={styles.root} id="utterances" ref={(ref) =>
		{
			// 태그가 유효하고, 댓글을 사용하고, 댓글 컴포넌트가 렌더링되지 않았을 경우
			if (ref && flag && document.querySelectorAll('#utterances > div').length === 0)
			{
				const wrapper = document.createElement('div');

				const script = document.createElement('script');
				script.src = 'https://utteranc.es/client.js';
				script.async = true,
				script.setAttribute('repo', 'RWB0104/RWB0104.github.io-comments');
				script.setAttribute('issue-term', 'pathname');
				script.setAttribute('theme', `github-${themeState}`);
				script.setAttribute('crossOrigin', 'anonymous');

				wrapper.appendChild(script);
				ref.appendChild(wrapper);
			}
		}} />
	) : null;
}