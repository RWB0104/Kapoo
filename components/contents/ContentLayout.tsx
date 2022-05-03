/**
 * 컨텐츠 레이아웃 컴포넌트
 *
 * @author RWB
 * @since 2021.07.17 Sat 04:09:04
 */

// 라이브러리 모듈
import { Box, Container } from '@material-ui/core';

// 사용자 모듈
import ContentViewer from './ContentViewer';
import ContentToc from './ContentToc';
import ContentGroup from './ContentGroup';
import ContentMeta from './ContentMeta';
import ContentMover from './ContentMover';
import Utterances from './Utterances';
import { PageStaticProps } from '@commons/common';
import Hits from '../global/Hits';

/**
 * 컨텐츠 레이아웃 JSX 반환 함수
 *
 * @param {PageStaticProps} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function ContentLayout({ page, data, group }: PageStaticProps): JSX.Element | null
{
	const urls = [ page.type ].concat(data.url);

	return (
		<Box position="relative">
			<Container maxWidth="md">
				<ContentToc toc={data.toc} />

				<Hits urls={urls} />

				<ContentViewer content={data.content} />

				<ContentGroup group={group} />

				<ContentMeta header={data.header} />

				<ContentMover page={page} />

				<Utterances flag={data.header.comment} />
			</Container>
		</Box>
	);
}