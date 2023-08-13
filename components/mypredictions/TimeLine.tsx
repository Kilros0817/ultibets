import {
    Flex,
    Image,
    Text,
    Box,
    useDisclosure,
} from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
import CalendarModal from '../modal/CalendarModal';
import { useChainContext } from '../../utils/Context';

type TimeLineProps = {
};

const TimeLine = ({
}: TimeLineProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const calendarImage = "/images/svgs/calendar.svg";
    const { myPredictionDataSelectedDate, setMyPredictionDataSelectedDate } = useChainContext();

    useEffect(() => {
        console.log("selected date: ", myPredictionDataSelectedDate);
    }, [myPredictionDataSelectedDate])

    const scroll = useRef<any>()
    const [scrollX, setScrollX] = useState<number>(0) // For detecting start scroll postion
    const [scrollEnd, setScrollEnd] = useState<boolean>(false) // For detecting end of scrolling

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

    return (
        <Box
            mr={['unset', '30px']}
        >
            <Flex
                display='flex'
                position='relative'
                width={'100%'}
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
                            top='-37px'
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
                            top='-37px'
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
                overflowX='scroll'
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
                <Flex
                    fontFamily={'Nunito'}
                    fontWeight={'700'}
                    fontSize={'17px'}
                    lineHeight={'23px'}
                    color={'#FFFFFF'}
                    textTransform={'capitalize'}
                    cursor={'pointer'}
                    width='max-content'
                >
                    <Image
                        mr='9px'
                        src={calendarImage}
                    />
                    <Text
                        fontFamily={'Nunito'}
                        fontWeight={'700'}
                        fontSize={'17px'}
                        lineHeight={'23px'}
                        color={'white'}
                        textTransform={'capitalize'}
                        cursor={'pointer'}
                        onClick={onOpen}
                    >
                        Choose Period of time{' '}
                    </Text>
                </Flex>
                <CalendarModal
                    isOpen={isOpen}
                    onClose={onClose}
                    selectedDate={myPredictionDataSelectedDate}
                    setSelectedDate={setMyPredictionDataSelectedDate}
                />
            </Flex>
        </Box>
    )
}

export default TimeLine;