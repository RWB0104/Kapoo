/**
 * 공유 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.29 Mon 17:20:29
 */

'use client';

import { doCopy, doShareOrCopy } from '@kapoo/common';
import LinkIcon from '@mui/icons-material/Link';
import Share from '@mui/icons-material/Share';
import Stack, { StackProps } from '@mui/material/Stack';
import { CSSProperties, useCallback } from 'react';

import SymbolicButton from '../../atom/SymbolicButton';

export type ShareBoxType = 'link' | 'share'
export type ShareBoxHandler = (type: ShareBoxType) => void;

export interface ShareBoxProps extends StackProps
{
	/**
	 * 색상
	 */
	iconColor?: CSSProperties['color'];

	/**
	 * 공유 데이터
	 */
	shareData: ShareData;

	/**
	 * 성공 콜백 메서드
	 */
	onSuccess?: ShareBoxHandler;

	/**
	 * 실패 콜백 메서드
	 */
	onFail?: ShareBoxHandler;
}

/**
 * 공유 박스 organism 컴포넌트 반환 메서드
 *
 * @param {ShareBoxProps} param0: ShareBoxProps
 *
 * @returns {JSX.Element} JSX
 */
export default function ShareBox({ iconColor, shareData, onSuccess, onFail, ...props }: ShareBoxProps): JSX.Element
{
	const handleLinkClick = useCallback(() =>
	{
		doCopy(shareData.url || window.location.href, () => onSuccess?.('link'), () => onFail?.('link'));
	}, [ shareData, onSuccess, onFail ]);

	const handleShareClick = useCallback(() =>
	{
		doShareOrCopy(shareData, () => onSuccess?.('share'), () => onFail?.('share'), () => onSuccess?.('link'));
	}, [ shareData, onSuccess, onFail ]);

	return (
		<Stack data-component='ShareBox' {...props}>
			<SymbolicButton borderColor={iconColor} onClick={handleLinkClick}>
				<LinkIcon htmlColor={iconColor} />
			</SymbolicButton>

			<SymbolicButton borderColor={iconColor} onClick={handleShareClick}>
				<Share htmlColor={iconColor} />
			</SymbolicButton>
		</Stack>
	);
}