import { basketballNBALogo, moviesLogo, otherPredictionLogo, soccerEnglandLogo, soccerFranceLogo, soccerGermanLogo, soccerItalyLogo, soccerSpainLogo, soccerUCLLogo, tvshowsLogo, ussportNFLLogo } from "./assets";

const avalancheChain = {
	chainId: 43114,
	logo: '/images/pngs/chain-logo/avalanche.svg',
	name: 'Avalanche',
	mainnetName: "Avalanche Mainnet",
	alt: 'avalanche-logo',
	index: 0,
	nativeToken: "AVAX",
	entryFee: 0.9,
	roundFee: 0.45,
};

const bscChain = {
	chainId: 56,
	logo: '/images/pngs/chain-logo/bsc.svg',
	name: 'BSC',
	mainnetName: "BSC Mainnet",
	alt: 'bsc-logo',
	index: 1,
	nativeToken: "BNB",
	entryFee: 0.046,
	roundFee: 0.023,
};

const optimismChain = {
	chainId: 10,
	logo: '/images/pngs/chain-logo/optimism.svg',
	name: 'Optimism',
	mainnetName: "Optimism",
	alt: 'optimism-logo',
	index: 2,
	nativeToken: "ETH",
	entryFee: 0.006,
	roundFee: 0.003,
};

const polygonChain = {
	chainId: 137,
	logo: '/images/pngs/chain-logo/polygon.svg',
	name: 'Polygon',
	mainnetName: "Polygon Mainnet",
	alt: 'polygon-logo',
	index: 3,
	nativeToken: "MATIC",
	entryFee: 17.2,
	roundFee: 8.6,
};

const arbitrumChain = {
	chainId: 42161,
	logo: '/images/svgs/bg/arbitrum.svg',
	name: 'Arbitrum (soon)',
	mainnetName: "Arbitrum",
	alt: 'arbitrum-logo',
	index: 5,
	nativeToken: "ETH",
};

const baseChain = {
	chainId: 42161,
	logo: '/images/svgs/bg/base.svg',
	name: 'Base (soon)',
	mainnetName: "Base",
	alt: 'base-logo',
	index: 6,
	nativeToken: "ETH",
};

const ethChain = {
	chainId: 42161,
	logo: '/images/svgs/bg/ethereum.svg',
	name: 'Ethereum (soon)',
	mainnetName: "Ethereum",
	alt: 'Ethereum-logo',
	index: 7,
	nativeToken: "ETH",
};

export const chainAttrs = {
	mainnet: [
		avalancheChain,
		bscChain,
		optimismChain,
		polygonChain,
	],
	testnet: [
		{
			...avalancheChain,
			chainId: 43113,
			entryFee: 0.1,
			roundFee: 0.05
		},
		{
			...bscChain,
			chainId: 97,
			entryFee: 0.02,
			roundFee: 0.01
		},
		{
			...optimismChain,
			chainId: 420,
			entryFee: 0.002,
			roundFee: 0.001
		},
		{
			...polygonChain,
			chainId: 80001,
			entryFee: 0.2,
			roundFee: 0.1
		}
	],
	soonnet : [
		arbitrumChain,
		baseChain,
		ethChain
	]
};

export const newChainAttrs = {
	[43114]: avalancheChain,
	[56]: bscChain,
	[10]: optimismChain,
	[137]: polygonChain,
	[43113]: {
		...avalancheChain,
		chainId: 43113,
		entryFee: 0.1,
		roundFee: 0.05
	},
	[97]: {
		...bscChain,
		chainId: 97,
		entryFee: 0.02,
		roundFee: 0.01
	},
	[420]: {
		...optimismChain,
		chainId: 420,
		entryFee: 0.002,
		roundFee: 0.001
	},
	[80001]: {
		...polygonChain,
		chainId: 80001,
		entryFee: 0.2,
		roundFee: 0.1
	}
};

export const rounds = [
	'register', // 0
	'round-one', // 1
	'round-two', // 2
	'round-three', // 3
	'round-four', // 4
	'round-five', // 5
	'final-vote', // 6
	'winner-page', // 7
]

