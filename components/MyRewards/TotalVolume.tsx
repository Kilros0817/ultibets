import {
    Flex,
    Text,
} from '@chakra-ui/react';

type TotalVolumeProps = {
    totalBettingAmount: number
}

const TotalVolume = ({
    totalBettingAmount,
}: TotalVolumeProps) => {

    return (
        <Flex
            direction={'column'}
        >
            <Flex
                borderRadius={'15px'}
                fontFamily={'Nunito'}
                fontStyle={'normal'}
                textAlign='center'
                textTransform={'capitalize'}
                fontWeight={'700'}
                px='1px'
                py='1px'
                width={'max-content'}
                background={'linear-gradient(to bottom, #FF720A, #739AF0)'}
            >
                <Flex
                    direction='column'
                    background={'#1F1F1F'}
                    px='29px'
                    py='13px'
                    borderRadius={'15px'}
                    width={'204px'}
                >
                    <Text
                        fontSize={'12px'}
                        lineHeight={'16px'}
                        textAlign={'center'}
                        fontWeight={'700'}
                    >
                        Total volume of predictions on current chain
                    </Text>

                    <Text
                        fontSize={'20px'}
                        lineHeight={'33px'}
                    >
                        {totalBettingAmount} UTBETS
                    </Text>
                </Flex>

            </Flex>
        </Flex >
    )
}

export default TotalVolume;