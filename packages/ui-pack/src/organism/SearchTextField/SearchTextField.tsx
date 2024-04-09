/**
 * 검색 필드 organism 컴포넌트
 *
 * @author RWB
 * @since 2024.04.09 Tue 12:15:26
 */

'use client';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, useCallback } from 'react';

export interface SearchTextFieldProps extends Omit<TextFieldProps, 'name'>
{
	/**
	 * 이름
	 */
	name: string;
}

/**
 * 검색 필드 organism 컴포넌트 반환 메서드
 *
 * @param {SearchTextFieldProps} param0: SearchTextFieldProps
 *
 * @returns {JSX.Element} JSX
 */
export default function SearchTextField({ name, onChange, ...props }: SearchTextFieldProps): JSX.Element
{
	const { replace } = useRouter();

	const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) =>
	{
		const searchParams = new URLSearchParams(window.location.search);

		// 값이 유효할 경우
		if (e.currentTarget.value.length > 0)
		{
			searchParams.set(e.currentTarget.name, e.currentTarget.value);
		}

		// 아닐 경우
		else
		{
			searchParams.delete(e.currentTarget.name);
		}

		replace(`${window.location.pathname}?${searchParams.toString()}`, { scroll: false });

		onChange?.(e);
	}, [ onChange ]);

	return (
		<TextField data-component='SearchTextField' name={name} onChange={handleChange} {...props} />
	);
}