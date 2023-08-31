/**
 * 업 버튼 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.31 Thu 15:03:10
 */

'use client';

import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import Fab from '@mui/material/Fab';
import { ReactNode, useCallback } from 'react';

/**
 * 업 버튼 organism 컴포넌트
 *
 * @returns {ReactNode} ReactNode
 */
export default function Whoop(): ReactNode
{
	const handleClick = useCallback(() =>
	{
		window.scrollTo({ behavior: 'smooth', top: 0 });
	}, []);

	return (
		<Fab data-component='Whoop' size='small' onClick={handleClick}>
			<KeyboardArrowUp />
		</Fab>
	);
}