import {
  Box,
  Flex,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNetwork } from 'wagmi';
import { useChainContext } from '../../utils/Context'
import { chainAttrs, mumbaiChainId, newChainAttrs, polygonChainId } from '../../utils/config';
import TokenSelectModal from '../modal/TokenSelectModal'

const TokenSelector = () => {
  const { chain, } = useNetwork();
  const { isNativeToken, } = useChainContext();
  const [chainAttrsIndex, setChainAttrsIndex] = useState(1);
  const [currentMainnetOrTestnetAttrs,] = useState(
    process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ultibetsLogo = '/images/pngs/token-logo/utbets.svg';

  useEffect(() => {
        let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
      process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;    let currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == chainId);
    if (currentChainAttrsItem.length == 0) {
      const temporaryChainId = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? 137 : 80001
      currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == temporaryChainId);
    };
    setChainAttrsIndex(currentChainAttrsItem[0].index)
  }, [chain, isNativeToken]);

  return (
    <>
      <Flex
        borderRadius='50px'
        justifyContent='center'
        position='relative'
        zIndex='0'
        width={['180px', '280px']}
        className='token-selector-component'
        onClick={onOpen}
      >
        <Flex
          backgroundColor={isNativeToken ? 'rgba(255, 114, 10, 0.23)' : 'transparent'}
          borderRadius='50px 0 0 50px'
          paddingLeft={['15px', '30px']}
          py='10px'
          width={'50%'}
          border={isNativeToken ? '1px solid #FC541C' : '1px solid #E18933'}
          borderRight={isNativeToken ? '1px solid #FC541C' : '1px solid transparent'}
          _hover={{
            border: isNativeToken ? '1px solid #FC541C' : '',
            backgroundColor: 'transparent'
          }}
          _focus={{
            border: isNativeToken ? '1px solid #FC541C' : '',
            backgroundColor: 'transparent'
          }}
          cursor='pointer'
        >
          <Flex
            height={'20px'}
            direction='column'
            mr='5px'
          >
            <Image
              width={'14px'}
              height={'14px'}
              src={currentMainnetOrTestnetAttrs[chainAttrsIndex].logo}
              mt='2.5px'
            />
          </Flex>

          <Box>
            <Text
              textTransform={'uppercase'}
              fontFamily='Nunito'
              fontStyle={'normal'}
              fontWeight={['300', '700']}
              fontSize={['12px', '15px']}
              lineHeight='20px'
            >
              {currentMainnetOrTestnetAttrs[chainAttrsIndex].nativeToken}
            </Text>
            <Text
              textTransform={'capitalize'}
              fontFamily='Inter'
              fontStyle={'normal'}
              fontWeight={['300', '700']}
              fontSize={['6px', '8px']}
              lineHeight='10px'
            >
              ({currentMainnetOrTestnetAttrs[chainAttrsIndex].name})
            </Text>
          </Box>
        </Flex>
        <Flex
          backgroundColor={!isNativeToken ? 'rgba(255, 114, 10, 0.23)' : 'transparent'}
          borderRadius='0 50px  50px 0'
          width={'50%'}
          paddingLeft={['15px', '30px']}
          border={!isNativeToken ? '1px solid #FC541C' : '1px solid #E18933'}
          borderLeft={!isNativeToken ? '1px solid #FC541C' : '1px solid transparent'}
          _hover={{
            border: !isNativeToken ? '1px solid #FC541C' : '',
            backgroundColor: 'transparent'
          }}
          _focus={{
            border: !isNativeToken ? '1px solid #FC541C' : '',
            backgroundColor: 'transparent'
          }}
          cursor='pointer'
          px='10px'
          py='10px'
          alignItems='start'
        >
          <Flex
            height={'20px'}
            direction='column'
            mr='5px'
          >
            <Image
              width={'14px'}
              height={'14px'}
              src={ultibetsLogo}
              mt='2.5px'
            />
          </Flex>

          <Box>
            <Text
              textTransform={'uppercase'}
              fontFamily='Nunito'
              fontStyle={'normal'}
              fontWeight={['300', '700']}
              fontSize={['12px', '15px']}
              lineHeight='20px'
            >
              Utbets
            </Text>
            <Text
              textTransform={'capitalize'}
              fontFamily='Inter'
              fontStyle={'normal'}
              fontWeight={['300', '700']}
              fontSize={['6px', '8px']}
              lineHeight='10px'
            >
              ({currentMainnetOrTestnetAttrs[chainAttrsIndex].name})
            </Text>
          </Box>
        </Flex>
      </Flex>
      <TokenSelectModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}

export default TokenSelector