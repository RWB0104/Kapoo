/**
 * 접이식 박스 molecule 컴포넌트
 *
 * @author RWB
 * @since 2024.04.23 Tue 16:26:37
 */

'use client';

import Box, { BoxProps } from '@mui/material/Box';
import { CSSProperties, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

export type CollapseBoxHandler = (flag?: boolean) => void;

export interface CollapseBoxControllerProps
{
	/**
	 * 핸들러 메서드
	 */
	handle: CollapseBoxHandler;
}

export type CollapseBoxOnInitHandler = (controller: CollapseBoxControllerProps) => void;

export interface CollapseBoxProps extends BoxProps
{
	/**
	 * 기본 열기 여부
	 */
	defaultOpen?: boolean;

	/**
	 * 애니메이션 시간
	 */
	animationTime?: CSSProperties['transition'];

	/**
	 * 컨트롤러 메서드
	 */
	onInit?: CollapseBoxOnInitHandler;

	/**
	 * 컨트롤 이벤트 메서드
	 */
	onControlled?: CollapseBoxHandler;
}

/**
 * 접이식 박스 molecule 컴포넌트 반환 메서드
 *
 * @param {CollapseBoxProps} param0: CollapseBoxProps
 *
 * @returns {JSX.Element} JSX
 */
export default function CollapseBox({ defaultOpen, animationTime = '0.3s', style, onInit, onControlled, ...props }: CollapseBoxProps): JSX.Element
{
	const ref = useRef<HTMLDivElement>(null);

	const [ isOpenState, setOpenState ] = useState(defaultOpen);

	const handleAnimationEnd = useCallback(() =>
	{
		// DOM이 유효할 경우
		if (ref.current)
		{
			ref.current.style.transition = '';

			// 상자가 열릴 경우
			if (isOpenState)
			{
				ref.current.style.height = '';
			}

			// 닫힐 경우
			else
			{
				ref.current.style.height = '0px';
			}
		}
	}, [ ref.current, isOpenState ]);

	const actions = useCallback<CollapseBoxHandler>(
		(flag) =>
		{
			if (ref.current)
			{
				ref.current.style.transition = animationTime;

				// 상자가 열릴 경우
				if (flag)
				{
					ref.current.style.height = '0px';
				}

				// 닫힐 경우
				else
				{
					ref.current.style.height = `${ref.current.scrollHeight}px`;
				}
			}
		},
		[ ref.current ]
	);

	const handler = useCallback<CollapseBoxHandler>(
		(flag) =>
		{
			// 파라미터가 입력되지 않을 경우 (토글)
			if (flag === undefined)
			{
				setOpenState((state) =>
				{
					const next = !state;

					actions(next);

					return next;
				});
			}

			// 파라미터가 입력된 경우 (명시적 할당)
			else
			{
				setOpenState((state) =>
				{
					if (state !== flag)
					{
						actions(flag);
					}

					return flag;
				});
			}
		},
		[ ref.current, animationTime, actions ]
	);

	useLayoutEffect(() =>
	{
		onInit?.({ handle: handler });
	}, [ onInit, handler ]);

	useLayoutEffect(() =>
	{
		// DOM이 유효할 경우
		if (ref.current)
		{
			// 상자가 열릴 경우
			if (isOpenState)
			{
				ref.current.style.height = `${ref.current.scrollHeight}px`;
			}

			// 닫힐 경우
			else
			{
				ref.current.style.height = '0px';
			}
		}
	}, [ animationTime, ref.current, isOpenState ]);

	useEffect(() =>
	{
		onControlled?.(isOpenState);
	}, [ isOpenState, onControlled ]);

	return (
		<Box
			component='div'
			data-component='CollapseBox'
			overflow='hidden'
			ref={ref}
			style={{ height: 0, ...style }}
			onTransitionEnd={handleAnimationEnd}
			{...props}
		/>
	);
}