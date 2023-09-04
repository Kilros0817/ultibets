import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  Image,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import '@fontsource/nunito';
import { getAllowance, usdcApprove } from '../../utils/interact/sc/usdc';
import { chainRPCs, merchStoreContractAddresses, mumbaiChainId, usdcAddresses } from '../../utils/config';
import { useAccount, useNetwork } from 'wagmi';
import { formatUnits, parseEther } from 'viem';
import axios from 'axios';
import { buyPacks } from '../../utils/interact/sc/merch-store';

type DetailedTeeProps = {
  id: string;
  image: string;
  name: string;
  price: number;
  description?: string;
  weight?: number;
};
const DetailedPack = ({
  image,
  name,
  price,
  description,
  id,
  weight,
}: DetailedTeeProps) => {
  const [counter, setCounter] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [utbetsAmount, setUtbetsAmount] = useState(0)

  const [signature, setSignature] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {chain} = useNetwork();
  const {address} = useAccount();

  const [isApproved, setIsApproved] = useState(false);

  const incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);


  const addItemHandler = () => {
    incrementCounter();
  };

  const removeItemHandler = () => {
    decrementCounter();
  };


  const getSignature = async () => {
    setIsLoading(true)

    try {
      const data = {
        chainId: chain?.id ?? 0,
        rpc: (chainRPCs as any)[chain?.id ?? mumbaiChainId],
        eventID: (parseEther(utbetsAmount?.toString() ?? '0')).toString(),
        bettor: address,
      };

      const result = await axios.post(
        '/api/createSignature',
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
    const res = await usdcApprove(totalPrice.toString(), chain?.id ?? 0)
    if (res) {
      toast.success(`USDC Approved!`, {
        position: 'top-right',
        autoClose: 2000,
        theme: 'dark',
      });
      await initAllowance();
    }
    else 
      toast.error(`Error in USDC Approve.`, {
        position: 'top-right',
        autoClose: 2000,
        theme: 'dark',
      });
  }

  const buyPack = async () => {
    const res = await buyPacks(
      address,
      totalPrice,
      utbetsAmount,
      signature,
      chain?.id ?? 0
    )

    if (res) {
      toast.success(`Success!`, {
        position: 'top-right',
        autoClose: 2000,
        theme: 'dark',
      });
      await initAllowance();
    }
    else 
      toast.error(`Failed!`, {
        position: 'top-right',
        autoClose: 2000,
        theme: 'dark',
      });
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
    if (price)
      setTotalPrice(counter * price)
    setUtbetsAmount(counter * (weight as number));
  }, [counter, price])

  useEffect(() => {
    if (chain?.id)
      initAllowance();
  }, [totalPrice])

  return (
    <Box>
      <Box width={'auto'}>
        <Flex
          justifyContent={'center'}
          direction={['column', 'column', 'row', 'row']}
          alignItems='center'
        >
          <Flex
            direction={'column'}
            mt={['0', '0', '0', 'none']}
            ml={['0', '0', '0', 'none']}
          >
            <Flex
              border={'1px solid white'}
              borderRadius={'10px'}
              justifyContent='center'
              alignItems={'center'}
              mt={'10px'}
              mb={'auto'}
              _hover={{
                boxShadow: '0px 0px 10px #FC541C',
              }}
            >
              {' '}
              <Image
                src={image}
                width={['300px', '300px', '350px', '560px']}
                height={['250px', '250px', '240px', '465px']}
                alt={name}
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
              {name?.toUpperCase()}
            </Text>
          </Flex>
          <Flex
            direction={'column'}
            ml={['0', '0', '50px', '50px']}
            mt={'20px'}
            w='auto'
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
                {description}
              </Text>
              <Text
                fontFamily={'Nunito'}
                color={'white'}
                fontSize={'16px'}
                fontWeight={'light'}
                ml={'20px'}
              >
                {price} USDC
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
              <Flex gap={'5px'} direction={'column'}>
                <Text
                  fontFamily={'Nunito'}
                  color={'white'}
                  fontSize={'15px'}
                  fontWeight={'light'}
                  ml={'20px'}
                >
                  Total Price : {totalPrice} USDC
                </Text>
              </Flex>
              <Flex gap={'5px'} direction={'column'}>
                <Text
                  fontFamily={'Nunito'}
                  color={'white'}
                  fontSize={'15px'}
                  fontWeight={'light'}
                  ml={'20px'}
                >
                  You Get: {utbetsAmount} UTBETS
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
                onClick={ isApproved ? buyPack : approveUSDC}
              >
                <Text fontSize={'20px'}> {isApproved ? 'Buy Packs' : 'Approve'} </Text>
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default DetailedPack;
