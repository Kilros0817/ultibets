import {
  Box,
  Flex,
  Text,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  Button,
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { useNetwork } from 'wagmi';
import PredictionsCardList from '../../components/predictions/PredictionsCardList';
import HomeCarousel from '../../components/Container/Carousel'
import Sidebar from '../../components/Sidebar'
import PredictionsTab from '../../components/mypredictions/PredictionsTab'
import { RiArrowDropDownLine } from 'react-icons/ri'
import TokenSelector from '../../components/predictions/TokenSelector'
import { chainAttrs, mumbaiChainId, newChainAttrs, polygonChainId, sortByItems } from '../../utils/config'
import { useChainContext } from '../../utils/Context'
import CalendarLabel from '../../components/predictions/CalendarLabel'

const PredictionMarkets = () => {
  const { isNativeToken, } = useChainContext();
  const { chain, } = useNetwork();
  const [currentMainnetOrTestnetAttrs,] = useState(
    process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
  const [sortByIndex, setSortByIndex] = useState(0);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
        let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
      process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;    let currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == chainId);
    if (currentChainAttrsItem.length == 0) {
      const temporaryChainId = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? 137 : 80001
      currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == temporaryChainId);
    }
  }, [chain, isNativeToken]);

  const SortByDropDownMenu = () => (
    <Flex
      borderRadius={'34px'}
      border='1px solid #FC541C'
      height={'41px'}
      background='transparent'
      className='sort-by-dropdown-wrapper'
    >
      <Menu
      >
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
          display='flex'
        >
          <Flex
            direction={'row'}
            alignItems='center'
            justifyContent='space-between'
            pl='35px'
            pr='25px'
            py='8px'
            height='41px'
            border={'1px solid #FC541C'}
            borderRadius='34px'
          >
            <Text
              fontFamily={'Nunito'}
              fontStyle='normal'
              fontSize={'15px'}
              lineHeight='25px'
              textTransform={'capitalize'}
              flex='none'
              flexGrow={'0'}
              mr='14px'
              color={'white'}
            >
              Sort By
            </Text>
            <Flex
              direction='column'
              justifyContent='center'
              opacity='0.6'
              className='prediction-market-mainpage-sort-by-dropdown'
            >
              <RiArrowDropDownLine />
            </Flex>
          </Flex>
        </MenuButton>
        <MenuList
          backgroundColor={'#1F1F1F'}
          minWidth='min-content'
          width='156px'
          border={'none'}
        >
          {
            sortByItems.map((item, index) => (
              <MenuItem
                backgroundColor={'#1F1F1F'}
                _hover={{
                  backgroundColor: '#E18833',
                }}
                _focus={{
                  backgroundColor: '#E18833',
                }}
                onClick={() => setSortByIndex(index)}
                key={index}
                fontFamily='Nunito'
                fontStyle='normal'
                fontWeight='700'
                fontSize='16px'
                lineHeight='21px'
                paddingLeft='15px'
              >
                <Text
                  textTransform='capitalize'
                  color={'rgba(255, 255, 255, 0.6)'}
                >
                  {item}
                </Text>
              </MenuItem>
            ))
          }
        </MenuList>
      </Menu>

    </Flex>
  );

  return (
    <>
      <Box
      >
        <HomeCarousel />
        <Flex
          className='prediction-markets-bottom-component'
        >
          <Flex
            width={['70px', '90px']}
            justifyContent='center'
            marginTop={['230px !important', '0px !important']}
          >
            <Sidebar />
          </Flex>
          <Flex
            width='calc(100% - 90px)'
            direction={'column'}
            mt='30px'
            className='prediction-markets-bottom-right-component'
            zIndex={0}
          >
            <Flex
              mx={[
                '0',
                '0',
                width < 900 ? 0 : 'calc(calc(100% - 333px * 2 - 40px * 1) / 2)',
                'calc(calc(100% - 333px * 2 - 40px * 1) / 2)',
                width < 1860 ? 'calc(calc(100% - 333px * 3 - 40px * 2) / 2)' :
                  'calc(calc(100% - 333px * 4 - 75px * 3) / 2)'
              ]}
              justifyContent={['center', 'center', 'center', width < 900 ? 'center' : 'start']}
            >
              <PredictionsTab
                width={[
                  'calc(333px * 1 - 80px)',
                  'calc(333px * 1)',
                  width < 900 ? 'calc(333px * 1)' : 'calc(333px * 2 + 40px * 1)',
                  'calc(333px * 2 + 40px * 1)',
                  width < 1860 ? 'calc(333px * 3 + 40px * 2)' : 'calc(333px * 4 + 75px * 3)'
                ]}
              />
            </Flex>

            <>{/* destkop */}
              <Flex
                mt='22px'
                mx={[
                  '0',
                  '0',
                  width < 900 ? 0 : 'calc(calc(100% - 333px * 2 - 40px * 1) / 2)',
                  'calc(calc(100% - 333px * 2 - 40px * 1) / 2)',
                  width < 1860 ? 'calc(calc(100% - 333px * 3 - 40px * 2) / 2)' :
                    'calc(calc(100% - 333px * 4 - 75px * 3) / 2)'
                ]}
                mb='25px'
                display={['none', 'none', 'none', 'flex', 'flex']}
              >
                {
                  width >= 992 && <CalendarLabel
                  />
                }
              </Flex>

              <Flex
                mt='22px'
                mx={[
                  '0',
                  '0',
                  '0',
                  '0',
                  width < 1860 ? 'calc(calc(100% - 333px * 3 - 40px * 2) / 2)' :
                    'calc(calc(100% - 333px * 4 - 75px * 3) / 2)'
                ]}
                mb='25px'
                justifyContent={'space-between'}
                alignItems='center'
                display={['none', 'none', 'none', 'none', 'flex']}
              >
                <TokenSelector />
                <SortByDropDownMenu />
              </Flex>
            </>

            <> {/* mobile, tablet */}
              <Flex
                display={['flex', 'flex', 'flex', 'flex', 'none']}
                ml={['-90px', '0px', '0px', '0px']}
                justifyContent={'center'}
                mt={'19px'}
              >
                {
                  width < 992 && <CalendarLabel
                  />
                }
              </Flex>

              <Flex
                display={['flex', 'flex', 'flex', 'flex', 'none']}
                ml={['-90px', '0px', '0px', '0px']}
                justifyContent={'center'}
                mb='29px'
                mt='25px'
              >
                <SortByDropDownMenu />
              </Flex>

              <Flex
                display={['flex', 'flex', 'flex', 'flex', 'none']}
                ml={['-90px', '0px', '0px', '0px']}
                justifyContent={'center'}
              >
                <TokenSelector />
              </Flex>
            </>
            <Flex
              justify={'center'}
            >
              <PredictionsCardList
                sortByIndex={sortByIndex}
              />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default PredictionMarkets;