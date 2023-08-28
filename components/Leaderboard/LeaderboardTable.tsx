import {
    Box,
    Flex,
    Image,
    Text,
    Table,
    Tbody,
    Tr,
    Td,
    Thead,
    Th,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
} from '@chakra-ui/react'
import { useEffect, useState, useRef } from 'react'
import { Line } from 'react-chartjs-2'
import { IoMdArrowDropdown } from 'react-icons/io'
import { LeaderboardTableRowType } from '../../utils/types'

type LeaderboardTableMobileProps = {
    leaderboardData: LeaderboardTableRowType[]
    chartOptions: any
    chartLabels: any
}

const LeaderboardTableMobile = ({
    leaderboardData,
    chartOptions,
    chartLabels,
}: LeaderboardTableMobileProps) => {
    const [currentRoiIndex, setCurrentRoiIndex] = useState(0);
    const [currentPnlIndex, setCurrentPnlIndex] = useState(0);

    const scroll = useRef<any>()
    const [scrollX, setscrollX] = useState<number>(0) // For detecting start scroll postion
    const [scrollEnd, setScrollEnd] = useState<boolean>(false) // For detecting end of scrolling

    const slide = (shift: any) => {
        scroll.current.scrollLeft += shift
        if (
            Math.floor(scroll.current.scrollWidth - scroll.current.scrollLeft) <=
            scroll.current.offsetWidth
        ) {
            setScrollEnd(true)
        } else {
            setScrollEnd(false)
        }
    }

    const scrollCheck = () => {
        setscrollX(scroll.current.scrollLeft)
        if (
            Math.floor(scroll.current.scrollWidth - scroll.current.scrollLeft) <=
            scroll.current.offsetWidth
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

    const timeTypes = [
        {
            menuLabel: 'Daily',
            headerRoiLabel: 'dailyRoi',
            headerPnlLabel: 'dailyPnl',
        },
        {
            menuLabel: 'Weekly',
            headerRoiLabel: 'weeklyRoi',
            headerPnlLabel: 'weeklyPnl',
        },
        {
            menuLabel: 'Monthly',
            headerRoiLabel: 'monthlyRoi',
            headerPnlLabel: 'monthlyPnl',
        },
        {
            menuLabel: 'All Time',
            headerRoiLabel: 'allTimeRoi',
            headerPnlLabel: 'allTimePnl',
        }
    ]

    return (
        < Box >
            <Flex
                display='flex'
                position='relative'
                width={'100%'}
                className='left-right'
            >
                {/* right arrow */}
                {
                    !scrollEnd && (
                        <Box
                            id="nextBtn"
                            _hover={{
                                cursor: 'pointer',
                                transform: 'scale(1.2)',
                            }}
                            position={'absolute'}
                            right='-25px'
                            mt={'33px'}
                            zIndex={100}
                            fontSize={'44px'}
                            color={'#FFB11C'}
                            onClick={() => slide(50)}
                            height='30px'
                            width={'30px'}
                            top='-10px'
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

                {/* left arrow */}
                {
                    scrollX !== 0 && (
                        <Box
                            _hover={{
                                cursor: 'pointer',
                                transform: 'scale(1.2)',
                            }}
                            id="prevBtn"
                            position={'absolute'}
                            left={'-30px'}
                            top='-10px'
                            mt={'33px'}
                            zIndex={100}
                            fontSize={'44px'}
                            color={'#FFB11C'}
                            onClick={() => slide(-50)}
                            width='30px'
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

            <Flex
                direction='column'
                ref={scroll}
                overflowX={'scroll'}
                sx={{
                    '&::-webkit-scrollbar': {
                        display: 'none',
                        background: 'transparent',
                        width: '0',
                        height: '0',
                    },
                }}
                onScroll={scrollCheck}
            >
                <Table
                    mt={'20px'}
                    gap='2'
                    className='leaderboard-table'
                    overflowX={'scroll'}
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
                                className='menulist-wrapper'
                            >
                                <Menu
                                >
                                    <MenuButton
                                        as={Button}
                                        px='0'
                                        backgroundColor='transparent'
                                        _hover={{
                                            backgroundColor: 'transparent',
                                        }}
                                        _focus={{
                                            backgroundColor: 'transparent',
                                        }}
                                        _active={{
                                            backgroundColor: 'transparent',
                                        }}
                                        display='flex'
                                        height={'fit-content'}
                                        textAlign='start'
                                    >
                                        <Flex
                                            border={'1px solid white'}
                                            borderRadius='5px'
                                            pl='7px'
                                            mb='5px'
                                            py='3px'
                                            justifyContent={'space-between'}
                                            minWidth='90px'
                                        >
                                            <Flex
                                                direction='row'
                                                fontFamily={'Nunito'}
                                                fontSize='15px'
                                                lineHeight={'20px'}
                                                textTransform='capitalize'
                                                alignSelf='center'
                                                alignItems='center'
                                                display='flex'
                                                justifyContent='center'
                                                mr='3px'
                                            >
                                                {timeTypes[currentRoiIndex].menuLabel}
                                            </Flex>
                                            <Flex
                                                direction='column'
                                                justifyContent='center'
                                                className='roi-selection-dropdown'
                                            >
                                                <IoMdArrowDropdown />
                                            </Flex>
                                        </Flex>
                                        <Text
                                            ml='2px'
                                        >
                                            ROI %
                                        </Text>
                                    </MenuButton>
                                    <MenuList
                                        backgroundColor={'rgba(0, 0, 0, 0.35)'}
                                        minWidth='min-content'
                                        // width='156px'
                                        border={'none'}
                                        className='time-selection-menulist'
                                    >
                                        {
                                            timeTypes.map((item, index) => (
                                                <MenuItem
                                                    _hover={{
                                                        backgroundColor: '#E18833',
                                                    }}
                                                    _focus={{
                                                        backgroundColor: '#E18833',
                                                    }}
                                                    onClick={() => setCurrentRoiIndex(index)}
                                                    key={index}
                                                    fontFamily={'Nunito'}
                                                    fontSize='15px'
                                                    lineHeight={'20px'}
                                                    textTransform='capitalize'
                                                    alignSelf='center'
                                                    alignItems='center'
                                                    display='flex'
                                                    justifyContent='center'
                                                    width={'100px'}
                                                >
                                                    <Text
                                                        textTransform='capitalize'
                                                    >
                                                        {item.menuLabel}
                                                    </Text>
                                                </MenuItem>
                                            ))
                                        }
                                    </MenuList>
                                </Menu>
                            </Th>
                            <Th
                                className='menulist-wrapper'
                            >
                                <Menu
                                >
                                    <MenuButton
                                        as={Button}
                                        px='0'
                                        backgroundColor='transparent'
                                        _hover={{
                                            backgroundColor: 'transparent',
                                        }}
                                        _focus={{
                                            backgroundColor: 'transparent',
                                        }}
                                        _active={{
                                            backgroundColor: 'transparent',
                                        }}
                                        display='flex'
                                        height={'fit-content'}
                                        textAlign='start'
                                    >
                                        <Flex
                                            border={'1px solid white'}
                                            borderRadius='5px'
                                            pl='7px'
                                            mb='5px'
                                            py='3px'
                                            justifyContent={'space-between'}
                                            minWidth='90px'
                                        >
                                            <Flex
                                                direction='row'
                                                fontFamily={'Nunito'}
                                                fontSize='15px'
                                                lineHeight={'20px'}
                                                textTransform='capitalize'
                                                alignSelf='center'
                                                alignItems='center'
                                                display='flex'
                                                justifyContent='center'
                                                mr='3px'
                                            >
                                                {timeTypes[currentPnlIndex].menuLabel}
                                            </Flex>
                                            <Flex
                                                direction='column'
                                                justifyContent='center'
                                                className='roi-selection-dropdown'
                                            >
                                                <IoMdArrowDropdown />
                                            </Flex>
                                        </Flex>
                                        <Text
                                            ml='2px'
                                        >
                                            PNL (Utbets)
                                        </Text>
                                    </MenuButton>
                                    <MenuList
                                        backgroundColor={'rgba(0, 0, 0, 0.35)'}
                                        minWidth='min-content'
                                        border={'none'}
                                        className='time-selection-menulist'
                                    >
                                        {
                                            timeTypes.map((item, index) => (
                                                <MenuItem
                                                    _hover={{
                                                        backgroundColor: '#E18833',
                                                    }}
                                                    _focus={{
                                                        backgroundColor: '#E18833',
                                                    }}
                                                    onClick={() => setCurrentPnlIndex(index)}
                                                    key={index}
                                                    fontFamily={'Nunito'}
                                                    fontSize='15px'
                                                    lineHeight={'20px'}
                                                    textTransform='capitalize'
                                                    alignSelf='center'
                                                    alignItems='center'
                                                    display='flex'
                                                    justifyContent='center'
                                                    width={'100px'}
                                                >
                                                    <Text
                                                        textTransform='capitalize'
                                                    >
                                                        {item.menuLabel}
                                                    </Text>
                                                </MenuItem>
                                            ))
                                        }
                                    </MenuList>
                                </Menu>
                            </Th>
                            <Th
                            >
                                All Time <br />Chart
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody
                        width={'100%'}
                    >
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
                                    flexDirection={'row'}
                                    width='100%'
                                >
                                    <Td
                                        className='first-row'
                                        borderColor='transparent'
                                    >
                                        {item.id}
                                    </Td>
                                    <Td
                                        borderColor='transparent'
                                        className='username'
                                    >
                                        {item.username}
                                    </Td>
                                    <Td
                                        borderColor='transparent'
                                        color={item.dailyRoi > 0 ? '#19A2A5' : '#BD3B32'}
                                        display={currentRoiIndex == 0 ? 'table-cell' : 'none'}
                                    >
                                        {item.dailyRoi}%
                                    </Td>
                                    <Td
                                        borderColor='transparent'
                                        color={item.weeklyRoi > 0 ? '#19A2A5' : '#BD3B32'}
                                        display={currentRoiIndex == 1 ? 'table-cell' : 'none'}
                                    >
                                        {item.weeklyRoi}%
                                    </Td>

                                    <Td
                                        borderColor='transparent'
                                        color={item.monthlyRoi > 0 ? '#19A2A5' : '#BD3B32'}
                                        display={currentRoiIndex == 2 ? 'table-cell' : 'none'}
                                    >
                                        {item.monthlyRoi}%
                                    </Td>

                                    <Td
                                        borderColor='transparent'
                                        color={item.allTimeRoi > 0 ? '#19A2A5' : '#BD3B32'}
                                        display={currentRoiIndex == 3 ? 'table-cell' : 'none'}
                                    >
                                        {item.allTimeRoi}%
                                    </Td>

                                    <Td
                                        borderColor='transparent'
                                        color={item.dailyPnl > 0 ? '#19A2A5' : '#BD3B32'}
                                        display={currentPnlIndex == 0 ? 'table-cell' : 'none'}
                                    >
                                        {item.dailyPnl}
                                    </Td>
                                    <Td
                                        borderColor='transparent'
                                        color={item.weeklyPnl > 0 ? '#19A2A5' : '#BD3B32'}
                                        display={currentPnlIndex == 1 ? 'table-cell' : 'none'}
                                    >
                                        {item.weeklyPnl}
                                    </Td>

                                    <Td
                                        borderColor='transparent'
                                        color={item.monthlyPnl > 0 ? '#19A2A5' : '#BD3B32'}
                                        display={currentPnlIndex == 2 ? 'table-cell' : 'none'}
                                    >
                                        {item.monthlyPnl}
                                    </Td>

                                    <Td
                                        borderColor='transparent'
                                        color={item.allTimePnl > 0 ? '#19A2A5' : '#BD3B32'}
                                        display={currentPnlIndex == 3 ? 'table-cell' : 'none'}
                                    >
                                        {item.allTimePnl}
                                    </Td>

                                    <Td
                                        borderColor='transparent'
                                        className='chart-wrapper'
                                    >
                                        <Line options={chartOptions} data={{
                                            labels: chartLabels,
                                            datasets: [
                                                {
                                                    data: item.allTimeChart,
                                                    borderColor: item.weeklyPnl > 0 ? '#19A2A5' : '#BD3B32',
                                                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                                },
                                            ],
                                        }} />
                                    </Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </Flex>
        </Box >
    )
}

export default LeaderboardTableMobile;