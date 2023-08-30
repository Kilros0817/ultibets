import { EventResultInPM, EventStatusInPM, EventType } from "./config"

export type SidePool = {
    sideValue: EventResultInPM // except Indeterminate
    amount: string // uint256
}

export type EventDetailDataType = {
    betType: number // 0: double case, 1: triple case,
    bettingVolume: string // uint256
    category: number // 1 ~ 12
    description: string
    eventID: string // uint256
    result: EventResultInPM // initial value is Indeterminate
    sidePools: SidePool[] // home, draw, away or yes/no
    startTime: string // timestamp
    status: EventStatusInPM
    subcategory: number
    tokenType: number // 0: native token, 1: utbets token
}

type SidePoolsType = {
    amount: string
    sideValue: number
}

type EventResultType = {
    eventID: string
    result: EventResultInPM
    tokenType: number // 0: native, 1: utbets
    description: string
    betType: EventType
    status: EventStatusInPM
    sidePools: SidePoolsType[]
}

export type MyPredictionsStatsType = {
    amount: string // uint256
    betTime: string
    event: EventResultType
    paidAmount: string
    prediction: EventResultInPM
}

export type PerkInfo = {
    perkLevel: number
    count: number
}

export type Point = {
    value: number
}

export type LeaderboardTableRowType = {
    id: number
    username: string
    dailyRoi: number
    weeklyRoi: number
    monthlyRoi: number
    allTimeRoi: number
    dailyPnl: number
    weeklyPnl: number
    monthlyPnl: number
    allTimePnl: number
    allTimeChart: Point[]
}

export type LeaderboardInitialDataPredictionsType = {
    betTime: string // timestamp
    amount: string // uint256
    paidAmount: string  // uint256
    prediction: EventResultInPM
}

export type RoiLogsType = {
    timestamp: string
    totalBetAmount: string // uint256
    totalPaidAmount: string // uint256
}

export type LeaderboardInitialDataType = {
    id: string // wallet
    claimedReferralRewardAmount: string // uint256
    isClaimedReferralBettingReward: boolean | null
    isReferred: boolean | number
    nameOnLeaderBoard: string
    onLeaderBoard: true
    referralBettingReward: string // uint256
    totalBettingAmount: string // uint256
    totalPrize: string // uint256
    totalRefereeNumber: string
    totalReferralRewardAmount: string // uint256
    validRefereeNumber: number
    predictions: LeaderboardInitialDataPredictionsType[]
    roiLogs: RoiLogsType[]
}

export type ChainAttrItemType = {
    chainId: number,
    logo: string,
    name: string,
    mainnetName: string,
    alt: string,
    index: number,
    nativeToken: string,
    entryFee: number,
    roundFee: number,
}