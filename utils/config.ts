import { avalancheLogo, basketballNBALogo, bscLogo, optimismLogo, moviesLogo, otherPredictionLogo, polygonLogo, soccerEnglandLogo, soccerFranceLogo, soccerGermanLogo, soccerItalyLogo, soccerSpainLogo, soccerUCLLogo, tvshowsLogo, usdcLogo, ussportNFLLogo, utbetsTokenLogo } from "./assets";

const avalancheChain = {
	chainId: 43114,
	logo: '/images/pngs/chain-logo/avalanche.svg',
	name: 'Avalanche',
	mainnetName: "Avalanche Mainnet",
	alt: 'avalanche-logo',
	index: 0,
	nativeToken: "AVAX",
	entryFee: 0.5,
	roundFee: 0.2,
};

const bscChain = {
	chainId: 56,
	logo: '/images/pngs/chain-logo/bsc.svg',
	name: 'BSC',
	mainnetName: "BSC Mainnet",
	alt: 'bsc-logo',
	index: 1,
	nativeToken: "BNB",
	entryFee: 0.02,
	roundFee: 0.01,
};

const optimismChain = {
	chainId: 10,
	logo: '/images/pngs/chain-logo/optimism.svg',
	name: 'Optimism',
	mainnetName: "Optimism",
	alt: 'optimism-logo',
	index: 2,
	nativeToken: "ETH",
	entryFee: 0.004,
	roundFee: 0.002,
};

