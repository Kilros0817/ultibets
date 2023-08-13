import {
    Flex,
} from '@chakra-ui/react';
import React from 'react'
import UtBetsTokenRoutes from "../tokenRoutes";
import {bridgeURL} from '../../../utils/config';

const BridgeUtbets = () => {
    return (
        <>
            <Flex direction={'column'}>
                <UtBetsTokenRoutes/>
                <Flex mt={'80px'}
                    mb='40px'
                    justifyContent={'center'}
                    alignItems={'center'}>
                    <a href={bridgeURL}
                        target="_new">Bridge</a>
                </Flex>
            </Flex>
        </>
    )
}

export default BridgeUtbets
