/**
 * 이미지 atom 컴포넌트
 *
 * @author RWB
 * @since 2023.09.20 Wed 19:31:38
 */

'use client';

import Stack from '@mui/material/Stack';
import classNames from 'classnames/bind';
import { DetailedHTMLProps, ImgHTMLAttributes, ReactEventHandler, ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import styles from './Image.module.scss';

import LottieIcon from '../LottieIcon';

const cn = classNames.bind(styles);

export type ImageProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
type StatusType = 'loading' | 'error' | 'success';

/**
 * 이미지 atom 컴포넌트 JSX 반환 메서드
 *
 * @param {ImageProps} param0: ImageProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function Image({ alt, width, height, className, onError, onLoad, ...props }: ImageProps): ReactNode
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
		<Stack data-component='Image' height={height} position='relative' width={width}>
			<img
				alt={alt}
				className={cn('image', { loading: statusState !== 'success' }, className)}
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
				<Stack alignItems='center' height={height} justifyContent='center' left={0} position='absolute' top={0} width={width}>
					<LottieIcon iconName={statusState === 'error' ? 'empty' : 'image'} maxWidth={300} width='75%' />
				</Stack>
			)}
		</Stack>
	);
}