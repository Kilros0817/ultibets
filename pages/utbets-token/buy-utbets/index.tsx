import {
	Box,
	Flex,
	Image,
	Switch,
	Text,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Button,
	useDisclosure,
	Input,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react'
import UtBetsTokenRoutes from "../tokenRoutes";
import {
	mumbaiChainId,
	newChainAttrs,
	polygonChainId,
	uniswapURL,
	utbetsTokenAddresses,
} from '../../../utils/config';
import { useAccount, useBalance, useNetwork } from 'wagmi';
import {
	useGetAmountsOut,
	useSwapExactETHForTokens,
	useSwapExactTokensForETH,
	useSwapExactTokensForTokens,
	useApprove,
} from '../../../utils/interact/sc/utbets';
import { checkIconInGreenBg } from '../../../utils/assets';
import AnnounceModal from '../../../components/modal/AnnounceModal';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { checkIfWalletConnected } from '../../../utils/interact/utility';

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
