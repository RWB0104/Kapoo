/**
 * 컨텐츠 그룹 컴포넌트
 *
 * @author RWB
 * @since 2021.07.24 Sat 10:01:18
 */

// 라이브러리 모듈
import { ReactElement } from 'react';
import { Box, ButtonBase, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';

// 사용자 모듈
import { ContentProps } from '@commons/common';

// 스타일
import styles from '@styles/components/contents/contentgroup.module.scss';

interface Props {
	group: ContentProps[] | undefined
}

/**
 * 컨텐츠 그룹 ReactElement 반환 함수
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {ReactElement | null} ReactElement
 */
export default function ContentGroup({ group }: Props): ReactElement | null
{
	const router = useRouter();

	// 유효한 그룹 객체가 있을 경우
	if (group && group.length > 0)
	{
		group = group.length > 20 ? group.slice(0, 20) : group;

		const groups = group.map((item, index) => (
			<Box key={index} className={styles.item}>
				<ButtonBase className={styles.button} onClick={() => router.push(`/${item.header.type}/${item.url[1]}/${item.url[2]}/${item.url[3]}/${item.url[4]}`)}>
					<img src={item.header.coverImage} />

					<Box className={styles['label-wrapper']}>
						<Typography className={styles.label}>{item.header.title}</Typography>
					</Box>
				</ButtonBase>
			</Box>
		));

		return (
			<Box component="article" className={styles.root}>
				<Typography component="h4" variant="h4" className={styles.title}>🧲 연관 게시물</Typography>

				<Box className={styles.list}>
					{groups}
				</Box>
			</Box>
		);
	}

	// 없을 경우
	else
	{
		return null;
	}
}