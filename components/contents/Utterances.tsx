/**
 * Utterances 컴포넌트
 *
 * @author RWB
 * @since 2021.07.25 Sun 19:42:46
 */

// 라이브러리 모듈
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

// 사용자 모듈
import { themeAtom } from '@commons/state';

// 스타일
import styles from '@styles/components/contents/Utterances.module.scss';

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
					frame.contentWindow?.postMessage({ type: 'set-theme', theme: `github-${themeState}` }, 'https://utteranc.es/');
				}
			}
		}
	}, [ themeState ]);

	return flag ? (
		<article className={styles.root} id="utterances" ref={(ref) =>
		{
			if (ref)
			{
				// 댓글을 사용할 경우
				if (flag)
				{
					// 댓글 DOM이 없을 경우
					if (document.querySelectorAll('#utterances > div').length === 0)
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

					// 댓글 DOM이 있을 경우
					else
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

						ref.innerHTML = '';
						ref.appendChild(wrapper);
					}
				}
			}
		}} />
	) : null;
}