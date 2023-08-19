/**
 * 컨텐츠 레이아웃 컴포넌트
 *
 * @author RWB
 * @since 2021.07.17 Sat 04:09:04
 */

import { Adsense } from '@ctrl/react-adsense';
import { ContentProps, ContentTypeEnum } from '@kapoo/commons/common';
import Comment from '@kapoo/components/global/Comment';
import Hits from '@kapoo/components/global/Hits';
import styles from '@kapoo/styles/components/contents/ContentLayout.module.scss';
import classNames from 'classnames/bind';

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

	const cn = classNames.bind(styles);

	const page = {
		next: data.meta?.next,
		prev: data.meta?.prev,
		type: data.header.type
	};

	return (
		<article className={cn('root')}>
			<ContentGroup group={data.meta?.group} urls={urls} />

			<ContentToc toc={data.toc} />

			<Hits urls={urls} />

			<ContentViewer content={data.content as string} />

			<Adsense client='ca-pub-5522045122225064' format='auto' slot='8348565597' />

			<ContentMeta header={data.header} />

			<ContentMover page={page} />

			<Comment flag={data.header.comment} />
		</article>
	);
}