import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import '@fontsource/nunito';
import { getAllowance, usdcApprove } from '../../utils/interact/sc/usdc';
import { chainRPCs, merchStoreContractAddresses, mumbaiChainId, rate, usdcAddresses } from '../../utils/config';
import { useAccount, useNetwork } from 'wagmi';
import { formatUnits, parseEther } from 'viem';
import axios from 'axios';
import { buyPacks } from '../../utils/interact/sc/merch-store';
import { getNPrice } from '../../utils/interact/utility';
import { getUTBETSPrice } from '../../utils/interact/sc/utbets';
import { PacksData } from '../../constant';
import { useRouter } from 'next/router';
import AnnounceModal from '../modal/AnnounceModal';
import { checkIconInGreenBg } from '../../utils/assets';


const DetailedPack = () => {
  const [counter, setCounter] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [utbetsAmount, setUtbetsAmount] = useState(0)
  const [uAmount, setUAmount] = useState(0);

  const [signature, setSignature] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const { chain } = useNetwork();
  const { address } = useAccount();

  const router = useRouter();

  const {
    isOpen: isOpenBuyPack,
    onOpen: onOpenBuyPack,
    onClose: onCloseBuyPack,
  } = useDisclosure();

  const {
    isOpen: isOpenApproveSuccessAnnounceModal,
    onOpen: onOpenApproveSuccessAnnounceModal,
    onClose: onCloseApproveSuccessAnnounceModal,
  } = useDisclosure();

  const [isApproved, setIsApproved] = useState(false);

  const incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);


  const addItemHandler = () => {
    incrementCounter();
  };

  const removeItemHandler = () => {
    decrementCounter();
  };

  const pack = PacksData.find((obj) => {
    return obj.id == router.query.slug;
  });

  const getSignature = async () => {
    setIsLoading(true)

    try {
      const data = {
        chainId: chain?.id ?? 0,
        rpc: (chainRPCs as any)[chain?.id ?? mumbaiChainId],
        eventID: (parseEther(utbetsAmount?.toString() ?? '0')).toString(),
        bettor: address,
        usdcAmount: totalPrice,
        utbetsAmount: utbetsAmount,
      };

      const result = await axios.post(
        '/api/createPackSign',
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if ((result as any).data.isSuccess) {
        setSignature((result as any).data.signature)
      }
    } catch (err) {
      console.log('error in creating signature: ', err);
    }
    setIsLoading(false)
  }

  const approveUSDC = async () => {
    setIsConfirming(true);
    const res = await usdcApprove(totalPrice.toString(), chain?.id ?? 0)
    if (res) {
      onOpenApproveSuccessAnnounceModal()
      await initAllowance();
    }

    setIsConfirming(false);
  }

  const buyPack = async () => {
    setIsConfirming(true);
    const res = await buyPacks(
      address,
      totalPrice,
      utbetsAmount,
      signature,
      chain?.id ?? 0
    )

    if (res) {
      onOpenBuyPack()
      await initAllowance();
    }

    setIsConfirming(false)
  }

  const initAllowance = async () => {
    const allowance = await getAllowance(usdcAddresses[chain?.id ?? 0], address, (merchStoreContractAddresses as any)[chain?.id ?? 0])
    const amount = formatUnits(allowance as any, 6);

    if (+amount >= totalPrice) {
      setIsApproved(true)
      if (totalPrice > 0)
        await getSignature();
    }
    else setIsApproved(false);
  }

  useEffect(() => {
    if (pack?.price)
      setTotalPrice(counter * pack.price)

    setUtbetsAmount(counter * uAmount);
  }, [counter])

  useEffect(() => {
    if (chain?.id && totalPrice > 0)
      initAllowance();
  }, [totalPrice])

  useEffect(() => {
    const initUAmount = async () => {
      const nativePrice = await getNPrice(chain?.id ?? 137);
      const uPrice = await getUTBETSPrice(chain?.id ?? 137)
      const utbetsPrice = nativePrice * uPrice / rate;
      const amount = Math.ceil((pack?.price as number) / utbetsPrice * (100 + (pack?.bonus as number)) / 100 * 1000) / 1000
      setUAmount(amount);
    }
    if (chain?.id && pack) initUAmount();
  }, [chain, pack])

  return (
    <Box>
      <Box maxWidth={'1000px'} margin={'auto'}>
        <Flex
          justifyContent={'center'}
          direction={['column', 'column', 'row', 'row']}
          alignItems='center'
          margin={'auto'}
          w={['auto', 'auto', '600px', 'auto']}
          gap={['30px', '30px', '0px', '0px']}
        >
          <Flex
            direction={'column'}
            mt={['0', '0', '0', 'none']}
            ml={['0', '0', '0', 'none']}
            width={'40%'}
          >
            <Flex
              border={'1px solid white'}
              borderRadius={'10px'}
              justifyContent='center'
              alignItems={'center'}
              py={'20px'}
              mt={'10px'}
              mb={'auto'}
              _hover={{
                boxShadow: '0px 0px 10px #FC541C',
              }}
            >
              {' '}
              <Image
                src={pack?.image}
                alt={pack?.name}
                borderRadius={'10px'}
              />
            </Flex>
            <Text
              color={'white'}
              letterSpacing='3px'
              fontSize={'15px'}
              fontWeight={'900'}
              mt={'10px'}
              ml={'10px'}
              fontFamily={'Nunito'}
            >
              {pack?.name.toUpperCase()}
            </Text>
          </Flex>
          <Flex
            direction={'column'}
            ml={['0', '0', '50px', '50px']}
            mt={'20px'}
            width={'60%'}
          >
            <Flex gap={'3px'} direction={'column'}>
              <Text
                color={'white'}
                fontSize={'3xl'}
                fontWeight={'700'}
                fontFamily={'Nunito'}
                mt={'-20px'}
                ml={'20px'}
              >
                {pack?.description}
              </Text>
              <Text
                fontFamily={'Nunito'}
                color={'white'}
                fontSize={'16px'}
                fontWeight={'light'}
                ml={'20px'}
              >
                {pack?.price} USDC
              </Text>
            </Flex>
            <Flex gap={'8px'} mt={'20px'} direction={'column'}>
              <Text
                color={'white'}
                fontSize={'20px'}
                fontFamily={'Nunito'}
                fontWeight={'bold'}
                ml={'20px'}
              >
                Description
              </Text>
              <Text
                fontFamily={'Nunito'}
                color={'white'}
                fontSize={'15px'}
                fontWeight={'light'}
                ml={'20px'}
              >
                {pack?.description1}
              </Text>
              <Text
                fontFamily={'Nunito'}
                color={'white'}
                fontSize={'15px'}
                fontWeight={'light'}
                ml={'20px'}
              >
                {pack?.description2}
              </Text>
              <Text
                fontFamily={'Nunito'}
                color={'white'}
                fontSize={'15px'}
                fontWeight={'light'}
                ml={'20px'}
              >
                {pack?.description3}
              </Text>
              <Flex gap={'5px'} direction={'row'}
                mt={'50px'}>
                <Text
                  fontFamily={'Nunito'}
                  color={'white'}
                  fontSize={'15px'}
                  fontWeight={'light'}
                  ml={'20px'}
                >
                  Total Price : {totalPrice.toLocaleString()} USDC
                </Text>
                <Text
                  fontFamily={'Nunito'}
                  color={'white'}
                  fontSize={'15px'}
                  fontWeight={'light'}
                  ml={'20px'}
                >
                  You Get: {utbetsAmount.toLocaleString()} UTBETS
                </Text>
              </Flex>
            </Flex>
            <Flex
              ml={'20px'}
              mt={'30px'}
              mb={'20px'}
              direction={['column', 'column', 'row', 'row']}
              gap={'20px'}
            >
              <Flex>
                {' '}
                <IconButton
                  isDisabled={counter == 0}
                  mt={'2px'}
                  aria-label='Search database'
                  onClick={removeItemHandler}
                  icon={<MinusIcon />}
                />{' '}
                <Flex alignItems={'center'}>
                  <Text color={'white'} m={'10px'}>
                    {counter}
                  </Text>
                  <IconButton
                    aria-label='Search database'
                    onClick={addItemHandler}
                    icon={<AddIcon />}
                  />
                </Flex>
              </Flex>

              <Button
                isDisabled={
                  counter == 0 || isLoading
                }
                width={['300px', 'auto', '300px', '330px']}
                border='1px solid #FC541C'
                backgroundColor={'#1F1F1F'}
                color={'white'}
                p={'10px'}
                _hover={{
                  backgroundColor: '#FC541C',
                }}
                onClick={isApproved ? buyPack : approveUSDC}
              >
                <Text fontSize={'20px'}> {isApproved ? 'Buy Packs' : 'Approve'} </Text>
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <AnnounceModal
        isOpenAnnounceModal={
          isConfirming
        }
        onCloseAnnounceModal={() => setIsConfirming(false)}
        announceText={'Your transaction is currently processing on the blockchain'}
        announceGif={true}
        announceModalButtonText={'Close'}
      />
      <AnnounceModal
        isOpenAnnounceModal={isOpenBuyPack}
        onCloseAnnounceModal={() => {
          setIsConfirming(false);
          onCloseBuyPack()
        }}
        announceText={'You successfully bought UTBETS packs'}
        announceLogo={checkIconInGreenBg}
        announceModalButtonText={'Close'}
      />
      <AnnounceModal
        isOpenAnnounceModal={isOpenApproveSuccessAnnounceModal}
        onCloseAnnounceModal={onCloseApproveSuccessAnnounceModal}
        announceText={'USDC successfully approved'}
        announceLogo={checkIconInGreenBg}
        announceModalButtonText={'Close'}
        announceModalButtonAction={() => {
          setIsConfirming(false);
          onCloseApproveSuccessAnnounceModal();
        }
        }
      />
    </Box>
  );
};

export default DetailedPack;
