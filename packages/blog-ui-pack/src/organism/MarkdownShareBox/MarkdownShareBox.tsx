/**
 * 마크다운 공유 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.29 Mon 17:52:30
 */

'use client';

import ShareBox, { ShareBoxHandler, ShareBoxProps } from '@kapoo/ui-pack/organism/ShareBox';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import LinkIcon from '@mui/icons-material/Link';
import Share from '@mui/icons-material/Share';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

export type MarkdownShareBoxProps = Omit<ShareBoxProps, 'onSuccess' | 'onError'>;

/**
 * 마크다운 공유 박스 organism 컴포넌트 반환 메서드
 *
 * @param {MarkdownShareBoxProps} param0: MarkdownShareBoxProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownShareBox({ shareData, ...props }: MarkdownShareBoxProps): JSX.Element
{
	const handleFail = useCallback<ShareBoxHandler>((type) =>
	{
		let text = '알 수 없는 공유 동작이에요...';

		// 링크 복사일 경우
		if (type === 'link')
		{
			text = `[${shareData.title}] 페이지 링크 복사에 실패했어요...`;
		}

		// 공유일 경우
		else if (type === 'share')
		{
			text = `[${shareData.title}] 페이지으 공유에 실패했어요...`;
		}

		toast(text, { icon: <ErrorOutline htmlColor='crimson' />, type: 'error' });
	}, [ shareData.title ]);

	const handleSuccess = useCallback<ShareBoxHandler>((type) =>
	{
		// 링크 복사일 경우
		if (type === 'link')
		{
			toast(`[${shareData.title}] 페이지의 링크를 복사했어요!`, { icon: <LinkIcon color='success' />, type: 'success' });
		}

		// 공유일 경우
		else if (type === 'share')
		{
			toast(`[${shareData.title}] 페이지를 공유했어요!`, { icon: <Share color='success' />, type: 'success' });
		}

		// 알 수 없는 동작일 경우
		else
		{
			handleFail(type);
		}
	}, [ shareData.title, handleFail ]);

	return (
		<ShareBox shareData={shareData} onFail={handleFail} onSuccess={handleSuccess} {...props} />
	);
}