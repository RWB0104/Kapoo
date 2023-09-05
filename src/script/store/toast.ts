/**
 * 토스트 상태관리 모듈
 *
 * @author RWB
 * @since 2023.09.06 Wed 02:28:15
 */

import { AlertColor } from '@mui/material/Alert';
import { SnackbarOrigin } from '@mui/material/Snackbar';
import { create } from 'zustand';

export interface ToastProps
{
	/**
	 * 제목
	 */
	title?: string;

	/**
	 * 알림 색상
	 */
	severity?: AlertColor;

	/**
	 * 지속시간
	 */
	duration?: number;

	/**
	 * 위치
	 */
	anchorOrigin?: SnackbarOrigin;

	/**
	 * 내용
	 */
	content?: JSX.Element;
}

export type SetToastHandler = (toast?: ToastProps) => void;

export interface ToastStateProps
{
	/**
	 * 토스트
	 */
	toast?: ToastProps;

	/**
	 * 토스트 할당 메서드
	 */
	setToast: SetToastHandler;
}

export const toastState = create<ToastStateProps>((set) => ({
	setToast: (toast): void =>
	{
		set({ toast });
	}
}));