export const LinkArry1 = [
	{
		name: 'Home',
		href: '/home',
	},
	{
		name: 'Prediction Markets',
		href: '/prediction-markets',
	},

	{
		name: 'Squid Bet Competitions',
		href: '/sbc',
	},
	{
		name: 'UtBets Token',
		href: '/utbets-token/token-information',
	},


];

export const LinkArry2 = [
	{
		name: 'Merch Store',
		href: '/merch-store',
	},
	{
		name: 'FAQ',
		href: '/faq',
	},
]

export const AppTitle = {
	"home": "Home",
	"prediction-markets": "Prediction Markets",
	"sbc": "SBC",
	"utbets-token": "UltiBets Token",
	"merch-store": "Merch Store",
	"faq": "FAQ",
	"my-profile": "My Profile",
	"admin": "Admin",
}

export const sortByItems = [
	'Volume: High to Low',
	'Volume: Low to High',
	'Deadline: Closest to Furthest',
	'Deadline: Furthest to Closest',
	'State: active',
];

export const tiers = [
	{
		level: 1,
		cashback: 2,
		limit: 1000,
		reward: 20,
	},
	{
		level: 2,
		cashback: 4,
		limit: 5000,
		reward: 200,
	},
	{
		level: 3,
		cashback: 6,
		limit: 10000,
		reward: 600,
	},
	{
		level: 4,
		cashback: 8,
		limit: 50000,
		reward: 4000,
	},
	{
		level: 5,
		cashback: 10,
		limit: 100000,
		reward: 10000,
	},
];

// testnet
export const fujiChainId = 43113;
export const bscTestnetChainId = 97;
export const mumbaiChainId = 80001;
export const opGoerliChainId = 420;
// mainnet
export const avalancheChainId = 43114;
export const bscChainId = 56;
export const opChainId = 10;
export const polygonChainId = 137;

export const supportedChainIds = {
	"testnet": [fujiChainId, bscTestnetChainId, opGoerliChainId, mumbaiChainId],
	"mainnet": [avalancheChainId, bscChainId, opChainId, polygonChainId],
}

// 0 : native token daily bets contract
// 1 : utbets token daily bets contract
export const contractAddressesInDailyBets = {
	[fujiChainId]: {
		[0]: '0x4B8B79C74Cdf0d71d5f1337eEa5C8E506BEab5cF',
		[1]: '0xa336ef3F8C57e44CDcB45a45758B7F5c93267581',
	},
	[bscTestnetChainId]: {
		[0]: '0xA5bb8d1a2D7062e25dF3bF83a0178159b659354b',
		[1]: '0x0E78f53c0423144AE79f0b7DF89570f8851a537D',
	},
	[opGoerliChainId]: {
		[0]: '0x10af36e2E884e883F3a490D085A56c0A5746d1FC',
		[1]: '0xCF0946aF572EB8E5e59e4fB223c245986eA3c5d7',
	},
	[mumbaiChainId]: {
		[0]: '0x4671525A35DC4d6568F6B6F1581e486CD940d766',
		[1]: '0x722aAbc648536A556D6Ec31B17eF4EC7435F27EC',
	},

	[avalancheChainId]: {
		[0]: '',
		[1]: '',
	},
	[bscChainId]: {
		[0]: '',
		[1]: '',
	},
	[opChainId]: {
		[0]: '',
		[1]: '',
	},
	[polygonChainId]: {
		[0]: '',
		[1]: '',
	},
}

