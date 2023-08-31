/**
 * 토스터 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.07.30 Sun 21:24:45
 */

'use client';

import { toastState } from '@kapoo/store/toast';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import { ReactNode, SyntheticEvent, useCallback } from 'react';

/**
 * 토스터 organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} JSX
 */
export default function Toaster(): ReactNode
{
	const { toast, setToast } = toastState();

	const handleClose = useCallback((event: Event | SyntheticEvent<Element, Event>, reason: SnackbarCloseReason = 'escapeKeyDown') =>
	{
		// 단순 클릭일 경우
		if (reason && reason === 'clickaway')
		{
			return;
		}

		setToast(undefined);
	}, [ setToast ]);

	return (
		<Snackbar
			anchorOrigin={toast?.anchorOrigin || { horizontal: 'right', vertical: 'top' }}
			autoHideDuration={toast?.duration || 3000}
			data-component='Toaster'
			open={toast !== undefined}
			sx={{ marginTop: 8 }}
			onClose={handleClose}
		>
			<Alert severity={toast?.severity} onClose={handleClose}>
				{toast?.title ? (
					<AlertTitle>
						<Typography fontWeight='bold'>{toast.title}</Typography>
					</AlertTitle>
				) : null}

				{toast?.content || null}
			</Alert>
		</Snackbar>
	);
}