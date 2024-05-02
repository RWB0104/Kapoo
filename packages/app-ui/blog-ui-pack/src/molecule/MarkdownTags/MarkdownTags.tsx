/**
 * 마크다운 태그 molecule 컴포넌트
 *
 * @author RWB
 * @since 2024.04.30 Tue 21:36:17
 */

import Chip, { ChipProps } from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import classNames from 'classnames/bind';

import styles from './MarkdownTags.module.scss';

const cn = classNames.bind(styles);

export interface MarkdownTagsProps
{
	/**
	 * 태그
	 */
	tags: string[];

	/**
	 * 색상
	 */
	color?: ChipProps['color'];

	/**
	 * 종류
	 */
	variant?: ChipProps['variant'];
}

/**
 * 마크다운 태그 molecule 컴포넌트 반환 메서드
 *
 * @param {MarkdownTagsProps} param0: MarkdownTagsProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownTags({ tags, color, variant }: MarkdownTagsProps): JSX.Element
{
	return (
		<Stack data-component='MarkdownTags' direction='row' flexWrap='wrap' gap={1} width='100%'>
			{tags.map((i) => (
				<Chip
					className={cn('tag')}
					color={color}
					key={i}
					label={`# ${i}`}
					size='small'
					variant={variant}
				/>
			))}
		</Stack>
	);
}