// 0 : native token betting contract
// 1 : utbets token betting contract
export const contractAddressesInSBC = {
	[fujiChainId]: {
		[0]: '0x32135f124f6F1966910A5268F0749f15527057a1',
		[1]: '0xB886cb235d240b52cd1B89507dF486e87A9E8768',
	},
	[bscTestnetChainId]: {
		[0]: '0x14dCf182b847C80A07e9386cc4e7A3689AD1ECEe',
		[1]: '0x2467767CadbC1c98ad5901Ece4D27600fFC15334',
	},
	[mumbaiChainId]: {
		[0]: '0xD702bde70BAB9515f8fEF1568f15169f91537f64',
		[1]: '0x26c7F6C54a51B6C2628d8b63860d609348e6B977',
	},
	[opGoerliChainId]: {
		[0]: '0x70230D98476e1066fd0913D44AA5e4fDD58dfc52',
		[1]: '0x3D9A52C04e4D75f3efaB19C9363d2f016CBEC389',
	},
	[avalancheChainId]: {
		[0]: '',
		[1]: '',
	},
	[bscChainId]: {
		[0]: '',
		[1]: '',
	},
	[opChainId]: {
		[0]: '',
		[1]: '',
	},
	[polygonChainId]: {
		[0]: '',
		[1]: '',
	},
}

export const nftClaimerContract = {
	[fujiChainId]: '0x648B89422Cf0BB0425dE24848D20A9f4802B9753',
	[bscTestnetChainId]: '0xfA00D15cC27Db7CD1202FAC9259Ab7968d871421',
	[opGoerliChainId]: '0xfc305d8C2C71410a8300021060e6Ebb9bfb10dAe',
	[mumbaiChainId]: '0x6fdcEBEE9c259CcB52267FE3bA558d253C39fa16',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[opChainId]: '',
	[polygonChainId]: '',
}

export const sbcNFTContract = {
	[fujiChainId]: '0x6479b5c878a686A1E4f8951e86fe905645460c63',
	[bscTestnetChainId]: '0xf6d82753cc3D40FE3EB8564CC12916f94ADBD4D6',
	[opGoerliChainId]: '0x83327fc5E45d58795f64F4a22F7923e086a10902',
	[mumbaiChainId]: '0xA022990fdEa806D2c69e50225Fac5E92782A3257',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[opChainId]: '',
	[polygonChainId]: '',
}

export const rndGeneratorContract = {
	[fujiChainId]: '0xe6F42c701d6B2ba62169E25E1233382296523b16',
	[bscTestnetChainId]: '0x933A68CA54Da87884FE7ccef37D64aF1f54CE937',
	[opGoerliChainId]: '0xe5fa07268deF20Af6eE3DF501eE2F5A74D110c14',
	[mumbaiChainId]: '0x6B8ab16dDa3e31218E15fEae87F1648b7dB87aa7',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[opChainId]: '',
	[polygonChainId]: '',
}

export const ultibetsSignAddresses = {
	[fujiChainId]: '0xf6B39c9916ff70811961Aa8512093F860A67f9b5',
	[bscTestnetChainId]: '0xfE4247807Ac6A9a0381A1bC82a686870519372F5',
	[opGoerliChainId]: '0x52d23896A083A27ECcDA45f747ef8c9D34b969c2',
	[mumbaiChainId]: '0x6eace9AB0E4a30157fD0e793D726b833CCdf4F25',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[opChainId]: '',
	[polygonChainId]: '',
}

export const ultibetsRewardAddresses = {
	[fujiChainId]: '0xD3F1850bef78566bcD5b2e6348181F0B1d7a0A46',
	[bscTestnetChainId]: '0xF8c348681ef4898010dC6B361642efd667d9a755',
	[opGoerliChainId]: '0x41a20ADE03A00Be0E01c030720c5583c50Ddc99b',
	[mumbaiChainId]: '0xC1c641996AEF53313a6F0C3dEe299291960501cE',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[opChainId]: '',
	[polygonChainId]: '',
}

export const ultiBetsLeaderBoardAddresses = {
	[fujiChainId]: '0x10F8541CD56f67106c125ac991e59bC5CE9F49ec',
	[bscTestnetChainId]: '0xBf2Ea383eBE1dCd0Fba30E2E61b7f688b2c1c25f',
	[opGoerliChainId]: '0xD8d8a41Cc24B0091052C3B56ac6Ca3e33B4c99C5',
	[mumbaiChainId]: '0x5F5f60eAd2064cC42D49e617f9D4753b7C820645',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[opChainId]: '',
	[polygonChainId]: '',
}

