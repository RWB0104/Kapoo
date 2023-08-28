/**
 * 뷰 template 컴포넌트
 *
 * @author RWB
 * @since 2023.08.28 Mon 21:13:22
 */

import ViewCommentTemplate from '@kapoo/template/view/ViewCommentTemplate';
import ViewContentTemplate from '@kapoo/template/view/ViewContentTemplate';
import ViewScrennerTemplate from '@kapoo/template/view/ViewScrennerTemplate';

import Stack from '@mui/material/Stack';
import { ReactNode } from 'react';

/**
 * 뷰 template 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewTemplate(): ReactNode
{
	return (
		<Stack alignItems='center' data-component='ViewTemplate' spacing={10}>
			<ViewScrennerTemplate />
			<ViewContentTemplate />
			<ViewCommentTemplate />
		</Stack>
	);
}