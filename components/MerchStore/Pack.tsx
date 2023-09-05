import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

type PackProps = {
  id: string;
  name: string;
  bonus: number;
  uPrice: number;
  price: number;
  image: string;
};

const Pack = ({ id, name, bonus, price, uPrice, image }: PackProps) => {
  const router = useRouter();
  return (
    <Box>
      <Box w={'100%'} margin={['10px', '10px', 'unset', 'unset']} zIndex={11}>
        <Box
          overflow={'visible'}
          position={'absolute'}
          ml={'-15px'}
          bgGradient={
            'radial-gradient(50% 50% at 50% 50%, rgba(225, 137, 51, 0.4) 0%, rgba(225, 136, 51, 0.4) 0.01%, rgba(190, 59, 49, 0) 100%)'
          }
        ></Box>

        <Box
          border={'1px solid #FFFFFF'}
          boxShadow={'inner'}
          borderRadius={'5px'}
          pb={'40px'}
          _hover={{
            boxShadow: '0px 0px 10px #FFFFFF',
          }}
          onClick={() => {
            router.push(`/merch-store/utbets-packs/${id}`);
          }}
        >
          <Flex
            backgroundColor={'red'}
            width={'40%'}
            float={'right'}
            borderRadius={'5px'}
          >
            <Text
              m={'auto'}
              fontSize={'12px'}
              fontFamily='Nunito'
              fontWeight={'bold'}
            >
              {bonus}% UTBETS Bonus
            </Text>
          </Flex>
          <Flex
            mt={'40px'}
            mb={'20px'}
            width={'100%'}
          >
            <Text
              m={'auto'}
              fontSize={'30px'}
              fontFamily='Nunito'
              fontWeight={'bold'}
            >
              {name}
            </Text>

          </Flex>
          <Flex
            justifyContent={'center'}
            alignItems={'center'}
            cursor={'pointer'}

          >
            <Image
              src={image}
              width={['full', '300px', '300px', '300px']}
              height={['auto', '300px', '300px', '249px']}
              alt='Ultibets Tshirt'
            />
          </Flex>

        </Box>
        <Flex
          justifyContent={'space-between'}
          alignItems={'center'}
          marginTop={'10px'}
          pl={'10px'}
          pr={'10px'}
        >
          <Flex flexDirection={'column'}>
            <Text
              color={'white'}
              fontSize={'20px'}
              letterSpacing='2px'
              fontWeight={'800'}
            >
              {Math.ceil(price / uPrice * (100 + bonus) / 100 * 1000) / 1000} UTBETS
            </Text>
            <Text
              fontWeight={'900'}
              color={'#FFB11C'}
              letterSpacing='1px'
              fontSize={'16px'}
            >
              {' '}
              {price} USDC
            </Text>
          </Flex>
          <Button
            onClick={() => {
              router.push(`/merch-store/utbets-packs/${id}`);
            }}
            width={'70px'}
            height={'30px'}
            border={'1px solid #FC541C'}
            borderRadius={'3xl'}
            backgroundColor={'#1F1F1F'}
            _hover={{
              backgroundColor: '#FC541C',
            }}
            _selected={{
              backgroundColor: '#FC541C',
            }}
          >
            <Text color={'white'} fontSize={'12px'} fontWeight={'800px'}>
              Buy
            </Text>
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Pack;
