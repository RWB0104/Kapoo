/**
 * 컨텐츠 레이아웃 컴포넌트
 *
 * @author RWB
 * @since 2021.07.17 Sat 04:09:04
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Box, Container } from '@material-ui/core';

// 사용자 모듈
import ContentViewer from './ContentViewer';
import ContentToc from './ContentToc';
import { PageStaticProps } from '@commons/common';
import ContentGroup from './ContentGroup';
import ContentMeta from './ContentMeta';
import ContentMover from './ContentMover';
import Utterances from './Utterances';

/**
 * 컨텐츠 레이아웃 ReactElement 반환 함수
 *
 * @param {PageStaticProps} param0: 프로퍼티
 *
 * @returns {ReactElement} ReactElement
 */
export default function ContentLayout({ page, data, group }: PageStaticProps): ReactElement
{
	return (
		<Box position="relative">
			<Container maxWidth="md">
				<ContentToc toc={data.toc} />

				<ContentViewer content={data.content} />

				<ContentGroup group={group} />

				<ContentMeta header={data.header} />

				<ContentMover page={page} />

				<Utterances flag={data.header.comment} />
			</Container>
		</Box>
	);
}