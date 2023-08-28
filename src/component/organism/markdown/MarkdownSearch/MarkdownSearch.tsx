/**
 * 마크다운 검색 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.08.25 Fri 13:41:59
 */

'use client';

import Search from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEventHandler, ReactNode, useCallback, useEffect, useRef, useState } from 'react';

/**
 * 마크다운 검색 organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function MarkdownSearch(): ReactNode
{
	const router = useRouter();
	const seachParam = useSearchParams();
	const pathname = usePathname();

	const [ state, setState ] = useState('');

	const ref = useRef<HTMLInputElement | null>(null);

	const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(({ currentTarget }) =>
	{
		const param = new URLSearchParams(seachParam);
		param.delete('page');

		// 값이 유효할 경우
		if (currentTarget.value.length > 0)
		{
			param.set('keyword', currentTarget.value);
		}

		// 아닐 경우
		else
		{
			param.delete('keyword');
		}

		router.push(`${pathname}?${param.toString()}`, { scroll: false });
	}, [ router, seachParam ]);

	useEffect(() =>
	{
		const param = new URLSearchParams(seachParam);
		const keyword = param.get('keyword');

		setState(keyword || '');
	}, []);

	return (
		<TextField
			data-component='MarkdownSearch'
			defaultValue={state}
			label='키워드'
			placeholder='⌨️ 원하는 키워드를 입력해보세요'
			ref={ref}
			size='small'
			variant='outlined'
			InputProps={{
				startAdornment: (
					<InputAdornment position='start'>
						<Search />
					</InputAdornment>
				)
			}}
			onChange={handleChange}
		/>
	);
}