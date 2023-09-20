import {
    Box,
    Flex,
    Image,
    Table,
    Tbody,
    Tr,
    Td,
    Thead,
    Th,
} from '@chakra-ui/react'
import { formatEther } from 'viem'
import { useEffect, useState, useRef } from 'react'
import { useContractEvent, useNetwork } from 'wagmi'
import { LineChart, Line } from "recharts";

import {
    chainAttrs,
    delayTimeFromSubgraph,
    mumbaiChainId,
    polygonChainId,
    secondsInDay,
    secondsInMonth,
    secondsInWeek,
    ultiBetsLeaderBoardAddresses,
} from '../../utils/config'
import { getLeaderboardData } from '../../utils/interact/thegraph/getLeaderboardData'
import {
    LeaderboardInitialDataPredictionsType,
    LeaderboardInitialDataType,
    LeaderboardTableRowType,
    Point,
    RoiLogsType
} from '../../utils/types'
import LeaderboardTableMobile from './LeaderboardTableMobile'
import { UltiBetsLeaderBoardAbi, } from '../../utils/assets';


const labels = Array(30).fill('');

type LeaderboardTableProps = {
    selectedName: string
}

const LeaderboardTable = ({
    selectedName,
}: LeaderboardTableProps) => {
    const { chain, } = useNetwork();
    const scroll = useRef<any>()
    const [scrollX, setScrollX] = useState<number>(0) // For detecting start scroll postion
    const [scrollEnd, setScrollEnd] = useState<boolean>(false) // For detecting end of scrolling
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [leaderboardFullData, setLeaderboardFullData] = useState<LeaderboardTableRowType[]>([]);
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardTableRowType[]>([]);
    const [currentMainnetOrTestnetAttrs,] = useState(
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
    const [chainId, setChainId] = useState<number>();
    const [shouldRender, setShouldRender] = useState<boolean>(true);
    const [contract, setContract] = useState<any>();

    const slide = (shift: any) => {
        scroll.current.scrollLeft += shift
        if (
            Math.floor(scroll.current.scrollWidth - scroll.current.scrollLeft) <= scroll.current.offsetWidth
        ) {
            setScrollEnd(true)
        } else {
            setScrollEnd(false)
        }
    }

    const scrollCheck = () => {
        setScrollX(scroll.current.scrollLeft)
        if (
            Math.floor(scroll.current.scrollWidth - scroll.current.scrollLeft) <= scroll.current.offsetWidth
        ) {
            setScrollEnd(true)
        } else {
            setScrollEnd(false)
        }
    }

    useEffect(() => {
        if (
            scroll.current &&
            scroll?.current?.scrollWidth === scroll?.current?.offsetWidth
        ) {
            setScrollEnd(true)
        } else {
            setScrollEnd(false)
        }
        return () => { }
    }, [scroll?.current?.scrollWidth, scroll?.current?.offsetWidth])

    useEffect(() => {
        const chainId = chain?.id != undefined ? chain.id :
            process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;
        let currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == chainId);
        if (currentChainAttrsItem.length == 0) {
            const temporaryChainId = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? 137 : 80001
            currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == temporaryChainId);
        }
        setChainId(chainId);
        setContract({
            address: (ultiBetsLeaderBoardAddresses as any)[chainId],
            abi: UltiBetsLeaderBoardAbi,
        })
    }, [chain,]);

    const fetchDataFromSubgraph1 = (delayTime?: number) => {
        if (chainId == undefined) return;
        setIsLoading(true);
        setTimeout(() => {
            (async () => {
                const leaderboardInitialData = await getLeaderboardData(chainId);
                if (leaderboardInitialData?.isSuccess) {
                    await handleLeaderboardInitialData(leaderboardInitialData?.returnedData);
                }
            })()
        }, delayTime ? delayTime : delayTimeFromSubgraph) // delay from the state change of the thegraph
    }

    useEffect(() => {
        fetchDataFromSubgraph1(100);
    }, [
        chainId,
    ])

    useEffect(() => {
        fetchDataFromSubgraph1(5000);
    }, [shouldRender])

    useContractEvent({
        ...contract,
        eventName: 'NewLeader',
        listener() {
            setShouldRender(!shouldRender);
        },
    });

    const handleChartRoiPoints = (chartRoiInitialData: RoiLogsType, predictionData: LeaderboardInitialDataPredictionsType[]) => {
        const initTotal = parseFloat(formatEther(BigInt(chartRoiInitialData.totalBetAmount)));
        const initPaid = parseFloat(formatEther(BigInt(chartRoiInitialData.totalPaidAmount)));
        let points = Array().fill({ value: 0 });
        const initROI = initTotal > 0 ? Math.round((initPaid - initTotal) / initTotal * 100) : 0;
        points.push({ value: initROI });
        let totalAmount = initTotal;
        let totalPaid = initPaid;
        // @ts-ignore
        predictionData.sort((a, b) => a.event.startTime - b.event.startTime);
        predictionData.map((item, index) => {
            if (index > 0) {
                const betAmount = parseFloat(formatEther(BigInt(item.amount)));
                const paidAmount = parseFloat(formatEther(BigInt(item.paidAmount)));
                totalAmount += betAmount;
                totalPaid += paidAmount;
                const pnl = totalPaid - totalAmount;
                points.push({ value: Math.round(pnl / totalAmount * 100) })
            }
        })

        return points as Point[];
    }

    const modifyScale = (history: number[]) => {
        const avg =
            history.reduce((sum, curr) => {
                return sum + curr;
            }, 0) / history.length;
        let newData = history.map(function (value) {
            return value - avg + 0.001;
        });
        newData[newData.length - 1] += 0.00001;
        return newData;
    };


    const handleLeaderboardInitialData = async (leaderboardInitialData: LeaderboardInitialDataType[]) => {
        const leaderboardData = await Promise.all(leaderboardInitialData.map((item: LeaderboardInitialDataType, index: number) => {
            let data: LeaderboardTableRowType = {
                username: item.nameOnLeaderBoard,
                dailyRoi: 0,
                weeklyRoi: 0,
                monthlyRoi: 0,
                allTimeRoi: 0,
                dailyPnl: 0,
                weeklyPnl: 0,
                monthlyPnl: 0,
                allTimePnl: 0,
                allTimeChart: [],
            };

            const periodItems = [
                {
                    roi: 'dailyRoi',
                    pnl: 'dailyPnl',
                    timePeriod: secondsInDay,
                },
                {
                    roi: 'weeklyRoi',
                    pnl: 'weeklyPnl',
                    timePeriod: secondsInWeek,
                },
                {
                    roi: 'monthlyRoi',
                    pnl: 'monthlyPnl',
                    timePeriod: secondsInMonth,
                }
            ]

            let totalBettingAmount = 0;
            const predictions = item?.predictions;
            let allTimePnl = 0;
            let allTimeRoi = 0;
            if (predictions.length > 0) {
                if (Number(item.roiLogs[0].timestamp) <= Math.round(Date.now() / 1000) - secondsInWeek) {
                    totalBettingAmount = parseFloat(formatEther(BigInt(item.roiLogs[0].totalBetAmount)));
                }

                // @ts-ignore
                predictions.sort((a, b) => a.event.startTime - b.event.startTime);

                periodItems.map((periodItem) => {
                    const predictionsInPeriod = predictions?.filter(
                        (item: LeaderboardInitialDataPredictionsType) =>
                            Number(item.betTime) > Math.round(Date.now() / 1000) - periodItem.timePeriod
                    )

                    const totalPredictionAmount = predictionsInPeriod.reduce(
                        (
                            sum: number, prediction: LeaderboardInitialDataPredictionsType) =>
                            sum + parseFloat(formatEther(BigInt(prediction.amount))), 0)

                    const totalPaidAmount = predictionsInPeriod.reduce(
                        (sum: number, prediction: LeaderboardInitialDataPredictionsType) =>
                            sum + parseFloat(formatEther(BigInt(prediction.paidAmount))), 0)

                    let roi = 0;
                    let pnl = 0;
                    if (periodItem.roi == "monthlyRoi") {
                        totalBettingAmount += totalPredictionAmount;
                    }
                    if (totalPredictionAmount > 0) {
                        pnl = totalPaidAmount - totalPredictionAmount;
                        roi = Math.round(pnl / totalPredictionAmount * 100);
                    }

                    (data as any)[periodItem.roi] = roi == 0 ? 0 : parseFloat(roi.toFixed(1));
                    (data as any)[periodItem.pnl] = pnl == 0 ? 0 : parseFloat(pnl.toFixed(1));
                })

                allTimePnl = parseFloat(formatEther(BigInt(item.totalPrize))) - totalBettingAmount;

                const pointsInMonth = handleChartRoiPoints(item.roiLogs[0], item?.predictions);

                data['allTimeChart'] = pointsInMonth;
            }
            

            if (totalBettingAmount > 0) {
                allTimeRoi = Math.round(allTimePnl / totalBettingAmount * 100);
            }
            data['allTimePnl'] = allTimePnl == 0 ? 0 : parseFloat(allTimePnl.toFixed(1));
            data['allTimeRoi'] = allTimeRoi == 0 ? 0 : parseFloat(allTimeRoi.toFixed(1));

            return data;
        }))

        leaderboardData.sort((a, b) => b.allTimePnl - a.allTimePnl);

        setLeaderboardData(leaderboardData);
        setLeaderboardFullData(leaderboardData);
        setIsLoading(false);
    }

    useEffect(() => {
        if (selectedName.length >= 1) {
            setLeaderboardData(
                leaderboardFullData?.filter((item) => item.username.includes(selectedName))
            )
        } else {
            setLeaderboardData(leaderboardFullData)
        }
    }, [selectedName])

    return (
        < Box
            className='leaderboard-table'
        >
            <Flex
                display={['none', 'none', 'flex']}
                position='relative'
            >
                {
                    !scrollEnd && (
                        <Box
                            id="nextBtn"
                            _hover={{
                                cursor: 'pointer',
                                transform: 'scale(1.2)',
                            }}
                            position={'absolute'}
                            right={['20px', '-25px', '-25px', '-25px']}
                            mt={'53px'}
                            zIndex={100}
                            fontSize={'44px'}
                            color={'#FFB11C'}
                            onClick={() => slide(50)}
                        >
                            <Image
                                width={'30px'}
                                height={'30px'}
                                borderRadius={'50%'}
                                src="/images/svgs/icon/right.svg"
                                alt="right-arrow"
                            />
                        </Box>
                    )
                }

                {
                    scrollX !== 0 && (
                        <Box
                            _hover={{
                                cursor: 'pointer',
                                transform: 'scale(1.2)',
                            }}
                            id="prevBtn"
                            position={'absolute'}
                            left={'-28px'}
                            mt={'53px'}
                            zIndex={100}
                            fontSize={'44px'}
                            color={'#FFB11C'}
                            onClick={() => slide(-50)}
                        >
                            <Image
                                width={'30px'}
                                height={'30px'}
                                borderRadius={'50%'}
                                src="/images/svgs/icon/left.svg"
                                alt="left-arrow"
                            />
                        </Box>
                    )
                }
            </Flex>

            {
                isLoading && (
                    <Flex
                        className="loading-container"
                        justifyContent={'center'}
                        textAlign={'center'}
                        mt={'100px'}
                        alignItems={'center'}
                        px={'20px'}
                    >
                        <section>
                            <Flex className="loader loader-1">
                                <Flex className="loader-outter" />
                                <Flex className="loader-inner" />
                            </Flex>
                        </section>
                    </Flex>
                )
            }

            {/* desktop */}
            {
                !isLoading && (<Flex
                    direction='column'
                    ref={scroll}
                    overflowX='scroll'
                    sx={{
                        '&::-webkit-scrollbar': {
                            display: 'none',
                            background: 'transparent',
                            width: '0',
                            height: '0',
                        },
                        'scrollbarWidth': 'thin',
                        'scrollbarColor': 'transparent transparent',
                    }}
                    onScroll={scrollCheck}
                    display={['none', 'none', 'flex']}
                >
                    <Flex
                        display='flex'
                        direction={'column'}
                        width='100%'
                    >
                        <Flex
                            mt={'20px'}
                            direction={'column'}
                        >
                            <Table
                                mt={'20px'}
                                gap='2'
                                className='leaderboard-table'
                            >
                                <Thead
                                    fontStyle='normal'
                                    background={'rgba(0, 0, 0, 0.35)'}
                                    borderRadius='5px'
                                    className='leaderboard-table-header'
                                >
                                    <Tr>
                                        <Th
                                            className='first-row'
                                        >
                                            #
                                        </Th>
                                        <Th
                                            ml={'10px'}
                                            className='username'
                                        >
                                            Username
                                        </Th>
                                        <Th
                                        >
                                            Daily <br />ROI %
                                        </Th>
                                        <Th
                                        >
                                            Weekly <br />ROI %
                                        </Th>
                                        <Th
                                        >
                                            Monthly <br />ROI %
                                        </Th>
                                        <Th
                                        >
                                            All Time <br />ROI %
                                        </Th>
                                        <Th
                                        >
                                            Daily <br />PNL (Utbets)
                                        </Th>
                                        <Th
                                        >
                                            Weekly <br />PNL (Utbets)
                                        </Th>
                                        <Th
                                        >
                                            Monthly <br />PNL (Utbets)
                                        </Th>
                                        <Th
                                        >
                                            All Time <br />PNL (Utbets)
                                        </Th>
                                        <Th
                                        >
                                            All Time <br />Chart
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        leaderboardData.map((item, index) => (
                                            <Tr
                                                key={index}
                                                fontFamily={'Nunito'}
                                                fontWeight={'700'}
                                                fontSize={'17px'}
                                                lineHeight={'23px'}
                                                color={'white'}
                                                textTransform={'capitalize'}
                                                pt='7px'
                                                pb='5px'
                                                borderRadius={'5px'}
                                                height='32px'
                                            >
                                                <Td
                                                    className='first-row'
                                                    borderColor='transparent'
                                                >
                                                    {index + 1}
                                                </Td>
                                                <Td
                                                    borderColor='transparent'
                                                    ml={'10px'}
                                                    className='username'
                                                >
                                                    {item.username}
                                                </Td>
                                                <Td
                                                    ml={'60px'}
                                                    borderColor='transparent'
                                                    color={item.dailyRoi > 0 ? '#19A2A5' : '#BD3B32'}
                                                >
                                                    {item.dailyRoi}%
                                                </Td>
                                                <Td
                                                    ml={'110px'}
                                                    borderColor='transparent'
                                                    color={item.weeklyRoi > 0 ? '#19A2A5' : '#BD3B32'}
                                                >
                                                    {item.weeklyRoi}%
                                                </Td>

                                                <Td
                                                    ml={'80px'}
                                                    borderColor='transparent'
                                                    color={item.monthlyRoi > 0 ? '#19A2A5' : '#BD3B32'}

                                                >
                                                    {item.monthlyRoi}%
                                                </Td>

                                                <Td
                                                    ml={'80px'}
                                                    borderColor='transparent'
                                                    color={item.allTimeRoi > 0 ? '#19A2A5' : '#BD3B32'}

                                                >
                                                    {item.allTimeRoi}%
                                                </Td>

                                                <Td
                                                    ml={'60px'}
                                                    borderColor='transparent'
                                                    color={item.dailyPnl > 0 ? '#19A2A5' : '#BD3B32'}

                                                >
                                                    {item.dailyPnl}
                                                </Td>
                                                <Td
                                                    ml={'110px'}
                                                    borderColor='transparent'
                                                    color={item.weeklyPnl > 0 ? '#19A2A5' : '#BD3B32'}

                                                >
                                                    {item.weeklyPnl}
                                                </Td>

                                                <Td
                                                    ml={'80px'}
                                                    borderColor='transparent'
                                                    color={item.monthlyPnl > 0 ? '#19A2A5' : '#BD3B32'}

                                                >
                                                    {item.monthlyPnl}
                                                </Td>

                                                <Td
                                                    ml={'80px'}
                                                    borderColor='transparent'
                                                    color={item.allTimePnl > 0 ? '#19A2A5' : '#BD3B32'}

                                                >
                                                    {item.allTimePnl}
                                                </Td>

                                                <Td
                                                    ml={'80px'}
                                                    borderColor='transparent'
                                                >
                                                    <LineChart width={80} height={50} data={item.allTimeChart}>
                                                        <Line
                                                            type="monotone"
                                                            dot={false}
                                                            dataKey="value"
                                                            stroke={item.allTimePnl > 0 ? '#19A2A5' : '#BD3B32'}
                                                            strokeWidth={3}
                                                            fill="none"
                                                            isAnimationActive={true}
                                                            animationDuration={0}
                                                            unit="M"
                                                            strokeLinecap="round"
                                                            label="value"
                                                        />
                                                    </LineChart>
                                                </Td>
                                            </Tr>
                                        ))
                                    }
                                </Tbody>
                            </Table>
                        </Flex>
                    </Flex>
                </Flex>)
            }

            {/* mobile */}
            {
                !isLoading && (<Flex
                    mt={'20px'}
                    direction={'column'}
                    display={['flex', 'flex', 'none']}
                >
                    <LeaderboardTableMobile
                        leaderboardData={leaderboardData}
                    />
                </Flex>)
            }
        </Box >
    )
}

export default LeaderboardTable;