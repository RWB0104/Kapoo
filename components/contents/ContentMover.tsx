/**
 * 컨텐츠 무버 컴포넌트
 *
 * @author RWB
 * @since 2021.07.25 Sun 17:37:32
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Box, Button, ButtonBase, Divider, useTheme } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { useRouter } from 'next/dist/client/router';

// 사용자 모듈
import { ContentProps } from '@commons/common';

// 스타일
import styles from '@styles/components/contents/contentmover.module.scss';

interface Props {
	page: {
		type: string;
		prev: null | ContentProps,
		next: null | ContentProps,
	}
}

interface SubProps {
	data: null | ContentProps
}

/**
 * 컨텐츠 무버 ReactElement 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {ReactElement} ReactElement
 */
export default function ContentMover({ page }: Props): ReactElement
{
	const router = useRouter();

	const { prev, next } = page;

	return (
		<Box component="article" className={styles.root}>
			<Box display="flex" justifyContent="space-between">
				<SideButton data={prev} />
				<SideButton data={next} />
			</Box>

			<Divider className={styles.divider} />

			<Box>
				<Button className={styles.menu} variant="outlined" startIcon={<Menu />} onClick={() => router.push(`/${page.type}`)}>목록</Button>
			</Box>
		</Box>
	);
}

/**
 * 사이드 버튼 ReactElement 반환 함수
 *
 * @param {SubProps} param0: 프로퍼티
 *
 * @returns {ReactElement | null} ReactElement
 */
function SideButton({ data }: SubProps): ReactElement | null
{
	const router = useRouter();

	const theme = useTheme();
	const type = theme.palette.type;

	// 데이터가 유효하지 않을 경우
	if (data === null)
	{
		return null;
	}

	// 유효할 경우
	else
	{
		const urls = data?.url;

		return (
			<ButtonBase className={styles[`button-${type}`]} onClick={() => router.push(`/${data?.header.type}/${urls[1]}/${urls[2]}/${urls[3]}/${urls[4]}`)}>
				<Box>
					{data.header.title}
				</Box>
			</ButtonBase>
		);
	}
}