import {
	Flex,
	Text,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Button
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { bridgeURL, mumbaiChainId, uniswapAddLP, uniswapURL, utbetsTokenAddresses } from '../../utils/config';
import { Link } from '@chakra-ui/react'
import { useNetwork } from 'wagmi';

const UtBetsTokenRoutes = () => {
	const router = useRouter()
	const currentRoute = router.pathname

    const {chain} = useNetwork();
    const [token, setToken] = useState('');

	const subTabs = [
		{
			index: 0,
			subTabName: 'token informaton',
			subTabUrl: '/utbets-token/token-information',
			external: false
		},
		{
			index: 1,
			subTabName: 'buy $UTBETS',
			subTabUrl: uniswapURL,
			external: true
		},
		{
			index: 2,
			subTabName: '$UTBETS LP Pairs',
			subTabUrl: `${uniswapAddLP}${token}`,
			external: true
		},
		{
			index: 3,
			subTabName: 'Bridge $UTBETS',
			subTabUrl: bridgeURL,
			external: true
		},
		{
			index: 4,
			subTabName: '$UTBETS Airdrop',
			subTabUrl: '/utbets-token/utbets-airdrop',
			external: false
		},
	];

    useEffect(() => {
        if (chain?. id != undefined) {
            setToken(utbetsTokenAddresses[chain.id] ? utbetsTokenAddresses[chain.id] : utbetsTokenAddresses[mumbaiChainId]);
        }
    }, [chain]);

	const checkSubTabIndex = (subTab: any) => {
		return subTab.subTabUrl == currentRoute;
	}

	const subTab = subTabs.filter(checkSubTabIndex);
	const [currentSubTabIndex, setCurrentSubTabIndex] = useState(subTab[0]?.index);

    const updateSubTabIndex = (isExternal: any, index: any) => {
        if (!isExternal) setCurrentSubTabIndex(index);
    }

	return (
		<Flex
			justifyContent={'center'}
			alignItems={'center'}
		>
			{/* 0 ~ 42em */}
			<Flex
				display={['flex', 'flex', 'flex', 'none']}
				alignItems='center'
				position='absolute'
				top='80px !important'
				zIndex={'4'}
			>
				<Menu>
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
					>
						<Flex
							direction='row'
							alignSelf='center'
							alignItems='center'
						>
							<Text
								textTransform='capitalize'
								fontSize={['20px', '25px','25px']}
							>
								{subTabs[currentSubTabIndex]?.subTabName}
							</Text>
						</Flex>
					</MenuButton>
					<MenuList
						backgroundColor={'black'}
						minWidth='min-content'
					>
						{
							subTabs.map((item, index) => (
								<MenuItem
									_hover={{
										backgroundColor: '#E18833;',
									}}
									_focus={{
										backgroundColor: '#E18833;',
									}}
									onClick={() => updateSubTabIndex(item.external, index)}
									key={index}
								>
									{item.external && (
										<a href={item.subTabUrl}
										target="_new">{item.subTabName}</a>
									)}
									{!item.external && (
										<Text
										textTransform='capitalize'
										cursor={'pointer'}
										onClick={() => router.push(item.subTabUrl)}
										>
											{item.subTabName}
										</Text>
									)}

								</MenuItem>
							))
						}
					</MenuList>
				</Menu>
			</Flex>

			{/* 42em ~ */}
			<Flex
				gap={['unset', 'unset', '5px', '18px']}
				py='10'
				display={['none', 'none', 'none', 'flex']}
			>
				<Text
                    _hover={{
                        color: '#E18833',
                    }}
					fontFamily={'Nunito'}
					fontWeight={'700'}
					fontSize={['14px', '15px', '17px', '17px']}
					lineHeight={['15px', '17px', '19px', '19px']}
					color={currentRoute === '/utbets-token/token-information' ? '#E18833' : '#FFFFFF'}
					textTransform={'capitalize'}
					cursor={'pointer'}
					onClick={() => router.push('/utbets-token/token-information')}
				>
					token informaton{' '}
				</Text>
				<Text
					fontFamily={'Nunito'}
					fontWeight={'700'}
					fontSize={['14px', '15px', '17px', '17px']}
					lineHeight={['15px', '17px', '19px', '19px']}
					color={'white'}
					textTransform={'capitalize'}
				>
					|
				</Text>
				<Text
                    _focus={{
                        border: 'none',
                        color: '#E18833',
                    }}
                    _hover={{
                        color: '#E18833',
                    }}
					fontWeight={'700'}
					fontFamily={'Nunito'}
					fontSize={['14px', '15px', '17px', '17px']}
					lineHeight={['15px', '17px', '19px', '19px']}
					cursor={'pointer'}
					textTransform={'capitalize'}
				>
					<a 
						href={uniswapURL}
						target="_new"
					>
					buy $UTBETS{' '}
					</a>
				</Text>
				<Text
					fontFamily={'Nunito'}
					fontWeight={'700'}
					fontSize={['14px', '15px', '17px', '17px']}
					lineHeight={['15px', '17px', '19px', '19px']}
					color={'white'}
					textTransform={'capitalize'}
				>
					|
				</Text>
                <Text
                    _focus={{
                        border: 'none',
                        color: '#E18833',
                    }}
                    _hover={{
                        color: '#E18833',
                    }}
					fontWeight={'700'}
					fontFamily={'Nunito'}
					fontSize={['14px', '15px', '17px', '17px']}
					lineHeight={['15px', '17px', '19px', '19px']}
					cursor={'pointer'}
					textTransform={'capitalize'}
				>
					<a 
						href={`${uniswapAddLP}${token}`}
						target="_new"
					>
					    $UTBETS LP Pairs{' '}
					</a>
				</Text>
				<Text
					fontFamily={'Nunito'}
					fontWeight={'700'}
					fontSize={['14px', '15px', '17px', '17px']}
					lineHeight={['15px', '17px', '19px', '19px']}
					color={'white'}
					textTransform={'capitalize'}
				>
					|
				</Text>
                <Text
                    _focus={{
                        border: 'none',
                        color: '#E18833',
                    }}
                    _hover={{
                        color: '#E18833',
                    }}
					fontWeight={'700'}
					fontFamily={'Nunito'}
					fontSize={['14px', '15px', '17px', '17px']}
					lineHeight={['15px', '17px', '19px', '19px']}
					cursor={'pointer'}
					textTransform={'capitalize'}
				>
					<a 
						href={bridgeURL}
						target="_new"
					>
					    Bridge $UTBETS{' '}
					</a>
				</Text>
				<Text
					fontFamily={'Nunito'}
					fontWeight={'700'}
					fontSize={['14px', '15px', '17px', '17px']}
					lineHeight={['15px', '17px', '19px', '19px']}
					color={'white'}
					textTransform={'capitalize'}
				>
					|
				</Text>
				<Text
                    _hover={{
                        color: '#E18833',
                    }}
					fontFamily={'Nunito'}
					fontWeight={'700'}
					fontSize={['14px', '15px', '17px', '17px']}
					lineHeight={['15px', '17px', '19px', '19px']}
					color={
						currentRoute === '/utbets-token/utbets-airdrop'
							? '#E18833'
							: '#FFFFFF'
					}
					textTransform={'capitalize'}
					cursor={'pointer'}
					onClick={() => router.push('/utbets-token/utbets-airdrop')}
				>
					$UTBETS Airdrop{' '}
				</Text>
			</Flex>
		</Flex>
	);
}

export default UtBetsTokenRoutes;
