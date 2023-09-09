/**
 * 뷰 댓글 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.09.02 Sat 00:17:11
 */

'use client';

import Comment from '@kapoo/atom/Comment';
import LottieIcon from '@kapoo/atom/LottieIcon/LottieIcon';
import ViewHits from '@kapoo/organism/view/ViewHits';
import { viewStore } from '@kapoo/store/markdown';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

/**
 * 뷰 댓글 박스 organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewCommentBox(): ReactNode
{
	const { view } = viewStore();

	return (
		<Stack data-component='ViewCommentBox' spacing={10}>
			<Stack alignItems='center' justifyContent='center' spacing={1} width='100%'>
				<LottieIcon iconName='heartMessage' width={300} />

				<Typography variant='h5'>😍 읽어주셔서 감사합니다!</Typography>
				<Typography variant='h5'>도움이 되셨다면, <Typography color='hotpink' component='span' fontWeight='bold' variant='inherit'>💝공감</Typography>이나 <Typography color='hotpink' component='span' fontWeight='bold' variant='inherit'>🗨️댓글</Typography>을 달아주시는 건 어떤가요?</Typography>
				<Typography variant='h5'>블로그 운영에 큰 힘이 됩니다!</Typography>
			</Stack>

			<ViewHits />

			{view?.frontmatter.comment ? <Comment /> : null}
		</Stack>
	);
}