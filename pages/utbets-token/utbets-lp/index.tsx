import {Flex} from '@chakra-ui/react'
import {useEffect, useState} from 'react';
import {useNetwork} from 'wagmi';
import UtBetsTokenRoutes from "../tokenRoutes";

import {ethers} from 'ethers';
import {mumbaiChainId, uniswapAddLP, utbetsTokenAddresses} from '../../../utils/config';

const StakeUtbets = () => {
    const {chain} = useNetwork();
    const [token, setToken] = useState('');

    useEffect(() => {
        if (chain?. id != undefined) {
            setToken(utbetsTokenAddresses[chain.id] ? utbetsTokenAddresses[chain.id] : utbetsTokenAddresses[mumbaiChainId]);
        }
    }, [chain]);

    return (
        <>
            <Flex direction={'column'}
                px='10'>
                <UtBetsTokenRoutes/>
                <Flex mt={'80px'}
                    mb='40px'
                    justifyContent={'center'}
                    alignItems={'center'}>
                    <a href={
                            `${uniswapAddLP}${token}`
                        }
                        target="_new">Add Liquidity
                    </a>
                </Flex>

            </Flex>
        </>
    )
}

export default StakeUtbets
