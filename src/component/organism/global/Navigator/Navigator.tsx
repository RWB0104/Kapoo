/**
 * 네비게이터 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.19 토 03:41:58
 */

'use client';

import Header from '@kapoo/molecule/Header';
import Sidebar from '@kapoo/molecule/Sidebar';

import Box from '@mui/material/Box';
import { ReactNode, useCallback, useState } from 'react';

/**
 * 네비게이터 organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function Navigator(): ReactNode
{
	const [ isOpenState, setOpenState ] = useState(false);

	const handleMenuClick = useCallback(() =>
	{
		setOpenState(true);
	}, [ setOpenState ]);

	const handleClose = useCallback(() =>
	{
		setOpenState(false);
	}, [ setOpenState ]);

	return (
		<Box data-component='Navigator'>
			<Header onMenuClick={handleMenuClick} />
			<Sidebar open={isOpenState} onClose={handleClose} />
		</Box>
	);
}