/**
 * 이미지 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.08 Mon 09:53:02
 */

'use client';

import Stack, { StackProps } from '@mui/material/Stack';
import classNames from 'classnames/bind';
import { DetailedHTMLProps, ImgHTMLAttributes, ReactEventHandler, useCallback, useEffect, useRef, useState } from 'react';

import styles from './Img.module.scss';

import DotLottieIcon from '../../atom/DotLottieIcon/DotLottieIcon';

const cn = classNames.bind(styles);

export interface ImgProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
{
	containerProps?: StackProps;
}

type StatusType = 'loading' | 'error' | 'success';

/**
 * 이미지 organism 컴포넌트 반환 메서드
 *
 * @param {ImgProps} param0: ImgProps
 *
 * @returns {JSX.Element} JSX
 */
export default function Img({ containerProps, alt, width, height, className, onError, onLoad, ...props }: ImgProps): JSX.Element
{
	const [ statusState, setStatusState ] = useState<StatusType>('loading');

	const imageRef = useRef<HTMLImageElement | null>(null);

	const handleError: ReactEventHandler<HTMLImageElement> = useCallback((e) =>
	{
		setStatusState('error');

		// onError 메서드가 유효할 경우
		if (onError)
		{
			onError(e);
		}
	}, [ onError, setStatusState ]);

	const handleLoad: ReactEventHandler<HTMLImageElement> = useCallback((e) =>
	{
		setStatusState(e.currentTarget.complete ? 'success' : 'loading');

		// onLoad 메서드가 유효할 경우
		if (onLoad)
		{
			onLoad(e);
		}
	}, [ onLoad, setStatusState ]);

	useEffect(() =>
	{
		if (imageRef.current)
		{
			setStatusState(imageRef.current.complete ? 'success' : 'loading');
		}
	}, [ imageRef, setStatusState ]);

	return (
		<Stack
			data-component='Img'
			height={height}
			position='relative'
			width={width}
			{...containerProps}
		>
			<img
				alt={alt}
				className={cn('img', { loading: statusState !== 'success' }, className)}
				data-status={statusState}
				height='100%'
				loading='lazy'
				ref={imageRef}
				width='100%'
				onError={handleError}
				onLoadCapture={handleLoad}
				{...props}
			/>

			{statusState === 'success' ? null : (
				<Stack alignItems='center' height='100%' justifyContent='center' left={0} position='absolute' top={0} width='100%'>
					<DotLottieIcon iconName='image-loading-improved' />
				</Stack>
			)}
		</Stack>
	);
}