const polygonChain = {
	chainId: 137,
	logo: '/images/pngs/chain-logo/polygon.svg',
	name: 'Polygon',
	mainnetName: "Polygon Mainnet",
	alt: 'polygon-logo',
	index: 3,
	nativeToken: "MATIC",
	entryFee: 5,
	roundFee: 2,
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
		},
		{
			...bscChain,
			chainId: 97,
		},
		{
			...optimismChain,
			chainId: 420,
		},
		{
			...polygonChain,
			chainId: 80001,
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
	},
	[97]: {
		...bscChain,
		chainId: 97,
	},
	[420]: {
		...optimismChain,
		chainId: 420,
	},
	[80001]: {
		...polygonChain,
		chainId: 80001,
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

export const stakingPools = {
	mainnet: {
		["43114a"]: {
			pairTokenLogo: '/images/pngs/chain-logo/avalanche.svg',
			poolName: 'UTBETS-AVAX LP',
			stakedAmount: 0,
			claimAbleAmount: 0,
			claimedAmount: 0,
			chainId: 43114,
			index: 0,
			isNativeUtbetsLp: true,
		},
		["56a"]: {
			pairTokenLogo: '/images/pngs/chain-logo/bsc.svg',
			poolName: 'UTBETS-BNB LP',
			stakedAmount: 0,
			claimAbleAmount: 0,
			claimedAmount: 0,
			chainId: 56,
			index: 1,
			isNativeUtbetsLp: true,
		},
		["10a"]: {
			pairTokenLogo: '/images/pngs/chain-logo/optimism.svg',
			poolName: 'UTBETS-OP LP',
			stakedAmount: 0,
			claimAbleAmount: 0,
			claimedAmount: 0,
			chainId: 10,
			index: 2,
			isNativeUtbetsLp: true,
		},
		["137a"]: {
			pairTokenLogo: '/images/pngs/chain-logo/matic.svg',
			poolName: 'UTBETS-MATIC LP',
			stakedAmount: 0,
			claimAbleAmount: 0,
			claimedAmount: 0,
			chainId: 137,
			index: 3,
			isNativeUtbetsLp: true,
		},
		["43114b"]: {
			pairTokenLogo: '/images/pngs/token-logo/usdc.svg',
			poolName: 'UTBETS-USDC LP',
			chainName: 'Avalanche Chain',
			stakedAmount: 0,
			claimAbleAmount: 0,
			claimedAmount: 0,
			chainId: 43114,
			index: 4,
			isNativeUtbetsLp: false,
		},
		["56b"]: {
			pairTokenLogo: '/images/pngs/token-logo/usdc.svg',
			poolName: 'UTBETS-USDC LP',
			chainName: 'Binance Chain',
			stakedAmount: 0,
			claimAbleAmount: 0,
			claimedAmount: 0,
			chainId: 56,
			index: 5,
			isNativeUtbetsLp: false,
		},
		["10b"]: {
			pairTokenLogo: '/images/pngs/token-logo/usdc.svg',
			poolName: 'UTBETS-USDC LP',
			chainName: 'Optimism Chain',
			stakedAmount: 0,
			claimAbleAmount: 0,
			claimedAmount: 34,
			chainId: 10,
			index: 6,
			isNativeUtbetsLp: false,
		},
		["137b"]: {
			pairTokenLogo: '/images/pngs/token-logo/usdc.svg',
			poolName: 'UTBETS-USDC LP',
			chainName: 'Polygon Chain',
			stakedAmount: 0,
			claimAbleAmount: 0,
			claimedAmount: 0,
			chainId: 137,
			index: 7,
			isNativeUtbetsLp: false,
		},
	},
	testnet: {
		["43113a"]: {
			pairTokenLogo: '/images/pngs/chain-logo/avalanche.svg',
			poolName: 'UTBETS-AVAX LP',
			stakedAmount: 0,
			claimAbleAmount: 0,
			claimedAmount: 0,
			chainId: 43113,
			index: 0,
			isNativeUtbetsLp: true,
		},
		["97a"]: {
			pairTokenLogo: '/images/pngs/chain-logo/bsc.svg',
			poolName: 'UTBETS-BNB LP',
			stakedAmount: 0,
			claimAbleAmount: 0,
			claimedAmount: 0,
			chainId: 97,
			index: 1,
			isNativeUtbetsLp: true,
		},
		["420a"]: {
			pairTokenLogo: '/images/pngs/chain-logo/optimism.svg',
			poolName: 'UTBETS-OP LP',
			stakedAmount: 0,
			claimAbleAmount: 0,
			claimedAmount: 0,
			chainId: 420,
			index: 2,
			isNativeUtbetsLp: true,
		},
		["80001a"]: {
			pairTokenLogo: '/images/pngs/chain-logo/matic.svg',
			poolName: 'UTBETS-MATIC LP',
			stakedAmount: 0,
			claimAbleAmount: 0,
			claimedAmount: 0,
			chainId: 80001,
			index: 3,
			isNativeUtbetsLp: true,
		},
		["43113b"]: {
			pairTokenLogo: '/images/pngs/token-logo/usdc.svg',
			poolName: 'UTBETS-USDC LP',
			chainName: 'Avalanche Chain',
			stakedAmount: 0,
			claimAbleAmount: 0,
			claimedAmount: 0,
			chainId: 43113,
			index: 4,
			isNativeUtbetsLp: false,
		},
		["97b"]: {
			pairTokenLogo: '/images/pngs/token-logo/usdc.svg',
			poolName: 'UTBETS-USDC LP',
			chainName: 'Binance Chain',
			stakedAmount: 0,
			claimAbleAmount: 0,
			claimedAmount: 0,
			chainId: 97,
			index: 5,
			isNativeUtbetsLp: false,
		},
		["420b"]: {
			pairTokenLogo: '/images/pngs/token-logo/usdc.svg',
			poolName: 'UTBETS-USDC LP',
			chainName: 'Optimism Chain',
			stakedAmount: 0,
			claimAbleAmount: 0,
			claimedAmount: 0,
			chainId: 420,
			index: 6,
			isNativeUtbetsLp: false,
		},
		["80001b"]: {
			pairTokenLogo: '/images/pngs/token-logo/usdc.svg',
			poolName: 'UTBETS-USDC LP',
			chainName: 'Polygon Chain',
			stakedAmount: 0,
			claimAbleAmount: 0,
			claimedAmount: 0,
			chainId: 80001,
			index: 7,
			isNativeUtbetsLp: false,
		},
	}
}

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
		[0]: '0x0d7F53247c4C6190c71a3eF89DAd0329AB3eAE6B',
		[1]: '0x4EFC118E67A6B44A0C403a0f4BD55aD70fec830A',
	},
	[bscTestnetChainId]: {
		[0]: '0xC8711154AC635dBdADD3d9e283F4B7652aFE1491',
		[1]: '0xfA09687915348A79B421f44D12812068FFca33Df',
	},
	[opGoerliChainId]: {
		[0]: '0x98DcE4e32756e28c2B450e1128DaCae76dD84aEF',
		[1]: '0x7fd4e21722b45DBFA2Db5a70F0354F61361108E1',
	},
	[mumbaiChainId]: {
		[0]: '0x04db80D4Db5D043FC615e88c3e8b59bDC4AE0e53',
		[1]: '0xeF8960Ab32B9a622C7ea9871001220d291fAcEF8',
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
		[0]: '0xc24DC48d223Dc98997f2D9EE4115DCC1ce182801',
		[1]: '0x41a20ADE03A00Be0E01c030720c5583c50Ddc99b',
	},
	[bscTestnetChainId]: {
		[0]: '0x3c3F4126979806E522A73aC144e3d254B61E3968',
		[1]: '0x6aB0B6811c796515d257eFB1A2f7D55d3922bE5d',
	},
	[mumbaiChainId]: {
		[0]: '0x7Abb6953D97588F1456e3384f0FBf6936a4F5B30',
		[1]: '0x6e029b9A75Ef10Aa9d8114b875C55338437b7B6f',
	},
	[opGoerliChainId]: {
		[0]: '0xA3D63924D3761bd283E8FbDEf22bC0dDFC75FbBa',
		[1]: '0x8b395898C7ddA896a6F1B4574b77ED915101dc5B',
	},
	[avalancheChainId]: {
		[0]: '',
		[1]: '',
	},
	[bscChainId]: {
		[0]: '',
		[1]: '',
	},
	[polygonChainId]: {
		[0]: '',
		[1]: '',
	},
}

