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
		href: '/squid-competition',
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
		[0]: '0xFe5DE21aF57CDcA2714EC96A65F3b18B1d938762',
		[1]: '0xb74090Eb3f049Ba23c177aE9359bC3835531f9ec',
	},
	[bscTestnetChainId]: {
		[0]: '0x99674f387e06450b699359d7f859638a5927e7F3',
		[1]: '0x087F08382F7592064379513361C04AceAFE1f9F1',
	},
	[opGoerliChainId]: {
		[0]: '0x6aae68622efA1e575eF57dbfE552e82561A36A92',
		[1]: '0x47e9ab50062D13C1FA15b921aB3D027Bc2CCb8D1',
	},
	[mumbaiChainId]: {
		[0]: '0xE5D956bae8CD817f75Ffa8469468De2AcB085cC4',
		[1]: '0x63bcC004b432c1473fbDD9aa868Df1CDC13CA644',
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
		[0]: '0x20e86E3025552f64C23DFE92fb627eCE15fe8D8C',
		[1]: '0x87fc7bFB36B806fc32950369551Bf8DeCbC23e60',
	},
	[bscTestnetChainId]: {
		[0]: '0x6ABB96b6B291828940E22AFe8a94F2dca639BE52',
		[1]: '0xaf3D1bA2e497EB64561808e894F9efcfB95073EE',
	},
	[mumbaiChainId]: {
		[0]: '0x70C5058E8e1fD9A340f089a2C3AF0b98d10ED67c',
		[1]: '0xcBC21F7f74fa78d8e8267CCC4f1D34F0FFDf5f99',
	},
	[opGoerliChainId]: {
		[0]: '0x6C786aB69cc172bba6Bed2E2478D2633AdCeDFc3',
		[1]: '0xBa5ece4e527c828d9B6B11393526E1B39D818845',
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
	[fujiChainId]: '0x1761a6038D737485098Ca4294Cf1D0DE9803D66b',
	[bscTestnetChainId]: '0xB6F8D729640EFD043Ebd163a9C2Cf3826c84F9AA',
	[opGoerliChainId]: '0x69F9d419df79041C00a8AC17f9FcA6a85784cDbD',
	[mumbaiChainId]: '0x2D3eF45a3d3A77ABbE46df9a840Ff63d1C6A09ED',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[opChainId]: '',
	[polygonChainId]: '',
}

export const sbcNFTContract = {
	[fujiChainId]: '0xD61FEf1344dA7FB53D2E198366793FFa608BDFea',
	[bscTestnetChainId]: '0x462772445bB08eDAFC6B7433A96Ab9102347cDb0',
	[opGoerliChainId]: '0x23399aCcf1af900Ec67deB95f53779d9a4284824',
	[mumbaiChainId]: '0x85eaAD3627d3c7ecD56aF86c5e495D75551Ab108',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[opChainId]: '',
	[polygonChainId]: '',
}

export const rndGeneratorContract = {
	[fujiChainId]: '0xB69382d70B41220C24b92364c36edf886655b7E5',
	[bscTestnetChainId]: '0x506c517aD25a01C8676C0eB0877821D12fF02c45',
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
	[fujiChainId]: '0x16c1bdA5e400Eb4679ff55A8a86fF4ab8f80574E',
	[bscTestnetChainId]: '0x1D384dbFC93F7170c312e65aAe0ab8194cDE559a',
	[opGoerliChainId]: '0xF5F9CFf048971EEB619cCC30E111F36d829F9950',
	[mumbaiChainId]: '0x522c1b7Bbe8f48eD80d693D52e1b16edd4BFC243',
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

export const chainRPCs = {
	[fujiChainId]: 'https://api.avax-test.network/ext/bc/C/rpc',
	[bscTestnetChainId]: 'https://bsc-testnet.publicnode.com',
	[opGoerliChainId]: 'https://goerli.optimism.io',
	[mumbaiChainId]: 'https://rpc-mumbai.maticvigil.com/',
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
	Triple,
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
		keyword: 'squid-competition',
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
		href: '/my-profile/my-referrals',
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
	[fujiChainId]: 'https://api.thegraph.com/subgraphs/name/kilros0817/ultibetsavax',
	[bscTestnetChainId]: 'https://api.thegraph.com/subgraphs/name/kilros0817/ultibetsbsc-1',
	[mumbaiChainId]: 'https://api.thegraph.com/subgraphs/name/kilros0817/ultibets',
	[opGoerliChainId]: 'https://api.thegraph.com/subgraphs/name/kilros0817/ultibetsop',
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

export const polygonUSDCAddress = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
// export const polygonUSDCAddress = "0x03944D714cE2a05Af2a53B0807E3268115945675";
