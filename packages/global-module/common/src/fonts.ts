/**
 * 폰트 모듈
 *
 * @author RWB
 * @since 2024.04.12 Fri 12:05:59
 */

// eslint-disable-next-line camelcase
import { Noto_Sans_KR, Ubuntu_Mono } from 'next/font/google';

export const notoSans = Noto_Sans_KR({ subsets: [ 'latin' ], weight: [ '100', '300', '400', '500', '700', '900' ] });
export const ubuntuMono = Ubuntu_Mono({ subsets: [ 'latin' ], weight: [ '400', '700' ] });