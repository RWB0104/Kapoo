/**
 * 컨텐츠 레이아웃 컴포넌트
 *
 * @author RWB
 * @since 2021.07.17 Sat 04:09:04
 */

// 사용자 모듈
import ContentViewer from './ContentViewer';
import ContentToc from './ContentToc';
import ContentGroup from './ContentGroup';
import ContentMeta from './ContentMeta';
import ContentMover from './ContentMover';
import Utterances from './Utterances';
import { ContentProps } from '@commons/common';
import Hits from '../global/Hits';

// 스타일
import styles from '@styles/components/contents/ContentLayout.module.scss';

interface Props
{
	data: ContentProps
}

/**
 * 컨텐츠 레이아웃 JSX 반환 함수
 *
 * @param {ContentProps} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function ContentLayout({ data }: Props): JSX.Element | null
{
	const urls = [ data.header.type ].concat(data.url);

	const page = {
		type: data.header.type,
		prev: data.meta?.prev,
		next: data.meta?.next
	};

	return (
		<article className={styles.root}>
			<ContentToc toc={data.toc} />

			<Hits urls={urls} />

			<ContentViewer content={data.content as string} />

			<ContentGroup urls={urls} group={data.meta?.group} />

			<ContentMeta header={data.header} />

			<ContentMover page={page} />

			<Utterances flag={data.header.comment} />
		</article>
	);
}