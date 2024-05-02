/**
 * 이미지 모달 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.19 Fri 17:02:56
 */

import { colors } from '@kapoo/common';
import Add from '@mui/icons-material/Add';
import Close from '@mui/icons-material/Close';
import Refresh from '@mui/icons-material/Refresh';
import Remove from '@mui/icons-material/Remove';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './ImageModal.module.scss';

import Img from '../Img';
import ZoomPanner, { ZoomPannerControllerProps } from '../ZoomPanner';

const cn = classNames.bind(styles);

export interface ImageModalProps
{
	/**
	 * 모달 오픈 여부
	 */
	open?: boolean;

	/**
	 * 이미지 소스
	 */
	src?: string;

	/**
	 * 닫기 메서드
	 */
	onClose?: () => void;
}

/**
 * 이미지 모달 organism 컴포넌트 반환 메서드
 *
 * @param {ImageModalProps} param0: ImageModalProps
 *
 * @returns {JSX.Element} JSX
 */
export default function ImageModal({ open = false, src, onClose }: ImageModalProps): JSX.Element
{
	const [ controllerState, setControllerState ] = useState<ZoomPannerControllerProps>();

	useEffect(() =>
	{
		const handle = ({ code }: KeyboardEvent): void =>
		{
			// ESC를 누를 경우
			if (code === 'Escape')
			{
				onClose?.();
			}
		};

		// 모달이 열릴 경우
		if (open)
		{
			window.addEventListener('keydown', handle);
		}

		// 모달이 닫힐 경우
		else
		{
			window.removeEventListener('keydown', handle);
		}

		return () =>
		{
			window.removeEventListener('keydown', handle);
		};
	}, [ open, onClose ]);

	useEffect(() =>
	{
		// 모달이 닫힐 경우
		if (!open)
		{
			controllerState?.reset();
		}
	}, [ controllerState, open ]);

	return (
		<Backdrop className={cn('backdrop')} data-component='ImageModal' open={open}>
			<Box position='fixed' right={20} top={20} zIndex={1}>
				<IconButton color='primary' onClick={onClose}>
					<Close fontSize='large' htmlColor='white' />
				</IconButton>
			</Box>

			<Box bottom={20} left={20} position='fixed' zIndex={1}>
				<ButtonGroup className={cn('buttons')} orientation='vertical' size='small' variant='contained'>
					<Button id={cn('button')} onClick={controllerState?.zoomIn}>
						<Add fontSize='small' />
					</Button>

					<Button id={cn('button')} onClick={controllerState?.zoomOut}>
						<Remove fontSize='small' />
					</Button>

					<Button id={cn('button')} onClick={controllerState?.reset}>
						<Refresh fontSize='small' />
					</Button>
				</ButtonGroup>
			</Box>

			<ZoomPanner
				alignItems='center'
				controller={setControllerState}
				defaultZoom={0.9}
				height='100vh'
				justifyContent='center'
				width='100vw'
			>
				<Img
					containerProps={{ boxShadow: `0px 0px 10px ${colors.shadow.default}` }}
					height='100%'
					src={src}
					width='100%'
				/>
			</ZoomPanner>
		</Backdrop>
	);
}