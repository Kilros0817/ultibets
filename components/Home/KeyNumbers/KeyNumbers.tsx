import { Box, Center, Container, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

const KeyNumbers = () => {
  return (
    <Box
      mt={['100px', '130px', '180px', '360px']}
      mb={'150px'}
      position={'relative'}
    >
      <Flex
        mt={['0px', '300px', '300px', '300px']}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Text
          fontFamily={'Nunito'}
          fontStyle={'normal'}
          fontWeight={'700'}
          fontSize={['25px', '30px', '30px', '50px']}
          lineHeight={['34px', '34px', '34px', '68px']}
          textTransform={'capitalize'}
          color={'#FFFFFF'}
        >
          Key Numbers
        </Text>
      </Flex>
      <Box display={['none', 'none', 'none', 'block']}>
        <Image
          mt={['100px', '130px', '380px', '-20px']}
          src={'/images/svgs/bg/key-vector.svg'}
          width={'100vw'}
          height={'442.18px'}
          alt={'key numbers'}
        />
      </Box>
      <Flex
        justifyContent={'center'}
        direction={['column', 'column', 'column', 'row']}
        alignItems={'center'}
        display={['flex', 'flex', 'flex', 'none']}
        position={'relative'}
      >
        <Image
          position={['relative', 'relative', 'absolute', 'absolute']}
          mt={['-130px', '130px', '1400px', '-20px']}
          src={'/images/svgs/bg/key-vector-mobile.svg'}
          width={['100%', '100%', '100%']}
          height={['1400.18px', '1500.18px', '1000.18px', '1500.18px']}
          alt={'key numbers'}
        />
      </Flex>

      <Flex
        mt={['-1280px', '-1450px', '100px', '-310px']}
        flexDirection={['column', 'column', 'column', 'row']}
        zIndex={'-1'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={['80px', '130px', '100px', '150px']}
      >
        <Box
          opacity={0.8}
          // zIndex={-1}
          // position={'absolute'}
          width={'289px'}
          height={'289px'}
          // left={['50px', '10px', '240px', '50px']}
          // top={['110px', '110px', '140px', '110px']}
          background={
            'radial-gradient(50% 50% at 50% 50%, rgba(225, 137, 51, 0.5) 0%, rgba(225, 136, 51, 0.5) 0.01%, rgba(190, 59, 49, 0) 100%)'
          }
        />{' '}
        <Box
          opacity={0.8}
          width={'289px'}
          height={'289px'}
          background={
            'radial-gradient(50% 50% at 50% 50%, rgba(225, 137, 51, 0.5) 0%, rgba(225, 136, 51, 0.5) 0.01%, rgba(190, 59, 49, 0) 100%)'
          }
        />{' '}
        <Box
          opacity={0.8}
          width={'289px'}
          height={'289px'}
          background={
            'radial-gradient(50% 50% at 50% 50%, rgba(225, 137, 51, 0.5) 0%, rgba(225, 136, 51, 0.5) 0.01%, rgba(190, 59, 49, 0) 100%)'
          }
        />
      </Flex>

      <Flex
        zIndex={'1'}
        justifyContent={'center'}
        px={['0px', '0px', '0px', '120px']}
        mt={['-1000px', '-1050px', '-1030px', '-250px']}
        alignItems={'center'}
        gap={['200px', '200px', '200px', '170px', '250px']}
        direction={['column', 'column', 'column', 'row']}
      >
        <Flex>
          <Flex direction={'column'}>
            <Text
              fontSize={'82px'}
              fontWeight={'700'}
              lineHeight={'112px'}
              textTransform={'capitalize'}
              color={'#E18935'}
            >
              200
            </Text>
            <Text
              fontSize={'22px'}
              fontWeight={'700'}
              lineHeight={'30px'}
              textTransform={'capitalize'}
              color={'#FFFFFF'}
              width={'200px'}
              height={'90px'}
            >
              New weekly predictions available on average
            </Text>
          </Flex>
        </Flex>
        <Flex>
          <Flex direction={'column'}>
            <Text
              fontSize={'82px'}
              fontWeight={'700'}
              lineHeight={'112px'}
              textTransform={'capitalize'}
              color={'#E18935'}
            >
              7
            </Text>
            <Text
              fontSize={'22px'}
              fontWeight={'700'}
              lineHeight={'30px'}
              textTransform={'capitalize'}
              color={'#FFFFFF'}
              width={'219px'}
              height={'90px'}
              alignItems={'start'}
            >
              EVM compatible blockchains for fair fast and low-cost predictions{' '}
            </Text>
          </Flex>
        </Flex>
        <Flex>
          <Flex direction={'column'}>
            <Text
              fontSize={'82px'}
              fontWeight={'700'}
              lineHeight={'112px'}
              textTransform={'capitalize'}
              color={'#E18935'}
            >
              11
            </Text>
            <Text
              fontSize={'22px'}
              fontWeight={'700'}
              lineHeight={'30px'}
              textTransform={'capitalize'}
              color={'#FFFFFF'}
              width={'219px'}
              height={'90px'}
              alignItems={'start'}
            >
              prediction markets categories{' '}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default KeyNumbers;
