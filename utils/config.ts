import { atpLogo, basketballNBALogo, boxingLogo, formulaLogo, mmaLogo, motoLogo, moviesLogo, otherPredictionLogo, soccerEnglandLogo, soccerFranceLogo, soccerGermanLogo, soccerInternationalLogo, soccerItalyLogo, soccerSpainLogo, soccerUCLLogo, tvshowsLogo, ussportNFLLogo, wrcLogo, wtaLogo } from "./assets";

const arbitrumChain = {
	chainId: 42161,
	logo: '/images/svgs/bg/arbitrum.svg',
	name: 'Arbitrum',
	mainnetName: "Arbitrum",
	alt: 'arbitrum-logo',
	index: 0,
	nativeToken: "ETH",
	entryFee: 0.006,
	roundFee: 0.003,
};

const avalancheChain = {
	chainId: 43114,
	logo: '/images/pngs/chain-logo/avalanche.svg',
	name: 'Avalanche',
	mainnetName: "Avalanche Mainnet",
	alt: 'avalanche-logo',
	index: 1,
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
	index: 2,
	nativeToken: "BNB",
	entryFee: 0.046,
	roundFee: 0.023,
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

const optimismChain = {
	chainId: 10,
	logo: '/images/pngs/chain-logo/optimism.svg',
	name: 'Optimism (soon)',
	mainnetName: "Optimism",
	alt: 'optimism-logo',
	index: 4,
	nativeToken: "ETH",
	
};

const baseChain = {
	chainId: 8453,
	logo: '/images/svgs/bg/base.svg',
	name: 'Base (soon)',
	mainnetName: "Base",
	alt: 'base-logo',
	index: 5,
	nativeToken: "ETH",
};

const ethChain = {
	chainId: 1,
	logo: '/images/svgs/bg/ethereum.svg',
	name: 'Ethereum (soon)',
	mainnetName: "Ethereum",
	alt: 'Ethereum-logo',
	index: 6,
	nativeToken: "ETH",
};

export const chainAttrs = {
	mainnet: [
		arbitrumChain,
		avalancheChain,
		bscChain,
		polygonChain,
	],
	testnet: [
		{
			...arbitrumChain,
			chainId: 421613,
			entryFee: 0.002,
			roundFee: 0.001
		},
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
			...polygonChain,
			chainId: 80001,
			entryFee: 0.2,
			roundFee: 0.1
		}
	],
	soonnet : [
		optimismChain,
		baseChain,
		ethChain
	]
};

