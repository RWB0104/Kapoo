/**
 * 마크다운 메뉴 사이드 카드 서브 컴포넌트
 *
 * @author RWB
 * @since 2024.04.15 Mon 16:45:16
 */

import Img from '@kapoo/ui-pack/organism/Img';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import Link from 'next/link';

import styles from './MarkdownMenuSideCard.module.scss';

const cn = classNames.bind(styles);

export interface MarkdownMenuSideCardProps
{
	/**
	 * 링크
	 */
	href: string;

	/**
	 * 타이틀
	 */
	title: string;

	/**
	 * 부제
	 */
	subtitle: string;

	/**
	 * 썸네일
	 */
	thumbnail: string;

	/**
	 * 아이콘
	 */
	icon: JSX.Element;

	/**
	 * 아이콘 위치
	 */
	iconPosition?: 'start' | 'end';
}

/**
 * 마크다운 메뉴 사이드 카드 서브 컴포넌트 반환 메서드
 *
 * @param {MarkdownMenuSideCardProps} param0: MarkdownMenuSideCardProps
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownMenuSideCard({ href, title, subtitle, thumbnail, icon, iconPosition = 'start' }: MarkdownMenuSideCardProps): JSX.Element
{
	return (
		<Link className={cn('link')} href={href}>
			<ButtonBase className={cn('button')}>
				<Stack
					height='100%'
					left={0}
					position='absolute'
					top={0}
					width='100%'
				>
					<Img height='100%' src={thumbnail} width='100%' />
				</Stack>

				<Stack
					alignItems='center'
					bgcolor='#00000080'
					direction='row'
					gap={2}
					height='100%'
					minHeight={100}
					padding={2}
					width='100%'
					zIndex={1}
				>
					{iconPosition === 'start' ? icon : null}

					<Stack flex={1}>
						<Typography
							className={cn('text')}
							color='yellow'
							textAlign={iconPosition}
							variant='caption'
						>
							{subtitle}
						</Typography>

						<Typography
							className={cn('text')}
							color='white'
							fontWeight='bold'
							textAlign={iconPosition}
						>
							{title}
						</Typography>
					</Stack>

					{iconPosition === 'end' ? icon : null}
				</Stack>
			</ButtonBase>
		</Link>
	);
}