export const nftClaimerContract = {
	[fujiChainId]: '0x0D319fF72fEB5B6B4e7EAb3421B14Dfbe63A3Da0',
	[bscTestnetChainId]: '0x7F10c4F4538cCe5cb6d6B92949f3678FAB3161Ad',
	[opGoerliChainId]: '0xB9106A666A05BF085301D934232aEf15a26650E9',
	[mumbaiChainId]: '0x46518b4cBF352871C8f3A947b483Eb3fdc5A361B',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[opChainId]: '',
	[polygonChainId]: '',
}

export const sbcNFTContract = {
	[fujiChainId]: '0xB532b8B27dF704A14a0646848aD92750d1111Bed',
	[bscTestnetChainId]: '0x40d304556EAEE2e594a2444B4e843E77F3C62a78',
	[opGoerliChainId]: '0x4E225601377c6a1eFeddEf92088fbC685F46964f',
	[mumbaiChainId]: '0xC534F296D5F1A5Bd7f61b5F2A57D32eb82ca81b2',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[opChainId]: '',
	[polygonChainId]: '',
}

export const rndGeneratorContract = {
	[fujiChainId]: '0x5111082B05051acF7c98Ef207B2C601536BeFe24',
	[bscTestnetChainId]: '0x88CF8D606822bf8542BA1156852DDFFF8Db3135b',
	[opGoerliChainId]: '0xe6b9dfcF7E4C818B067532Ed9F012bA9FB5C3258',
	[mumbaiChainId]: '0xBd6B68695309639361BAE49623F8d13141FcE2cd',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[opChainId]: '',
	[polygonChainId]: '',
}

export const ultibetsSignAddresses = {
	[fujiChainId]: '0xe7c162860D032cA4925eb090996CC788420427Ea',
	[bscTestnetChainId]: '0x1876f5C14E30e24f102DC06342b47E9a4D61A997',
	[opGoerliChainId]: '0x011cd85cf9b7D32258290e0550305E04e4A48B20',
	[mumbaiChainId]: '0xe650d71D69ABC1f481CFb5763247f698808F0A69',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[opChainId]: '',
	[polygonChainId]: '',
}

export const ultibetsRewardAddresses = {
	[fujiChainId]: '0x793C6120206A37C347E2c7D43691C712f4c0c956',
	[bscTestnetChainId]: '0x796fD5C60D804740a2546B653E99d712817b8E2c',
	[opGoerliChainId]: '0x035ed5cbCA5816cd59e2D7413c445F282386c81A',
	[mumbaiChainId]: '0x14Bec13bA34d37767FaEbC47b38D58C3F1Bf9B12',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[opChainId]: '',
	[polygonChainId]: '',
}

export const ultiBetsLeaderBoardAddresses = {
	[fujiChainId]: '0xFD62999C4582Ca4d9cCb77BbD10Ac4b3dC9b0264',
	[bscTestnetChainId]: '0xB33D0033221Be747FB7aF08B65178D701905F06f',
	[opGoerliChainId]: '0x573889149441C4F885D4d0cc551BdE613660a383',
	[mumbaiChainId]: '0x2CFDD58910e5faaaA5910a1aa12eD266E6962E5d',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[opChainId]: '',
	[polygonChainId]: '',
}

export const utbetsTokenAddresses: {
	[key: number]: string
} = {
	[fujiChainId]: '0x3961D3E0F0AFa53eC23dDEe770c637d503A828cB',
	[bscTestnetChainId]: '0x03944D714cE2a05Af2a53B0807E3268115945675',
	[opGoerliChainId]: '0x15A75AD7B03A54e0b8d94435F839DADa5BbDcC9C',
	[mumbaiChainId]: '0xbDA616a1DBF0090465aA84D3Aa4e735Ff3118876',
	[avalancheChainId]: '',
	[bscChainId]: '',
	[opChainId]: '',
	[polygonChainId]: '',
}

export const airdropContractAddresses = {
	[fujiChainId]: '0xe4e6d7Da25583DdbBac48c87F1ac2bF44638839d',
	[bscTestnetChainId]: '0xdA43928A5fDa90B663113D328268B9088674dac6',
	[opGoerliChainId]: '0xd0b1Ac30638bA9E516cdF11bec52F3DA18AB7Dda',
	[mumbaiChainId]: '0x8e3307CC24f88fB43d972BaDaD5fB79ce893C2a5',
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
	'Belarus',
	'Central African Republic',
	'Democratic Republic Of China',
	'Cuba',
	'France',
	'Haiti',
	'Italy',
	'Libya',
	'Mali',
	'Myanmar',
	'North Korea',
	// 'Federation Of Russia',
	'Somalia',
	'Syria',
	'United Kingdom',
	'United States',
	'Yemen',
	'Zimbabwe',
];


export const bannedCountriesCodes = [
	'AF',
	'BY',
	'CF',
	'CN',
	'CU',
	'FR',
	'HT',
	'IT',
	'LY',
	'ML',
	'MM',
	'KP',
	// 'RU',
	'SO',
	'SY',
	'GB',
	'US',
	'YE',
	'ZW',
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
export const snapshotURL = "https://demo.snapshot.org/#/kilros1.eth";

export const polygonUSDCAddress = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
