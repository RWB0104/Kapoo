/**
 * 개발 스택 template 컴포넌트
 *
 * @author RWB
 * @since 2024.05.03 Fri 18:51:47
 */

import { DevStackCategory } from '@kapoo/api';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import DevStackGrid, { DevStackGridProps } from '../../organism/DevStackGrid';

export interface DevStackTemplateProps
{
	/**
	 * 카테고리
	 */
	category: DevStackCategory;

	/**
	 * 개발 스택 리스트
	 */
	list: DevStackGridProps['list'];
}

/**
 * 개발 스택 template 컴포넌트 반환 메서드
 *
 * @param {DevStackTemplateProps} param0: DevStackTemplateProps
 *
 * @returns {JSX.Element} JSX
 */
export default function DevStackTemplate({ category, list }: DevStackTemplateProps): JSX.Element
{
	return (
		<Stack alignItems='center' data-component='DevStackTemplate' gap={4}>
			<Typography fontWeight='bold' letterSpacing={10} variant='h4'>{category.toLocaleUpperCase()}</Typography>

			<DevStackGrid list={list} />
		</Stack>
	);
}