export const utbetsTokenAddresses: {
	[key: number]: string
} = {
	[fujiChainId]: '0xbadafA1404C5902c45c8B3596827Ec3003923D3B',
	[bscTestnetChainId]: '0x11CD8f66Fe38eBc9eA2bfAD4b7927fE4035657eE',
	[opGoerliChainId]: '0x8369d50a6db55C0bEF4412101A8672F27E621Cf3',
	[mumbaiChainId]: '0x2Ee0BCd22293Cd6b37Eff2765059ADCd9126E605',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[opChainId]: '',
	[polygonChainId]: '',
}

export const usdcAddresses: {
	[key: number]: string
} = {
	[fujiChainId]: '0x4478b6904894911a08Acf07E85cD89B6a2A37b00',
	[bscTestnetChainId]: '0xC54261f6165734Be513c41Fd9311766aEbD4Cf35',
	[opGoerliChainId]: '0x07F0Ca4F61d1F334A8C848e74414Ebe8110230F6',
	[mumbaiChainId]: '0xd317c440F27c1Ac681ef0621FB34e0Cd6eee7628',
	[avalancheChainId]: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
	[bscChainId]: '',
	[opChainId]: '',
	[polygonChainId]: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
}

export const airdropContractAddresses = {
	[fujiChainId]: '0x919E10b18A122719AC63416d4f2b562eb3E554A8',
	[bscTestnetChainId]: '0xA616458582e934046013557E33321D6919d3AA3D',
	[opGoerliChainId]: '0x7e2FDda0572085b605EDF9fD2Dd1911B498d4Be0',
	[mumbaiChainId]: '0x4Edb07D058954B40972F4925C277e488504472C4',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[opChainId]: '',
	[polygonChainId]: '',
}

export const merchStoreContractAddresses = {
	[fujiChainId]: '0xeFd84E5A9c484E106c85A9aac672ECb36B348594',
	[bscTestnetChainId]: '0xbB4D1A48C625cF11390B69d44C65110bB829A676',
	[opGoerliChainId]: '0xbcfC81F7255a9A5104422370378E099494287974',
	[mumbaiChainId]: '0x55089DFB73f6A6a0f15fE3b07bf149Bf87D42Ab0',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[opChainId]: '',
	[polygonChainId]: '',
}

export const symbols = {
	[fujiChainId]: 'avalanche-2',
	[bscTestnetChainId]: 'binancecoin',
	[opGoerliChainId]: 'ethereum',
	[mumbaiChainId]: 'matic-network',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[opChainId]: '',
	[polygonChainId]: '',
}

export const chainRPCs = {
	[fujiChainId]: 'https://rpc.ankr.com/avalanche_fuji',
	[bscTestnetChainId]: 'https://bsc-testnet.publicnode.com',
	[opGoerliChainId]: 'https://side-wispy-dinghy.optimism-goerli.discover.quiknode.pro/72305688905d897d5a9a51b6f4b8c2fc31bf0dd2/',
	[mumbaiChainId]: 'https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[opChainId]: '',
	[polygonChainId]: '',
}

