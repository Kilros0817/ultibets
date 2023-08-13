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
import { useState } from 'react';

const UtBetsTokenRoutes = () => {
    const router = useRouter()
    const currentRoute = router.pathname

    const subTabs = [
        {
            index: 0,
            subTabName: 'token informaton',
            subTabUrl: '/utbets-token/token-information',
        },
        {
            index: 1,
            subTabName: 'buy $UTBETS',
            subTabUrl: '/utbets-token/buy-utbets',
        },
        {
            index: 2,
            subTabName: '$UTBETS Pairs LP',
            subTabUrl: '/utbets-token/utbets-lp',
        },
        {
            index: 3,
            subTabName: 'Bridge $UTBETS',
            subTabUrl: '/utbets-token/bridge-utbets',
        },
        {
            index: 4,
            subTabName: '$UTBETS Airdrop',
            subTabUrl: '/utbets-token/utbets-airdrop',
        },
    ];

    const checkSubTabIndex = (subTab: any) => {
        return subTab.subTabUrl == currentRoute;
    }

    const subTab = subTabs.filter(checkSubTabIndex);
    const [currentSubTabIndex, setCurrentSubTabIndex] = useState(subTab[0]?.index);

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
                                    onClick={() => setCurrentSubTabIndex(index)}
                                    key={index}
                                >
                                    <Text
                                        textTransform='capitalize'
                                        cursor={'pointer'}
                                        onClick={() => router.push(item.subTabUrl)}
                                    >
                                        {item.subTabName}
                                    </Text>
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
                    fontFamily={'Nunito'}
                    fontWeight={'700'}
                    fontSize={['14px', '15px', '17px', '17px']}
                    lineHeight={['15px', '17px', '19px', '19px']}
                    color={
                        currentRoute === '/utbets-token/buy-utbets'
                            ? '#E18833'
                            : '#FFFFFF'
                    }
                    textTransform={'capitalize'}
                    cursor={'pointer'}
                    onClick={() => router.push('/utbets-token/buy-utbets')}
                >
                    buy $UTBETS{' '}
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
                    fontFamily={'Nunito'}
                    fontWeight={'700'}
                    fontSize={['14px', '15px', '17px', '17px']}
                    lineHeight={['15px', '17px', '19px', '19px']}
                    color={
                        currentRoute === '/utbets-token/utbets-lp'
                            ? '#E18833'
                            : '#FFFFFF'
                    }
                    textTransform={'capitalize'}
                    cursor={'pointer'}
                    onClick={() => router.push('/utbets-token/utbets-lp')}
                >
                    $UTBETS Pairs LP{' '}
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
                    fontFamily={'Nunito'}
                    fontWeight={'700'}
                    fontSize={['14px', '15px', '17px', '17px']}
                    lineHeight={['15px', '17px', '19px', '19px']}
                    color={
                        currentRoute === '/utbets-token/bridge-utbets'
                            ? '#E18833'
                            : '#FFFFFF'
                    }
                    textTransform={'capitalize'}
                    cursor={'pointer'}
                    onClick={() => router.push('/utbets-token/bridge-utbets')}
                >
                    Bridge $UTBETS{' '}
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