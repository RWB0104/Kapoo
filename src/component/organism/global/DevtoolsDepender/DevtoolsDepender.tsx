/**
 * 개발자도구 방지 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.09.02 Sat 01:07:38
 */

'use client';

import { AUTHOR } from '@kapoo/env';

import { DevtoolsDetectorListener, addListener, launch, removeListener } from 'devtools-detector';
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';

export type DevtoolDefenderProps = PropsWithChildren;

/**
 * 개발자도구 방지 organism 컴포넌트 JSX 반환 메서드
 *
 * @param {DevtoolDefenderProps} param0: DevtoolDefenderProps 객체
 *
 * @returns {ReactNode | null} ReactNode
 */
export default function DevtoolDefender({ children }: DevtoolDefenderProps): ReactNode | null
{
	const [ isOpenState, setOpenState ] = useState(false);

	useEffect(() =>
	{
		const handle: DevtoolsDetectorListener = (flag) =>
		{
			setOpenState(flag);
		};

		addListener(handle);

		// 개발 모드가 아닐 경우
		if (process.env.NODE_ENV !== 'development')
		{
			launch();
		}

		return () =>
		{
			removeListener(handle);
		};
	}, []);

	useEffect(() =>
	{
		const handle = (e: MouseEvent): void =>
		{
			e.preventDefault();
		};

		document.addEventListener('contextmenu', handle);

		return () =>
		{
			document.removeEventListener('contextmenu', handle);
		};
	}, []);

	useEffect(() =>
	{
		// 개발자도구가 열렸을 경우
		if (isOpenState)
		{
			window.location.replace(AUTHOR.social.github.link);
		}
	}, [ isOpenState ]);

	return isOpenState ? null : children;
}