export const subCategoriesInPredictionMarkets = {
	// soccer
	[1]: {
		[1]: {
			logo: soccerGermanLogo,
			name: 'Bundesliga',
			subMenuIndex: 1,
		},
		[2]: {
			logo: soccerSpainLogo,
			name: 'La liga',
			subMenuIndex: 2,
		},
		[3]: {
			logo: soccerFranceLogo,
			name: 'Ligue 1',
			subMenuIndex: 3,
		},
		[4]: {
			logo: soccerEnglandLogo,
			name: 'PremierLeague',
			subMenuIndex: 4,
		},
		[5]: {
			logo: soccerItalyLogo,
			name: 'Serie A',
			subMenuIndex: 5,
		},
		[6]: {
			logo: soccerUCLLogo,
			name: 'Champions League',
			subMenuIndex: 6,
		},
		[7]: {
			logo: soccerUCLLogo,
			name: 'Europa League',
			subMenuIndex: 7,
		},
		[8]: {
			logo: otherPredictionLogo,
			name: 'International friendly',
			subMenuIndex: 8,
		},
	},
	// basketball
	[2]: {
		[1]: {
			logo: basketballNBALogo,
			name: 'NBA',
			subMenuIndex: 1,
		},
	},
	// us sport
	[3]: {
		[1]: {
			logo: ussportNFLLogo,
			name: 'NFL',
			subMenuIndex: 1,
		},
	},
	// tennis
	[4]: {
		[1]: {
			logo: otherPredictionLogo,
			name: 'ATP',
			subMenuIndex: 1,
		},
		[2]: {
			logo: otherPredictionLogo,
			name: 'WTA',
			subMenuIndex: 2,
		},
	},
	// combat sports
	[5]: {
		[1]: {
			logo: otherPredictionLogo,
			name: 'Boxing',
			subMenuIndex: 1,
		},
		[2]: {
			logo: otherPredictionLogo,
			name: 'MMA',
			subMenuIndex: 2,
		},
	},
	// motorsports
	[6]: {
		[1]: {
			logo: otherPredictionLogo,
			name: 'Formula 1',
			subMenuIndex: 1,
		},
		[2]: {
			logo: otherPredictionLogo,
			name: 'Moto GP',
			subMenuIndex: 2,
		},
		[3]: {
			logo: otherPredictionLogo,
			name: 'WRC',
			subMenuIndex: 3,
		},
	},
	// cryptos
	[7]: {
		[1]: {
			name: 'Cryptos',
			subMenuIndex: 1,
		},
	},
	// stocks
	[8]: {
		[1]: {
			name: 'Stocks',
			subMenuIndex: 1,
		},
	},
	// politics
	[9]: {
		[1]: {
			name: 'Politics',
			subMenuIndex: 1,
		},
	},
	// Moviews & TV Shows
	[10]: {
		[1]: {
			logo: moviesLogo,
			name: 'Movies',
			subMenuIndex: 1,
		},
		[2]: {
			logo: tvshowsLogo,
			name: 'TV shows',
			subMenuIndex: 2,
		},
	},
	// music
	[11]: {
		[1]: {
			name: 'Music',
			subMenuIndex: 1,
		},
	},
}

export enum EventType {
	Double = 0,
	Triple = 1,
}

export type SidebarItemProps = {
	menuIndex: number
	name: string
	href?: string
	icon: string
	eventType: string
	keyword: string
	subCategories?: any
	isSubCategoryExist: boolean
}

export const categoryToNumber = {
	"soccer": 1,
	"basketball": 2,
	"us-football": 3,
	"tennis": 4,
	"combat-sports": 5,
	"motor-sports": 6,
	"cryptos": 7,
	"stocks": 8,
	"politics": 9,
	"movies-tv-Series": 10,
	"music": 11,
	"sbc": 12,
}

