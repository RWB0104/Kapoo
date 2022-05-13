/**
 * 코멘트 레이아웃 컴포넌트
 *
 * @author RWB
 * @since 2022.05.14 Sat 01:47:22
 */

import Utterances from '@components/global/Utterances';
import styles from '@styles/components/comments/CommentLayout.module.scss';

/**
 * 코멘트 레이아웃 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function CommentLayout(): JSX.Element
{
	return (
		<article className={styles.root}>
			<div className={styles.prompt}>
				<h3>Comments</h3>

				<p>💬 여러분들의 생각을 자유롭게 남겨보세요!</p>
				<p>작성 시 GitHub 아이디가 필요합니다.</p>
			</div>

			<Utterances flag />
		</article>
	);
}