/**
 * 링크 아이콘 버튼 atom 컴포넌트
 *
 * @author RWB
 * @since 2023.08.28 Mon 02:11:35
 */

'use client';

import { useTheme } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { ReactNode, useMemo } from 'react';

import styles from './LinkIconButton.module.scss';

const cn = classNames.bind(styles);

export interface LinkIconButtonProps extends IconButtonProps
{
	/**
	 * 툴팁 메시지
	 */
	tooltip?: string;

	/**
	 * 링크
	 */
	link: string;
}

/**
 * 링크 아이콘 버튼 atom 컴포넌트 JSX 반환 메서드
 *
 * @param {LinkIconButtonProps} param0: LinkIconButtonProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function LinkIconButton({ tooltip, link, ...props }: LinkIconButtonProps): ReactNode
{
	const { palette: { mode } } = useTheme();

	const isInternal = useMemo(() => link.startsWith('/'), [ link ]);

	return (
		<Tooltip title={tooltip} arrow>
			<Link data-component='LinkIconButton' href={link} target={isInternal ? undefined : '_blank'}>
				<IconButton className={cn('icon', mode)} {...props} />
			</Link>
		</Tooltip>
	);
}