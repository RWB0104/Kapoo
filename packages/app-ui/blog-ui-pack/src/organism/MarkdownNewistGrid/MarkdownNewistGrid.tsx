/**
 * 최신 마크다운 그리드 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.08.28 Wed 15:27:28
 */

import MarkdownGrid, { MarkdownGridProps } from '../MarkdownGrid';

export interface MarkdownNewistGridProps extends MarkdownGridProps
{
	/**
	 * 최근 기준 일자
	 */
	newistDay: number;
}

/**
 * 최신 마크다운 그리드 organism 컴포넌트 반환 메서드
 *
 * @param {MarkdownNewistGridProps} param0: MarkdownNewistGridProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownNewistGrid({ newistDay, list, ...props }: MarkdownNewistGridProps): JSX.Element
{
	const newistList = list
		.filter(({ meta: { date } }) => Date.now() - date < 86400000 * newistDay)
		.sort((prev, next) => next.meta.date - prev.meta.date);

	return (
		<MarkdownGrid data-component='MarkdownNewistGrid' list={newistList} {...props} />
	);
}