import {
    Flex,
} from '@chakra-ui/react';
import {
    tiers,
} from '../../utils/config';

const TierDescription = () => {

    return (
        <Flex
            className='tier-description-component'
            direction={'column'}
            fontSize={'12px'}
            fontWeight={'500'}
            lineHeight={'172.9% '}
        >
            {
                tiers.map((item, index) => (
                    <Flex
                        key={index}
                        textTransform={'capitalize'}
                    >
                        Tier {item.level}: {item.cashback}% Cashback in utbets token once reaching 
                        {` ${item.limit}`} UTBETS Tokens in Total Prediction volume ({item.reward} UTBETS)
                    </Flex>
                ))
            }

        </Flex >
    )
}

export default TierDescription;