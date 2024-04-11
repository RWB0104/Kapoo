/**
 * 마크다운 검색 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.11 Thu 15:10:36
 */

'use client';

import SearchTextField from '@kapoo/ui-pack/organism/SearchTextField';
import Search from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEventHandler, useCallback } from 'react';

const name = 'keyword';

/**
 * 마크다운 검색 organism 컴포넌트 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function MarkdownSearch(): JSX.Element
{
	const { replace } = useRouter();
	const searchParams = useSearchParams();

	const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(({ currentTarget }) =>
	{
		const urlParams = new URLSearchParams(window.location.search);

		urlParams.delete('page');

		// 키워드가 두 글자 이상일 경우
		if (currentTarget.value.length > 1)
		{
			urlParams.set(name, currentTarget.value);
		}

		// 아닐 경우
		else
		{
			urlParams.delete(name);
		}

		replace(`${window.location.pathname}?${urlParams.toString()}`, { scroll: false });
	}, []);

	return (
		<SearchTextField
			data-component='MarkdownSearch'
			defaultValue={searchParams.get(name) || undefined}
			helperText='두 글자 이상 입력해주세요.'
			label='키워드'
			name={name}
			size='small'
			InputProps={{
				startAdornment: (
					<InputAdornment position='start'>
						<Search />
					</InputAdornment>
				)
			}}
			fullWidth
			onChange={handleChange}
		/>
	);
}