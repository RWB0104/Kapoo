/**
 * 컨텐츠 레이아웃 컴포넌트
 *
 * @author RWB
 * @since 2021.07.17 Sat 04:09:04
 */

import { ContentProps, ContentTypeEnum } from '@commons/common';
import Hits from '@components/global/Hits';
import Utterances from '@components/global/Utterances';
import styles from '@styles/components/contents/ContentLayout.module.scss';

import ContentGroup from './ContentGroup';
import ContentMeta from './ContentMeta';
import ContentMover from './ContentMover';
import ContentToc from './ContentToc';
import ContentViewer from './ContentViewer';

interface Props
{
	data: ContentProps
}

/**
 * 컨텐츠 레이아웃 JSX 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element} JSX
 */
export default function ContentLayout({ data }: Props): JSX.Element
{
	const type = data.header.type === ContentTypeEnum.POSTS ? 'posts' : 'projects';
	const urls = [ type ].concat(data.url);

	const page = {
		next: data.meta?.next,
		prev: data.meta?.prev,
		type: data.header.type
	};

	return (
		<article className={styles.root}>
			<ContentGroup group={data.meta?.group} urls={urls} />

			<ContentToc toc={data.toc} />

			<Hits urls={urls} />

			<ContentViewer content={data.content as string} />

			<ContentMeta header={data.header} />

			<ContentMover page={page} />

			<Utterances flag={data.header.comment} />
		</article>
	);
}