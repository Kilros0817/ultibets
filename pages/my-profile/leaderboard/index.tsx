import {
  Box,
  Flex,
  Image,
  Text,
  useDisclosure,
  Input,
} from '@chakra-ui/react'
import {
  useEffect,
  useState,
} from 'react'
import {
  useNetwork,
} from 'wagmi';
import PredictionsTab from '../../../components/mypredictions/PredictionsTab'
import Sidebar from '../../../components/Sidebar'
import { useChainContext } from '../../../utils/Context';
import { chainAttrs, mumbaiChainId, newChainAttrs, polygonChainId } from '../../../utils/config';
import { HiOutlineSearch } from 'react-icons/hi'
import LeaderboardTable from '../../../components/Leaderboard/LeaderboardTable'
import TokenSelector from '../../../components/predictions/TokenSelector'
import RegisterInLeaderboardModal from '../../../components/modal/RegisterInLeaderboardModal';
import Head from 'next/head';

const Leaderboard = () => {
  const starImage = "/images/pngs/prediction-markets/star.svg";
  const { isNativeToken, } = useChainContext();
  const { chain, } = useNetwork();
  const [currentMainnetOrTestnetAttrs,] = useState(
    process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
  const [name, setName] = useState<string>('');
  const {
    isOpen: isOpenRegisterInLeaderboardModal,
    onOpen: onOpenRegisterInLeaderboardModal,
    onClose: onCloseRegisterInLeaderboardModal,
  } = useDisclosure();
  useEffect(() => {
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
      process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId; let currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == chainId);
    if (currentChainAttrsItem.length == 0) {
      const temporaryChainId = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? 137 : 80001
      currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == temporaryChainId);
    }
  }, [chain, isNativeToken])

  useEffect(() => {
    if (name.length == 0) {

    }
  }, [name])

  return (
    <>
      <Flex
        className='leaderboard-page-wrapper'
        width={'100%'}
      >
        <Flex
          width='90px'
          justifyContent='center'
          display={['none', 'none', 'flex']}
        >
          <Sidebar />
        </Flex>

        <Box
          my='30px'
          px='30px'
          width={['100%', '100%', 'calc(100% - 90px)', 'calc(100% - 90px)', 'calc(100% - 90px)']}
          mr={['unset', 'unset', 'unset', 'unset']}
          className='my-leaderboard-wrapper'
          zIndex={0}
        >

          <PredictionsTab />

          <Flex
            mt={['41px']}
            justifyContent={['center', 'center', 'start']}
          >
            <TokenSelector />
          </Flex>

          <Flex
            direction={['column', 'column', 'row']}
            justifyContent={['center', 'center', 'space-between']}
            mt='41px'
          >
            <Flex
              alignItems={'center'}
              justifyContent='center'
            >
              <Image
                src={starImage}
                width='14.21px'
                height={'13.54px'}
              />
              <Text
                ml='18px'
                fontFamily={'Nunito'}
                fontWeight={'700'}
                fontSize={'20px'}
                lineHeight={'27px'}
                textTransform={'capitalize'}
              >
                Leaderboard
              </Text>
            </Flex>

            <Flex
              justifyContent={['center', 'center', 'unset']}
              mt={['29px', '29px', 'unset']}
            >
              <Flex
                border={'1px solid #FC541C'}
                borderRadius='29px'
                py='11px'
                pl='17px'
                pr='36px'
                width={'fit-content'}
                justifyContent='center'
                onClick={onOpenRegisterInLeaderboardModal}
              >
                <Flex
                  ml='18px'
                  fontFamily={'Nunito'}
                  fontWeight={'700'}
                  fontSize={'14px'}
                  lineHeight={'19px'}
                  textTransform={'capitalize'}
                  cursor={'pointer'}
                >
                  Register
                </Flex>
              </Flex>
            </Flex>

            <Flex
              justifyContent={['center', 'center', 'unset']}
              mt={['29px', '29px', 'unset']}
            >
              <Flex
                border={'1px solid #FC541C'}
                borderRadius='29px'
                py='11px'
                pl='14px'
                pr='20px'
                width={'fit-content'}
                justifyContent='center'
              >
                <HiOutlineSearch />

                <Input
                  ml='18px'
                  fontFamily={'Nunito'}
                  fontWeight={'700'}
                  fontSize={'15px'}
                  lineHeight={'19px'}
                  height={'19px'}
                  width={'107px'}
                  placeholder={'Search by name'}
                  padding={'0 0 0 5px'}
                  margin={'0'}
                  border={'none'}
                  _focusVisible={{
                    border: 'none'
                  }}
                  value={name}
                  onChange={(e) => setName(e?.target?.value)}
                />
              </Flex>
            </Flex>
          </Flex>

          <LeaderboardTable
            selectedName={name}
          />
          <RegisterInLeaderboardModal
            isOpen={isOpenRegisterInLeaderboardModal}
            onClose={onCloseRegisterInLeaderboardModal}
          />
        </Box>
      </Flex >
    </>
  )
}

export default Leaderboard