export const newChainAttrs = {
	[42161]: arbitrumChain,
	[43114]: avalancheChain,
	[56]: bscChain,
	[137]: polygonChain,
	[421613]: {
		...arbitrumChain,
		chainId: 420,
		entryFee: 0.002,
		roundFee: 0.001
	},
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
	"disclaimer": "Disclaimer"
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
export const arbitrumGoerliChainId = 421613;
export const fujiChainId = 43113;
export const bscTestnetChainId = 97;
export const mumbaiChainId = 80001;
// mainnet
export const arbitrumChainId = 42161;
export const avalancheChainId = 43114;
export const bscChainId = 56;
export const polygonChainId = 137;

export const supportedChainIds = {
	"testnet": [arbitrumGoerliChainId, fujiChainId, bscTestnetChainId, mumbaiChainId],
	"mainnet": [arbitrumChainId, avalancheChainId, bscChainId, polygonChainId],
}

// 0 : native token daily bets contract
// 1 : utbets token daily bets contract
export const contractAddressesInDailyBets = {
	[fujiChainId]: {
		[0]: '0xf72743A7e1574807b2C3Eda11F9c889EE82685D6',
		[1]: '0x2B7413F8AD128c4936d3cc9dA455De61d4096a02',
	},
	[bscTestnetChainId]: {
		[0]: '0x7170C595f6Cb4Bf0C1141315D0065EeDE9616673',
		[1]: '0x6cDC46a68FB7206A4866c65A1C1829Fc38406cE4',
	},
	[arbitrumGoerliChainId]: {
		[0]: '0x9Ba2810260680D1b6e5546F469265BBbB0616443',
		[1]: '0xa0FB0544430501e4b17aF8EC6F96f7d2d75195Bd',
	},
	[mumbaiChainId]: {
		[0]: '0x017320BB908f2a1DbE932Bfaa53170152DEDA794',
		[1]: '0x9B1B638Ae4225a04ca4441a75D7ec1DD55117a1A',
	},

	[avalancheChainId]: {
		[0]: '',
		[1]: '',
	},
	[bscChainId]: {
		[0]: '',
		[1]: '',
	},
	[arbitrumChainId]: {
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
		[0]: '0x6Fe22A66968219D750435667De56462D544D5603',
		[1]: '0xBF14e67c1811FB2A52FA56Bf8c0d98B5ac92e6aD',
	},
	[bscTestnetChainId]: {
		[0]: '0xeF9A695F43909D73b428D773EaF5262049028784',
		[1]: '0x95b0966168425c8390b1D1129B3C83A11C10a72e',
	},
	[mumbaiChainId]: {
		[0]: '0x5093Ec43650Ec5f07df2FC255eC291c1f6E6d696',
		[1]: '0x7ED85a22cA1057c884bB518D565189858FcC8b3A',
	},
	[arbitrumGoerliChainId]: {
		[0]: '0xd8624E82473F0dA86a36ADa89fb5b871535e8789',
		[1]: '0x6aA0bcE05E3B622ECE2B36e61F62a64E08bd9Ea0',
	},
	[avalancheChainId]: {
		[0]: '',
		[1]: '',
	},
	[bscChainId]: {
		[0]: '',
		[1]: '',
	},
	[arbitrumChainId]: {
		[0]: '',
		[1]: '',
	},
	[polygonChainId]: {
		[0]: '',
		[1]: '',
	},
}

export const nftClaimerContract = {
	[fujiChainId]: '0x94bDC5B5eE97AEb0CbB059bf20E0dD8182d9E11B',
	[bscTestnetChainId]: '0xDf613d1228F9E57b7Dc55d0C8cc156d4607A2740',
	[arbitrumGoerliChainId]: '0x2b0c508bddC1EDb7c51a91E27d5Fd55AC6D597Db',
	[mumbaiChainId]: '0x0A22Bc0b41D7ea900E39be7fCaB5d47C19fae522',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[arbitrumChainId]: '',
	[polygonChainId]: '',
}

export const sbcNFTContract = {
	[fujiChainId]: '0xbfE2d15670f57B005361DFc7f9fA2195F0BF63f8',
	[bscTestnetChainId]: '0xfb5bdc30860733C8F73C491D34e3ac5Ec433B667',
	[arbitrumGoerliChainId]: '0xCA2FE55903a1d95878a988B72e4F0438a8bC69ce',
	[mumbaiChainId]: '0x4b2564Af742666eFc126189c0E0B0BF3a01a32c2',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[arbitrumChainId]: '',
	[polygonChainId]: '',
}

export const rndGeneratorContract = {
	[fujiChainId]: '0x31D5E61f2B0f4fA8d17994DC2db5145f22a7D8b8',
	[bscTestnetChainId]: '0x5cC868972aF42DC9E6724Fa2ab5B81fa6fEA7D27',
	[arbitrumGoerliChainId]: '0xF0cC8903C27Fd79F5c298c361313C38B443D65aE',
	[mumbaiChainId]: '0xA0D4571BFa22CE514FC2684A595A8ef1A6b3d88e',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[arbitrumChainId]: '',
	[polygonChainId]: '',
}

export const ultibetsSignAddresses = {
	[fujiChainId]: '0x11B71d844aF6dC32c1b1D3Bfbe3EaD47544FA47a',
	[bscTestnetChainId]: '0x3E2dCB0D2a062Ecc5529981926f072F207B6b730',
	[arbitrumGoerliChainId]: '0x08b02d30486e4eFc9c59617D92c19376ac4310D5',
	[mumbaiChainId]: '0xb6E78ea5e845a9001364ded8fF3eDe85635bBEb6',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[arbitrumChainId]: '',
	[polygonChainId]: '',
}

export const ultibetsRewardAddresses = {
	[fujiChainId]: '0xcD84828fCd4f9405Da673b636B8D2687f2048672',
	[bscTestnetChainId]: '0xff7BA1572F059B8c0Fa2e43F99685428ECb95611',
	[arbitrumGoerliChainId]: '0xc929ef4FE987B82eE495c7E428D339CfFF3b18C0',
	[mumbaiChainId]: '0xF973A6156B68e5eAf5C93F85029dc64958b854c7',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[arbitrumChainId]: '',
	[polygonChainId]: '',
}

export const ultiBetsLeaderBoardAddresses = {
	[fujiChainId]: '0x018419c2aA903ac47a2b6207e047A179203a026F',
	[bscTestnetChainId]: '0xE0BAD5B84C1F3dEB2eE260CBf76a41Ca0320De84',
	[arbitrumGoerliChainId]: '0x238f82A18ccA37d49486b04360D5Ad64CB02F681',
	[mumbaiChainId]: '0x0fD99aEB86c46106aF108283d02281D763486e61',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[arbitrumChainId]: '',
	[polygonChainId]: '',
}

export const utbetsTokenAddresses: {
	[key: number]: string
} = {
	[fujiChainId]: '0xbadafA1404C5902c45c8B3596827Ec3003923D3B',
	[bscTestnetChainId]: '0x11CD8f66Fe38eBc9eA2bfAD4b7927fE4035657eE',
	[arbitrumGoerliChainId]: '0x011cd85cf9b7D32258290e0550305E04e4A48B20',
	[mumbaiChainId]: '0x2Ee0BCd22293Cd6b37Eff2765059ADCd9126E605',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[arbitrumChainId]: '',
	[polygonChainId]: '',
}

export const usdcAddresses: {
	[key: number]: string
} = {
	[fujiChainId]: '0xbadafA1404C5902c45c8B3596827Ec3003923D3B',
	[bscTestnetChainId]: '0x11CD8f66Fe38eBc9eA2bfAD4b7927fE4035657eE',
	[arbitrumGoerliChainId]: '0x011cd85cf9b7D32258290e0550305E04e4A48B20',
	[mumbaiChainId]: '0x2Ee0BCd22293Cd6b37Eff2765059ADCd9126E605',
	[avalancheChainId]: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
	[bscChainId]: '',
	[arbitrumChainId]: '',
	[polygonChainId]: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
}

export const airdropContractAddresses = {
	[fujiChainId]: '0xcC5E614e9aCd407DAE318d500261798cC683424e',
	[bscTestnetChainId]: '0x0Cd2Cd48a78dB430C1CA017Dd45385FEc02F158f',
	[arbitrumGoerliChainId]: '0x7a28BBc7971aD6dD309eb507E3dE72fF92855A0f',
	[mumbaiChainId]: '0xd2dEf71F8c264fe1Ce19C825519e8110a13A486b',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[arbitrumChainId]: '',
	[polygonChainId]: '',
}

export const merchStoreContractAddresses = {
	[fujiChainId]: '0xeFB02A27744e56f688075a6CA1aeff41Bb23173A',
	[bscTestnetChainId]: '0x69d109dC14Eed2ea5B798B0677d6Af3887050F37',
	[arbitrumGoerliChainId]: '0x43A5f5934E4f0b645c491fC288cdc5e108138d54',
	[mumbaiChainId]: '0x446542Ec8c1b36D17da89EdcD8200d8128532A53',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[arbitrumChainId]: '',
	[polygonChainId]: '',
}

export const symbols = {
	[fujiChainId]: 'avalanche-2',
	[bscTestnetChainId]: 'binancecoin',
	[arbitrumGoerliChainId]: 'ethereum',
	[mumbaiChainId]: 'matic-network',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[arbitrumChainId]: '',
	[polygonChainId]: '',
}

export const chainRPCs = {
	[fujiChainId]: 'https://blue-methodical-log.avalanche-testnet.quiknode.pro/30bd65de567880d32913c015df543918655554e1/ext/bc/C/rpc/',
	[bscTestnetChainId]: 'https://smart-solitary-orb.bsc-testnet.quiknode.pro/7e146d49536f41e7b69c6d06f94a343cc4934760/',
	[arbitrumGoerliChainId]: 'https://white-summer-sky.arbitrum-goerli.quiknode.pro/3c84981687194332bc62a9c897e4ad9255ca90e1/',
	[mumbaiChainId]: 'https://newest-greatest-sailboat.matic-testnet.quiknode.pro/0ae33f48f69959e577dab9af178f222b78e1bd16/',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[arbitrumChainId]: '',
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
			logo: soccerInternationalLogo,
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
			logo: atpLogo,
			name: 'ATP',
			subMenuIndex: 1,
		},
		[2]: {
			logo: wtaLogo,
			name: 'WTA',
			subMenuIndex: 2,
		},
	},
	// combat sports
	[5]: {
		[1]: {
			logo: boxingLogo,
			name: 'Boxing',
			subMenuIndex: 1,
		},
		[2]: {
			logo: mmaLogo,
			name: 'MMA',
			subMenuIndex: 2,
		},
	},
	// motorsports
	[6]: {
		[1]: {
			logo: formulaLogo,
			name: 'Formula 1',
			subMenuIndex: 1,
		},
		[2]: {
			logo: motoLogo,
			name: 'Moto GP',
			subMenuIndex: 2,
		},
		[3]: {
			logo: wrcLogo,
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
		icon: '/images/svgs/sidebar/elections.png',
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
	[arbitrumGoerliChainId]: 'https://api.thegraph.com/subgraphs/name/ultibets/ultibetsarbitrum',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[arbitrumChainId]: '',
	[polygonChainId]: '',
}

export const referralChains = [
	arbitrumChainId,
	mumbaiChainId,
]

export const bridgeURL = 'https://app.chainport.io/';
export const uniswapURL = "https://app.uniswap.org/#/swap";
export const uniswapAddLP = "https://app.uniswap.org/#/add/ETH/";
export const snapshotURL = "https://snapshot.org/#/ultibets.eth";


export const rate = 1000000000;