export const sidebarItems = {
	[1]: {
		menuIndex: 1,
		name: 'Soccer',
		icon: '/images/svgs/sidebar/soccer.svg',
		eventType: EventType.Triple,
		keyword: 'soccer',
		isSubCategoryExist: true,
	},
	[2]: {
		menuIndex: 2,
		name: 'Basketball',
		icon: '/images/svgs/sidebar/basketball.svg',
		eventType: EventType.Triple,
		keyword: 'basketball',
		isSubCategoryExist: true,
	},
	[3]: {
		menuIndex: 3,
		name: 'US Football',
		icon: '/images/svgs/sidebar/nfl.svg',
		eventType: EventType.Triple,
		keyword: 'us-football',
		isSubCategoryExist: true,
	},
	[4]: {
		menuIndex: 4,
		name: 'Tennis',
		icon: '/images/svgs/sidebar/tennis-ball.svg',
		eventType: EventType.Double,
		keyword: 'tennis',
		isSubCategoryExist: true,
	},
	[5]: {
		menuIndex: 5,
		name: 'Combat Sports',
		icon: '/images/svgs/sidebar/boxing.svg',
		eventType: EventType.Triple,
		keyword: 'combat-sports',
		isSubCategoryExist: true,
	},
	[6]: {
		menuIndex: 6,
		name: 'Motor Sports',
		icon: '/images/svgs/sidebar/finish-flag.svg',
		eventType: EventType.Double,
		keyword: 'motor-sports',
		isSubCategoryExist: true,
	},
	[7]: {
		menuIndex: 7,
		name: 'Cryptos',
		icon: '/images/svgs/sidebar/bitcoin.svg',
		eventType: EventType.Double,
		keyword: 'cryptos',
		isSubCategoryExist: false,
	},
	[8]: {
		menuIndex: 8,
		name: 'Stocks',
		icon: '/images/svgs/sidebar/profit.svg',
		eventType: EventType.Double,
		keyword: 'stocks',
		isSubCategoryExist: false,
	},
	[9]: {
		menuIndex: 9,
		name: 'Politics',
		icon: '/images/svgs/sidebar/elections.svg',
		eventType: EventType.Double,
		keyword: 'politics',
		isSubCategoryExist: false,
	},
	[10]: {
		menuIndex: 10,
		name: 'Movies/TV Series',
		icon: '/images/svgs/sidebar/clapperboard.svg',
		eventType: EventType.Triple,
		keyword: 'movies-tv-Series',
		isSubCategoryExist: true,
	},
	[11]: {
		menuIndex: 11,
		name: 'Music',
		icon: '/images/svgs/sidebar/musical.svg',
		eventType: EventType.Double,
		keyword: 'music',
		isSubCategoryExist: false,
	},
	[12]: {
		menuIndex: 12,
		name: 'Squid Bet Competitions',
		icon: '/images/svgs/sidebar/squid.svg',
		eventType: EventType.Double,
		keyword: 'sbc',
		isSubCategoryExist: false,
	},
}

export const profileContext = [
	{
		logo: '/images/pngs/prediction-markets/star.svg',
		title: 'Leaderboard',
		href: '/my-profile/leaderboard',
	},
	{
		logo: '/images/pngs/prediction-markets/story-telling.svg',
		title: 'My Predictions',
		href: '/my-profile/my-predictions',
	},
	{
		logo: '/images/pngs/prediction-markets/referral.svg',
		title: 'My Referrals',
		href: '/my-profile/my-referrals',
	},
	{
		logo: '/images/svgs/my-profile.svg',
		title: 'My Rewards',
		href: '/my-profile/my-rewards',
	},
	{
		logo: '/images/pngs/my-nfts/my-nft.svg',
		title: 'My NFTs',
		href: '/my-profile/my-nfts',
	},
];

export enum EventResultInPM {
	Home,
	Draw,
	Away,
	Indeterminate
}

export enum EventStatusInPM {
	Open,
	End,
	Cancel
}


export const secondsIn15Mins = 900
export const secondsInHalfHour = 1800
export const secondsIn12Hours = 60 * 60 * 12;
export const secondsInDay = 60 * 60 * 24;
export const secondsInWeek = secondsInDay * 7;
export const secondsInMonth = secondsInDay * 30;

export const bannedCountries = [
	'Afghanistan',
	// 'Belarus',
	// 'Central African Republic',
	// 'Democratic Republic Of China',
	// 'Cuba',
	// 'France',
	// 'Haiti',
	// 'Italy',
	// 'Libya',
	// 'Mali',
	// 'Myanmar',
	// 'North Korea',
	// 'Federation Of Russia',
	// 'Somalia',
	// 'Syria',
	// 'United Kingdom',
	// 'United States',
	// 'Yemen',
	// 'Zimbabwe',
];


export const bannedCountriesCodes = [
	'AF',
	// 'BY',
	// 'CF',
	// 'CN',
	// 'CU',
	// 'FR',
	// 'HT',
	// 'IT',
	// 'LY',
	// 'ML',
	// 'MM',
	// 'KP',
	// 'RU',
	// 'SO',
	// 'SY',
	// 'GB',
	// 'US',
	// 'YE',
	// 'ZW',
];

export enum EventStateInSBC {
	Register,
	Round,
	Vote,
	PickWinner,
	ClaimPrize,
	Completed,
}

export enum RoundStateInSBC {
	Active,
	Canceled,
	Finished
}

