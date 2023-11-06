/**
 * 뷰 스크리너 template 컴포넌트
 *
 * @author RWB
 * @since 2023.08.28 Mon 21:17:21
 */

import Screener from '@kapoo/molecule/Screener';
import ScreenerBox from '@kapoo/organism/global/ScreenerBox';
import { dateParse } from '@kapoo/util/common';
import { FrontmatterProps } from '@kapoo/util/markdown';

import { CSSProperties, ReactNode, useMemo } from 'react';

export interface ViewScrennerTemplateProps
{
	/**
	 * 마크다운 메타
	 */
	frontmatter: FrontmatterProps;
}

/**
 * 뷰 스크리너 template 컴포넌트 JSX 반환 메서드
 *
 * @param {ViewScrennerTemplateProps} param0: ViewScrennerTemplateProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewScrennerTemplate({ frontmatter }: ViewScrennerTemplateProps): ReactNode
{
	const name = useMemo(() => (frontmatter.type === 'projects' ? '프로젝트' : '게시글'), [ frontmatter ]);
	const color: CSSProperties['color'] = useMemo(() => (frontmatter.type === 'projects' ? 'springgreen' : 'dodgerblue'), [ frontmatter ]);
	const date = useMemo(() =>
	{
		const parse = dateParse(frontmatter.date);

		return `⏰ ${parse.year.text}-${parse.month.text}-${parse.day.text} ${parse.hour.text}:${parse.minute.text}:${parse.second.text}`;
	}, [ frontmatter ]);

	return (
		<Screener cover={frontmatter.coverImage}>
			<ScreenerBox
				color={color}
				name={name}
				text={date}
				title={frontmatter.title}
			/>
		</Screener>
	);
}