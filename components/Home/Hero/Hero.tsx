import { Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';
import Herolink from './Herolink';

const Hero = () => {
	const router = useRouter()

  return (
    <Flex
      mt={'70px'}
      background={[
        'url(/images/svgs/bg/mobile-bg.png)',
        // 'url(/images/svgs/bg/mobile-bg.png)',
        'none',
        'none',
      ]}
      backgroundSize={'cover'}

    >
      <Flex
        justifyContent={'space-between'}
        width={['100%', '100%', '100%', '98vw']}
        px={['10px', '20px', '100px', '100px']}
      >
        <Flex
          ml={['0px', '0px', '0px', '30px']}
          direction={'column'}
          gap={['20px', '10px', '10px', '40px']}
        >
          <Heading
            fontStyle={'normal'}
            fontWeight={'700'}
            fontSize={['23px', '25px', '35px', '45px', '60px']}
            lineHeight={['40px', '40px', '40px', '73px']}
            letterSpacing={'0em'}
            textAlign={'left'}
            color={'#FFFFFF'}
            width={['300px', '340px', '450px', '600px', '760px']}
          >
            The first crypto multichain prediction market
          </Heading>
          <Flex
            mx={['2px', '2px', '0px', '0px']}
            gap={['5px', '5px', '10px', '15px']}
          >
            <Herolink />
          </Flex>
          <Flex
            mt={['130px', '10px', '10px', '0px']}
            ml={['70px', '50px', '0px', '0px']}
            justifyContent={['center', 'center', 'start', 'start']}
            alignItems={['center', 'center', 'start', 'start']}
            onClick={() => router.push("/prediction-markets")}
          >
            <Button
              height={'54px'}
              width={'224px'}
              borderRadius={'45px'}
              border={'1px solid #FC541C'}
              background={'unset'}
              _hover={{ background: '#FC541C' }}
            >
              <Text
                fontFamily={'Nunito'}
                fontSize={'22px'}
                fontWeight={'700'}
                lineHeight={'25px'}
                letterSpacing={'0em'}
                textAlign={'left'}
                color={'#FFFFFF'}
              >
                Start Predicting{' '}
              </Text>
            </Button>{' '}
          </Flex>
        </Flex>
        <Flex mr={['0px', '0px', '0px', '30px']}>
          <Image
            src='/images/svgs/bg/logo-bg.svg'
            alt='logo'
            width={['170px', '110px', '160px', '248px']}
            height={['170px', '110px', '160px', '248px']}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Hero;
