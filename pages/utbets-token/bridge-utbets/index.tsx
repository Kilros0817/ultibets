import {
  Box,
  Flex,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import React, { useState, useEffect } from 'react'
import { useNetwork, useSwitchNetwork, } from 'wagmi';
import UtBetsTokenRoutes from "../tokenRoutes";
import { chainAttrs, mumbaiChainId, polygonChainId } from '../../../utils/config';

const BridgeUtbets = () => {
  const { chain, } = useNetwork();
  const { switchNetwork, } = useSwitchNetwork();
  const [currentMainnetOrTestnetAttrs,] = useState(
    process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
  const [bridgeFromChain, setBridgeFromChain] = useState(1);
  const [bridgeToChain, setBridgeToChain] = useState(2);
  const sizes = ['20px', '25px'];

  useEffect(() => {
     const chainId = chain?.id != undefined ? chain.id :
            process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;
    let currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == chainId);
    if (currentChainAttrsItem.length == 0) {
      const temporaryChainId = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? 137 : 80001
      currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == temporaryChainId);
    }
    setBridgeFromChain(currentChainAttrsItem[0].index);
  }, [chain]);

  const bridgeToken = () => {
    console.log("bridge button clicked");
  }

  return (
    <>
      <Flex
        direction={'column'}
      >
        <UtBetsTokenRoutes />
        <Flex
          mt={'80px'}
          mb='40px'
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Flex
              width={['300px', '350px', '550px', '650px']}
              borderRadius={'5px'}
              direction='column'
              border={'1px solid #FFFFFF'}
              cursor={'pointer'}
              position='relative'
            >

              {/* bridge from */}
              <Flex
                direction={'column'}
                cursor={'pointer'}
                borderBottom='1px solid white'
                px={['15px', '20px', '40px', '40px']}
                pt='9'
                pb='5'
              >
                <Flex
                  width='100%'
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  direction={'row'}
                  cursor={'pointer'}
                  fontSize={sizes}
                >
                  <Text>
                    0.0
                  </Text>
                  <Menu>
                    <MenuButton
                      as={Button}
                      px='0'
                      rightIcon={<ChevronDownIcon />}
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
                      fontSize='25'
                    >
                      <Flex
                        direction='row'
                        alignSelf='center'
                        alignItems='center'
                      >
                        <Image
                          width={sizes}
                          height={sizes}
                          src={currentMainnetOrTestnetAttrs[bridgeFromChain].logo}
                          alt={currentMainnetOrTestnetAttrs[bridgeFromChain].alt}
                          mr='3'
                        />
                        <Text
                          fontSize={sizes}
                        >
                          {
                            currentMainnetOrTestnetAttrs[bridgeFromChain].mainnetName
                          }
                        </Text>
                      </Flex>
                    </MenuButton>
                    <MenuList
                      backgroundColor={'black'}
                    >
                      {
                        currentMainnetOrTestnetAttrs.map((item, key) => (
                          <MenuItem
                            _hover={{
                              backgroundColor: 'green',
                            }}
                            _focus={{
                              backgroundColor: 'green',
                            }}
                            onClick={() => {
                              setBridgeFromChain(key);
                              switchNetwork?.(currentMainnetOrTestnetAttrs[key].chainId)
                            }}
                          >
                            <Image
                              width={'25px'}
                              height={'25px'}
                              src={item.logo}
                              alt={item.alt}
                              mr='3'
                            />
                            {item.mainnetName}
                          </MenuItem>
                        ))
                      }
                    </MenuList>
                  </Menu>
                </Flex>
                <Flex
                  textAlign='left'
                  justifyContent={'left'}
                  fontSize='12'
                >
                  Balance: 1149 UTBETS
                </Flex>
              </Flex>

              {/*bridge to */}
              <Flex
                direction={'column'}
                cursor={'pointer'}
                pt='9'
                pb='5'
                px={['15px', '20px', '40px', '40px']}
              >
                <Flex
                  width='100%'
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  direction={'row'}
                  cursor={'pointer'}
                  fontSize={sizes}
                >
                  <Text>
                    0.0
                  </Text>
                  <Menu>
                    <MenuButton
                      as={Button}
                      px='0'
                      rightIcon={<ChevronDownIcon />}
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
                      fontSize={sizes}
                    >
                      <Flex
                        direction='row'
                        alignSelf='center'
                        alignItems='center'
                      >
                        <Image
                          width={sizes}
                          height={sizes}
                          src={currentMainnetOrTestnetAttrs[bridgeToChain].logo}
                          alt={currentMainnetOrTestnetAttrs[bridgeToChain].alt}
                          mr='3'
                        />
                        {
                          currentMainnetOrTestnetAttrs[bridgeToChain].mainnetName
                        }
                      </Flex>
                    </MenuButton>
                    <MenuList
                      backgroundColor={'black'}
                    >
                      {
                        currentMainnetOrTestnetAttrs.map((item, key) => (
                          <MenuItem
                            _hover={{
                              backgroundColor: 'green',
                            }}
                            _focus={{
                              backgroundColor: 'green',
                            }}
                            onClick={() => setBridgeToChain(key)}
                          >
                            <Image
                              width={'25px'}
                              height={'25px'}
                              src={item.logo}
                              alt={item.alt}
                              mr='3'
                            />
                            {item.mainnetName}
                          </MenuItem>
                        ))
                      }
                    </MenuList>
                  </Menu>
                </Flex>
                <Flex
                  textAlign='left'
                  justifyContent={'left'}
                  fontSize='12'
                >
                  Balance: -
                </Flex>
              </Flex>
              <Flex
                position='absolute'
                borderRadius='50%'
                width='75px'
                height='75px'
                top='75px'
                left={['38%', '40%', '45%']}
                backgroundColor={'#1F1F1F'}
                border='1px solid white'
                textAlign='center'
                justify='center'
                alignItems='center'
                onClick={() => {
                  setBridgeFromChain(bridgeToChain);
                  setBridgeToChain(bridgeFromChain);
                }}
              >
                <Image
                  width={'30px'}
                  height={'30px'}
                  src="/images/pngs/replace.svg"
                  alt='replace'
                />
              </Flex>
            </Flex>
          </Box>
        </Flex>
        <Flex
          mb='60px'
          justifyContent={'center'}
        >
          <Button
            border='1px solid #FC541C'
            px='41px'
            py='10px'
            borderRadius='34px'
            background='transparent'
            _hover={{
              backgroundColor: '#FC541C',
            }}
            _active={{
              backgroundColor: '#FC541C',
            }}
            onClick={() => bridgeToken()}
          >
            Bridge
          </Button>
        </Flex>

        <Image
          src='/images/pngs/left-white-gradient-1.svg'
          alt='left-white-gradient'
          position='absolute'
          bottom='0'
          left='0'
          zIndex='1'
        />
        <Image
          src='/images/pngs/right-white-gradient-1.svg'
          alt='right-white-gradient'
          position='absolute'
          top='10%'
          right='0'
          zIndex='1'
        />
      </Flex>
    </>
  )
}

export default BridgeUtbets