export enum RoundResultInSBC {
	Indeterminate,
	Yes,
	No
}

export enum VotingResultInSBC {
	Indeterminate,
	Split,
	Solo
}

export const sbcRoundUrls = {
	['register']: 'register',
	[1]: 'round-one',
	[2]: 'round-two',
	[3]: 'round-three',
	[4]: 'round-four',
	[5]: 'round-five',
	['final-vote']: 'final-vote',
	['winner-page']: 'winner-page',
}

export const sbcAccessLevel2RoundUrls = {
	[0]: 'register',
	[1]: 'round-one',
	[2]: 'round-two',
	[3]: 'round-three',
	[4]: 'round-four',
	[5]: 'round-five',
	[6]: 'final-vote',
	[7]: 'winner-page',
}

export const roundProperties = {
	["register"]: {
		id: 0,
		title: 'squid bet registration',
		href: '/register',
		accessButtonText: 'Access Round I',
		accessButtonUrl: '/round-one',
	},
	["round-one"]: {
		id: 1,
		title: 'Round I',
		href: '/round-one',
		accessButtonText: 'Access Round II',
		accessButtonUrl: '/round-two',
	},
	["round-two"]: {
		id: 2,
		title: 'Round II',
		href: '/round-two',
		accessButtonText: 'Access Round III',
		accessButtonUrl: '/round-three',
	},
	["round-three"]: {
		id: 3,
		title: 'Round III',
		href: '/round-three',
		accessButtonText: 'Access Round IV',
		accessButtonUrl: '/round-four',
	},
	["round-four"]: {
		id: 4,
		title: 'Round IV',
		href: '/round-four',
		accessButtonText: 'Access Final Round',
		accessButtonUrl: '/round-five',
	},
	["round-five"]: {
		id: 5,
		title: 'Final Round',
		href: '/round-five',
		accessButtonText: 'Access Final Vote',
		accessButtonUrl: '/final-vote',
	},
	["final-vote"]: {
		id: 6,
		title: 'Final vote',
		href: '/final-vote',
		accessButtonText: 'Access Winner Page',
		accessButtonUrl: '/winner-page',
	},
	["winner-page"]: {
		id: 7,
		title: 'Squid bet winner page',
		href: '/winner-page',
		accessButtonText: '',
	},
}

export enum NFTType {
	Normal,
	UTBETS,
	Warrior
}

export const delayTimeFromSubgraph = 7000; //ms

export enum NftSetStatus {
	Original,
	ImageRead,
	UploadToPinata,
	WinnerNFTSet,
}

export const nftImageHeight = 667
export const nftImageWidth = 375

export enum EventCategory {
	NativeBet,
	UtbetsBet,
	WarriorBet,
}

export const perks = [
	'Round 1 Perk',
	'Round 2 Perk',
	'Round 3 Perk',
	'Round 4 Perk',
	'Round 5 Perk',
	'Final Winner Perk',
]

export const utbetsAmountPerPerkLevel = [
	0, // no select
	1, // round 1
	5, // round 2
	10, // round 3
	25, // round 4
	50, // round 5
	100, // winner
]

export const subgraphurls = {
	[fujiChainId]: 'https://api.thegraph.com/subgraphs/name/ultibets/ultibetsavalanche',
	[bscTestnetChainId]: 'https://api.thegraph.com/subgraphs/name/ultibets/ultibetsbsc',
	[mumbaiChainId]: 'https://api.thegraph.com/subgraphs/name/ultibets/ultibetspolygon',
	[opGoerliChainId]: 'https://api.thegraph.com/subgraphs/name/ultibets/ultibetsop',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[opChainId]: '',
	[polygonChainId]: '',
}

export const referralChains = [
	opChainId,
	mumbaiChainId,
]

export const bridgeURL = 'https://app.chainport.io/';
export const uniswapURL = "https://app.uniswap.org/#/swap";
export const uniswapAddLP = "https://app.uniswap.org/#/add/ETH/";
export const snapshotURL = "https://snapshot.org/#/ultibets.eth";


export const rate = 1000000000;
