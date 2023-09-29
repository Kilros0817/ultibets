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
		[0]: '0x12f8EAe47859EbA043f5a00965B0266bf5b888d3',
		[1]: '0x404D828E7CFf97C855bF323f424173aAEc88f895',
	},
	[bscTestnetChainId]: {
		[0]: '0xA06dC2D786c32d419aB53eC7bcea2646Ec0F7eDA',
		[1]: '0x530E1dF7AaC3d50cc804596B71ACA1E96F645FCB',
	},
	[arbitrumGoerliChainId]: {
		[0]: '0x308CFdC1262204d19dd2d7B3cF9335c6bBbbB449',
		[1]: '0x1DdF7671798e6ee8cF97646e26de7179b1854231',
	},
	[mumbaiChainId]: {
		[0]: '0x1cFA1414De432Aa32819382957cE0AE9882a785F',
		[1]: '0x0960f7f718A8C652b27a351216445c9529C5d311',
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
		[0]: '0x6b8fDbaB50Ae852e87fa08aEe2Eb8dD691804700',
		[1]: '0xa5e49C51A0CA08b7e03104A4b678A90eF0a228d6',
	},
	[bscTestnetChainId]: {
		[0]: '0x3754aF9F19d21650678c9D56d1F21e2Cf71885cd',
		[1]: '0x353397e393D9182Ad8Af9f89C58d0B0f2CF884ea',
	},
	[mumbaiChainId]: {
		[0]: '0x8F4712566e0887fe3367bE5c3DA0991e946d048D',
		[1]: '0x030d194A93ef1d13653231D36eDE5AA9727182fe',
	},
	[arbitrumGoerliChainId]: {
		[0]: '0x2EEB2897b4B0bfeED904e160292AB8C8c65d1903',
		[1]: '0xa2b7Eb949bD20d66cB27de6F1055d3d665923D23',
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
	[fujiChainId]: '0xC4537A30a5E4f32FA8F308D5bea64aF8130049E5',
	[bscTestnetChainId]: '0x56B9AE4B9a3fA0703fdAD2CDD45FD35acF0154ff',
	[arbitrumGoerliChainId]: '0x7a90184090f4A3BE69948B4db72D73adad2E7044',
	[mumbaiChainId]: '0xE3508F488361a623bc6EDC22B03EdC9A35E63332',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[arbitrumChainId]: '',
	[polygonChainId]: '',
}

export const sbcNFTContract = {
	[fujiChainId]: '0xb683f785deF0807f1bC6Bf20Bbd812d9B3Cfe414',
	[bscTestnetChainId]: '0xa8F6A9d0924c7d5f80F5583b36BADC7A20Bb8A19',
	[arbitrumGoerliChainId]: '0xB6cA65CD43692ec819aD20D9bB89C8FAc03803BC',
	[mumbaiChainId]: '0x5Ef57195f1D8Ac89a23F1f111EE03d6f39a73eC3',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[arbitrumChainId]: '',
	[polygonChainId]: '',
}

export const rndGeneratorContract = {
	[fujiChainId]: '0xE9910C0a2014D77BbFF7E67b091E9aEb8aD6969B',
	[bscTestnetChainId]: '0x1Fca797F286f23149fEA162B9957C3d446D5eadE',
	[arbitrumGoerliChainId]: '0xB1b9BfD69661fF41eDbAF0D7624a76D5DA95B8F9',
	[mumbaiChainId]: '0x9E50E91c3B3931b7a93EF9D18BC8CfA7598Bc45F',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[arbitrumChainId]: '',
	[polygonChainId]: '',
}

export const ultibetsSignAddresses = {
	[fujiChainId]: '0xcEd3B1c7dD10347F05173432C9682c7F0C39782a',
	[bscTestnetChainId]: '0xdEC34236C4706a6030e09f4c037F15155f23F937',
	[arbitrumGoerliChainId]: '0xa44097D96445aD0E8AA8eDe6729b0BE413a9A394',
	[mumbaiChainId]: '0x8BE7B00eeC99491bab0B6B81589728E8dAb65827',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[arbitrumChainId]: '',
	[polygonChainId]: '',
}

export const ultibetsRewardAddresses = {
	[fujiChainId]: '0xf291e04b445Ef25a791DFbAdfd19013DCb397fb6',
	[bscTestnetChainId]: '0x1CF08836d65b3891506a22F5B12e66434142f607',
	[arbitrumGoerliChainId]: '0x70122b8f9D4bDe0D7A1FF7ceaB5dc166Ee070cdB',
	[mumbaiChainId]: '0x7C5104659F2Cc97453c37e8783Ed1EB4CBF673EF',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[arbitrumChainId]: '',
	[polygonChainId]: '',
}

export const ultiBetsLeaderBoardAddresses = {
	[fujiChainId]: '0x405F293aeFa59B184534a118718135c3d349611d',
	[bscTestnetChainId]: '0x11A0517e3DC03512dE280F99A41d07FA4fd77c35',
	[arbitrumGoerliChainId]: '0x5bbD0EB30B107228ba31d3F2C6Fae4C7116c5C22',
	[mumbaiChainId]: '0x76904FE7cb4F0813d7dCfeA275E2B0f3959Af819',
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
	[fujiChainId]: '0xd88BA1c8a9949032DEdD1D4a0114Ce5b8BA03907',
	[bscTestnetChainId]: '0xaeA6fFa9c00aF813fCa22667358B5cdB1776a317',
	[arbitrumGoerliChainId]: '0xb3e808cab6AdDDB0e52760C391da822817387b55',
	[mumbaiChainId]: '0x1f7BEF79CbaE099737a1DfbBCaC18FBf051FB4B4',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[arbitrumChainId]: '',
	[polygonChainId]: '',
}

export const merchStoreContractAddresses = {
	[fujiChainId]: '0xc652580D7c97A963BdD5a9d5dab27a59bBef2d17',
	[bscTestnetChainId]: '0xC11EAbC2CEE6842d9478204A04BB984Ea0C44b95',
	[arbitrumGoerliChainId]: '0xfDc08dB75f73E22801c83952c8a39076237Cf8A2',
	[mumbaiChainId]: '0xe3Bfe116aD8e8346007Ff710F06EE740D17E1A48',
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
			logo: ussportNFLLogo,
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
