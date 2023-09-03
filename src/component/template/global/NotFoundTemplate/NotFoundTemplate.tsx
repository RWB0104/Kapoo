/**
 * 404 template 컴포넌트
 *
 * @author RWB
 * @since 2023.09.03 Sun 00:03:36
 */

import LottieIcon from '@kapoo/atom/LottieIcon';

import Home from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * 404 template 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function NotFoundTemplate(): ReactNode
{
	return (
		<Stack
			alignItems='center'
			data-component='NotFoundTemplate'
			height='100vh'
			justifyContent='center'
			padding={2}
			spacing={2}
			width='100%'
		>
			<LottieIcon iconName='notFound' maxWidth={400} width='100%' />

			<Link href='/'>
				<Button
					color='inherit'
					size='large'
					startIcon={<Home />}
					variant='outlined'
				>
					이 방엔 아무것도 없어보인다.
				</Button>
			</Link>
		</Stack>
	);
}