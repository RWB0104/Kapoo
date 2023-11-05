/**
 * 뷰 댓글 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.09.02 Sat 00:17:11
 */

import Comment from '@kapoo/atom/Comment';
import LottieIcon from '@kapoo/atom/LottieIcon/LottieIcon';
import ViewHits from '@kapoo/organism/view/ViewHits';
import { MarkdownType } from '@kapoo/util/markdown';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

export interface ViewCommentBoxProps
{
	/**
	 * 마크다운 타입
	 */
	type: MarkdownType;

	/**
	 * URL
	 */
	url?: string;

	/**
	 * 댓글 여부
	 */
	comment: boolean;
}

/**
 * 뷰 댓글 박스 organism 컴포넌트 JSX 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ViewCommentBox({ type, url, comment }: ViewCommentBoxProps): ReactNode
{
	return (
		<Stack data-component='ViewCommentBox' spacing={10}>
			<Stack alignItems='center' justifyContent='center' spacing={1} width='100%'>
				<LottieIcon iconName='heartMessage' width={300} />

				<Typography variant='h5'>😍 읽어주셔서 감사합니다!</Typography>
				<Typography variant='h5'>도움이 되셨다면, <Typography color='hotpink' component='span' fontWeight='bold' variant='inherit'>💝공감</Typography>이나 <Typography color='hotpink' component='span' fontWeight='bold' variant='inherit'>🗨️댓글</Typography>을 달아주시는 건 어떤가요?</Typography>
				<Typography variant='h5'>블로그 운영에 큰 힘이 됩니다!</Typography>
			</Stack>

			<ViewHits type={type} url={url} />

			{comment ? <Comment /> : null}
		</Stack>
	);
}