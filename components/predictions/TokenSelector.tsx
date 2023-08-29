import {
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Box,
  ModalFooter,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { useNetwork, useSwitchNetwork, } from 'wagmi';
import { useChainContext } from '../../utils/Context';
import { chainAttrs, mumbaiChainId, newChainAttrs, polygonChainId } from '../../utils/config'
import { useRouter } from 'next/router';

export type TokenSelectModalProps = {
  isOpen: boolean,
  onClose: () => void,
}

const TokenSelectModal = ({
  isOpen,
  onClose,
}: TokenSelectModalProps) => {
  const router = useRouter();

  const ultibetsLogo = '/images/pngs/token-logo/utbets.svg';
  const {
    isNativeToken,
    setIsNativeToken
  } = useChainContext();
  const { chain, } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const [chainAttrsIndex, setChainAttrsIndex] = useState(1);
  const [onlyUTBETS, setOnlyUtbets] = useState(false);
  const [currentMainnetOrTestnetAttrs,] = useState(
    process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);

  useEffect(() => {
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
      process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId; let currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == chainId);
    if (currentChainAttrsItem.length == 0) {
      const temporaryChainId = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? 137 : 80001
      currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == temporaryChainId);
    }
    setChainAttrsIndex(currentChainAttrsItem[0].index);
  }, [chain, isNativeToken])


  useEffect(() => {
    const pStr = router.asPath;
    if (pStr.includes("leaderboard") || pStr.includes("my-rewards") || pStr.includes("my-referrals")) {
      setOnlyUtbets(true);
    }
  }, [router])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {' '}
      <ModalOverlay
        bg='blackAlpha.10'
        backdropFilter='blur(10px) hue-rotate(10deg)'
      />
      <ModalContent
        border={'1px solid white'}
      >
        <ModalHeader>Select Token</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            textAlign={'center'}
            direction={'column'}
            alignItems={'center'}
          >
            {
              currentMainnetOrTestnetAttrs.map((item, index) => (
                <Flex
                  borderRadius='50px'
                  justifyContent='center'
                  position='relative'
                  zIndex='1'
                  width={'280px'}
                  key={index}
                  my='10px'
                >
                  {!onlyUTBETS && (
                    <Flex
                      borderRadius='50px 0 0 50px'
                      px='34px'
                      py='11px'
                      width={'50%'}
                      border={index == chainAttrsIndex && isNativeToken ? '1px solid #FC541C' : '1px solid #E18933'}
                      borderRight={index == chainAttrsIndex && isNativeToken ? '1px solid #FC541C' :
                        index == chainAttrsIndex ? '1px solid transparent' : '1px solid #E18933'}
                      backgroundColor={index == chainAttrsIndex && isNativeToken ? 'rgba(255, 114, 10, 0.23)' : 'transparent'}
                      _hover={{
                        border: index == chainAttrsIndex && isNativeToken ? '1px solid #FC541C' : '',
                        backgroundColor: index == chainAttrsIndex && isNativeToken ? 'rgba(255, 114, 10, 0.23)' : 'transparent'
                      }}
                      _focus={{
                        border: index == chainAttrsIndex && isNativeToken ? '1px solid #FC541C' : '',
                        backgroundColor: index == chainAttrsIndex && isNativeToken ? 'rgba(255, 114, 10, 0.23)' : 'transparent'
                      }}
                      onClick={() => {
                        setIsNativeToken(true);
                        console.log("switch chain id: ", currentMainnetOrTestnetAttrs[index].chainId);
                        switchNetwork?.(currentMainnetOrTestnetAttrs[index].chainId)
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
                          src={item.logo}
                          mt='2.5px'
                        />
                      </Flex>

                      <Box>
                        <Text
                          textTransform={'uppercase'}
                          fontFamily='Nunito'
                          fontStyle={'normal'}
                          fontWeight='700'
                          fontSize={'15px'}
                          lineHeight='20px'
                        >
                          {item.nativeToken}
                        </Text>
                        <Text
                          textTransform={'capitalize'}
                          fontFamily='Inter'
                          fontStyle={'normal'}
                          fontWeight='700'
                          fontSize={'8px'}
                          lineHeight='10px'
                        >
                          ({item.name})
                        </Text>
                      </Box>
                    </Flex>
                  )}

                  <Flex
                    backgroundColor={index == chainAttrsIndex && !isNativeToken ? 'rgba(255, 114, 10, 0.23)' : 'transparent'}
                    borderRadius= { onlyUTBETS ? '50px' : '0 50px  50px 0'} 
                    width={ onlyUTBETS ? '80%' : '50%'}
                    border={index == chainAttrsIndex && !isNativeToken ? '1px solid #FC541C' : '1px solid #E18933'}
                    borderLeft={onlyUTBETS ? '1px solid #E18933' : index == chainAttrsIndex && !isNativeToken ? '1px solid #FC541C' : '1px solid transparent'}
                    _hover={{
                      border: index == chainAttrsIndex && !isNativeToken ? '1px solid #FC541C' : '',
                      backgroundColor: index == chainAttrsIndex && !isNativeToken ? 'rgba(255, 114, 10, 0.23)' : 'transparent'
                    }}
                    _focus={{
                      border: index == chainAttrsIndex && !isNativeToken ? '1px solid #FC541C' : '',
                      backgroundColor: index == chainAttrsIndex && !isNativeToken ? 'rgba(255, 114, 10, 0.23)' : 'transparent'
                    }}
                    onClick={() => {
                      setIsNativeToken(false);
                      switchNetwork?.(currentMainnetOrTestnetAttrs[index].chainId)
                    }}
                    cursor='pointer'
                    px='30px'
                    py='11px'
                    alignItems='start'
                  >
                    <Flex margin={onlyUTBETS ? 'auto' : ''}>
                    <Flex
                      height={'20px'}
                      direction='column'
                      mr='5px'
                    >
                      <Image
                        width={'14px'}
                        height={'14px'}
                        src={onlyUTBETS ? item.logo : ultibetsLogo}
                        mt='2.5px'
                      />
                    </Flex>

                    <Box>
                      <Text
                        textTransform={'uppercase'}
                        fontFamily='Nunito'
                        fontStyle={'normal'}
                        fontWeight='700'
                        fontSize={'15px'}
                        lineHeight='20px'
                      >
                        Utbets
                      </Text>
                      <Text
                        textTransform={'capitalize'}
                        fontFamily='Inter'
                        fontStyle={'normal'}
                        fontWeight='700'
                        fontSize={'8px'}
                        lineHeight='10px'
                      >
                        ({item.name})
                      </Text>
                    </Box>
                    </Flex>
                    
                  </Flex>
                </Flex>
              ))
            }
          </Flex>
        </ModalBody>
        <ModalFooter
          justifyContent={'center'}
        >
          <Text
            lineHeight={'20px'}
            fontFamily={'Nunito'}
            fontWeight={'700'}
            width='150px'
            px='25px'
            py='11px'
            background={'unset'}
            borderRadius={'34px'}
            border={'1px solid #FC541C'}
            _hover={{
              background: '#FC541C',
            }}
            fontSize={'15px'}
            textAlign='center'
            alignItems={'center'}
            display='flex'
            justifyContent='center'
            onClick={onClose}
            cursor='pointer'
          >
            Close
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default TokenSelectModal
