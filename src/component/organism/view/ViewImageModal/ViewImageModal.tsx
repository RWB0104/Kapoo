/**
 * 뷰 이미지 모달 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.31 Thu 16:22:18
 */

'use client';

import { imageModalStore } from '@kapoo/store/modal';

import Backdrop from '@mui/material/Backdrop';
import Stack from '@mui/material/Stack';
import classNames from 'classnames/bind';
import { ReactNode, useCallback } from 'react';

import styles from './ViewImageModal.module.scss';

const cn = classNames.bind(styles);

/**
 * 뷰 이미지 모달 organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewImageModal(): ReactNode
{
	const { image, setImage } = imageModalStore();

	const handleClick = useCallback(() =>
	{
		setImage(undefined);
	}, [ setImage ]);

	return (
		<Backdrop
			className={cn('dim')}
			data-component='ViewImageModal'
			open={image !== undefined}
			onClick={handleClick}
		>
			<Stack
				alignItems='center'
				height='100%'
				justifyContent='center'
				maxWidth={1920}
				padding={4}
				paddingTop='74px'
				width='100%'
			>
				{image ? (
					<img
						alt={image}
						className={cn('image')}
						height='100%'
						src={image}
						width='100%'
					/>
				) : null}
			</Stack>
		</Backdrop>
	);
}