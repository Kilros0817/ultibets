import {
    Flex,
    Image,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import CalendarModal from '../modal/CalendarModal';
import { useChainContext } from '../../utils/Context'

type CalendarLabelProps = {

};

const CalendarLabel = ({
}: CalendarLabelProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { predictionMarketSelectedDate, setPredictionMarketSelectedDate } = useChainContext();
    const calendarImage = "/images/svgs/calendar.svg";

    return (
        <>
            <Flex
                onClick={onOpen}
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
                >
                    Choose Period of time{' '}
                </Text>
            </Flex>
            <CalendarModal
                isOpen={isOpen}
                onClose={onClose}
                selectedDate={predictionMarketSelectedDate}
                setSelectedDate={setPredictionMarketSelectedDate}
            />
        </>
    )

}

export default CalendarLabel;