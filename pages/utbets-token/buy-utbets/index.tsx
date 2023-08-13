import {
	Flex,
} from '@chakra-ui/react';
import React from 'react'
import UtBetsTokenRoutes from "../tokenRoutes";
import {
	uniswapURL,
} from '../../../utils/config';

const BuyUtbets = () => {
	return (
		<Flex
			direction='column'
		>
			<UtBetsTokenRoutes />
			<Flex mt={'80px'}
				mb='40px'
				justifyContent={'center'}
				alignItems={'center'}>
				<a href={uniswapURL}
					target="_new">Buy UTBETS</a>
				</Flex>

		</Flex>
	)
}

export default BuyUtbets
