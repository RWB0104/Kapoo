/**
 * 환경변수 JavaScript
 *
 * @author RWB
 * @since 2021.05.08 Sat 14:57:38
 */

export const TITLE = "Kapoo";

export const DESCRIPTION = "314159265359번째 알파카의 개발 낙서장🐾";

export const LOGO = "/assets/images/logo.png";

export const PROFILE = "/assets/images/profile.png";

export const MENU_LIST = [
	{
		id: 1,
		title: "Home",
		url: { pathname: "/" },
		icon: "🏠"
	},
	{
		id: 2,
		title: "Posts",
		url: {
			pathname: "/posts",
			query: {
				page: 1,
				category: "all"
			}
		},
		icon: "📑"
	},
	{
		id: 3,
		title: "Projects",
		url: {
			pathname: "/projects",
			query: {
				page: 1,
				category: "all"
			}
		},
		icon: "🏆"
	},
	{
		id: 4,
		title: "About",
		url: { pathname: "/about" },
		icon: "🔍"
	}
];

export const PIECE = [
	{
		title: "Cake is a fxcking LIE",
		author: "Are you steel there?",
		images: "https://d2skuhm0vrry40.cloudfront.net/2020/articles/2020-07-14-17-16/this-portal-2-level-completed-without-portals-is-outrageous-1594743396198.jpg/EG11/resize/1200x-1/this-portal-2-level-completed-without-portals-is-outrageous-1594743396198.jpg"
	},
	{
		title: "Sierra Madre. 일확천금의 꿈이 이루어지는 곳.",
		author: "Sierra Madre Casino",
		images: "https://i.pinimg.com/originals/3e/25/68/3e25682537cbbaa9701867e6888cd88d.jpg"
	},
	{
		title: "Trust Me.",
		author: "BT",
		images: "https://cdn.mos.cms.futurecdn.net/qdPeSekFx8TzDHnza2cu2e.jpg"
	},
	{
		title: "A man chooses, A slave obeys.",
		author: "a Golfer",
		images: "https://steamuserimages-a.akamaihd.net/ugc/849342107711892529/A6F2773F8A86D9690E843BCE4835D92C7A86851F/?imw=1024&imh=576&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
	},
	{
		title: "404 Not Found",
		author: "undefined... x_X",
		images: "https://i.pinimg.com/originals/17/c4/a4/17c4a4f21be8344c713b69f7ca26f11c.gif"
	},
	{
		title: "게임을 하면 이겨야지!",
		author: "D.Va",
		images: "https://lh3.googleusercontent.com/proxy/mqQAgAROI2wRvVQhwMTsQipXbhL6BQHL5JgvJmEbZV2faDoOc_rcEbyqiccKeehgg8VjbXN32B0MJgDeFsNBf38PydAC3u2vXSaiq9ziztZNOzTzVvEVhlIN7zT8GGAX4u7aWal-LyNAc7CNgkekWbQuKQuZIo-EcmW-ThjO_P7iILChL0T9g6g_DgSRQNmbcPRIkbjwno1VPtjQsNdjCWeyeHdHanyZvnIRmuBS0C03nQ0v45XYnwBRGApjQ4jcoadLzQxxV0DyBnx1gDl40OkLJbjNCsN0hFuK1a-GORjrzv2OMPvjV06Uf_jgZtr72v7RNjiFGrSxrWVYTUefoqFk-cDJPwJ_jmZUyq-n4Krt4kLyz9j8WiRuus66k_wjKXQR1diYcttgXus5oRkaUtu_"
	},
	{
		title: "내 손을 잡아, 시작되는 Party time.",
		author: "환상속의 그대 中",
		images: "http://image.genie.co.kr/Y/IMAGE/IMG_MUZICAT/IV2/Genie_Magazine/4514/Mgz_Sub_EVT_20180125111859.jpg"
	},
	{
		title: "Enjoy your stay",
		author: "Fallout New Vegas",
		images: "https://cdn.mos.cms.futurecdn.net/4Wpwi8S5CBDdhgWxWCZaXo.jpg"
	},
	{
		title: "War... War never changes.",
		author: "Fallout Series",
		images: "https://wallup.net/wp-content/uploads/2016/01/270931-video_games-Fallout-power_armor.jpg"
	},
	{
		title: "War... War never changes. Men do.",
		author: "Ulysses",
		images: "https://lh3.googleusercontent.com/proxy/2sXjx3Ma1_Xeji4sr2HL4QglzPL_0wj-Do7ttTkc79tXFswwDOlYDjgYi4aP3QLKb844dTsb1DxG5OS08J2CJKGMvNK6ULfpYkPtKyO199HToWavTat87Nsgp1vN2re9ADFphk2aXKC8YzFHjHG3z-uX-1i79ckXcw"
	},
	{
		title: "On your left.",
		author: "Sam",
		images: "https://i.imgur.com/vz23TXe.jpg"
	},
	{
		title: "History is written by the victors.",
		author: "Cpt. Price",
		images: "https://i.pinimg.com/originals/5f/67/79/5f677994acacdde50241be686f526e0a.jpg"
	},
	{
		title: "History is written by the victors.",
		author: "Gen. Shepherd",
		images: "https://www.gamingaccessweekly.com/wp-content/uploads/2020/03/alien-Screenshot-2020-03-31-21-43-51.png"
	},
	{
		title: "Remember. We get dirty, World be stay clean. That's the mission.",
		author: "Cpt. Price",
		images: "https://static2.gamerantimages.com/wordpress/wp-content/uploads/2020/06/captain-price-nightfall-skin.jpg"
	},
	{
		title: "Succeeding you, Father.",
		author: "Arthas Menethil",
		images: "https://coinpan.com/files/attach/images/198/605/237/028/4027dc6daa25d8aba1d1520ae2820150.jpg"
	},
	{
		title: "My life for Aiur",
		author: "Zeratul",
		images: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFE0eR_nvrwnAqRKNlB-eZMxW7Zl5CfbZNou54ie3IgzuKYmU6d2y3CxD4K4h-m-ZFD_4&usqp=CAU"
	},
	{
		title: "드디어, 올 것이 왔군.",
		author: "Tychus J. Findlay",
		images: "https://i.ytimg.com/vi/4LY8uBwkYB4/maxresdefault.jpg"
	},
	{
		title: "그 여자가 그만한 가치가 있길 바라겠어, 지미...",
		author: "Tychus J. Findlay...?",
		images: "https://i.ytimg.com/vi/TuOjcQsdlbw/mqdefault.jpg"
	}
];