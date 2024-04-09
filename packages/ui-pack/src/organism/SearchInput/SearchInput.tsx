'use client';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, useCallback, useId, useMemo } from 'react';

export type SearchInputProps = TextFieldProps

export default function SearchInput({ name, onChange, ...props }: SearchInputProps): JSX.Element
{
	const searchParams = new URLSearchParams();

	const { replace } = useRouter();

	const autoName = useId();

	const tagName = useMemo(() => name || autoName, [ name, autoName ]);

	const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) =>
	{
		let newUrl = window.location.pathname;

		// 값이 없을 경우
		if (!e.currentTarget.value || e.currentTarget.value.length === 0)
		{
			searchParams.delete(e.currentTarget.name);
		}

		// 있을 경우
		else
		{
			searchParams.set(e.currentTarget.name, e.currentTarget.value);

			newUrl += `?${searchParams.toString()}`;
		}

		replace(newUrl, { scroll: false });

		onChange?.(e);
	}, [ searchParams, tagName, onChange ]);

	return (
		<>
			<TextField data-component='SearchInput' name={name} onChange={handleChange} {...props} />
			{Math.random()}
		</>
	);
}