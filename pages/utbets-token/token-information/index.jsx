import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import Pie from './Pie'
import '@fontsource/inter'
import UtBetsTokenRoutes from "../tokenRoutes";
import { chainAttrs } from '../../../utils/config';

const chartData = [
  {
    //     Private funding: 5%
    // 50,000,000 $UTBETS
    category: 'Private Funding',
    amount: 50000000,
    percent: 5,
    color: '#739AF0',
  },
  {
    //     team: 15%
    // 150,000,000 $UTBETS
    category: 'Team',
    amount: 150000000,
    percent: 15,
    color: '#A5D8DB',
  },

  {
    //     Airdrop: 5%
    // 50,000,000 $UTBETS
    category: 'Airdrop',
    amount: 50000000,
    percent: 5,
    color: '#FDE774',
  },
  {
    //     Growth & partnerships: 15%
    // 150,000,000 $UTBETS
    category: 'Growth & Partnerships',
    amount: 150000000,
    percent: 15,
    color: '#ECA33F',
  },
  {
    //     infrastructure & Scaling: 10%
    // 100,000,000 $UTBETS
    category: 'Infrastructure & Scaling',
    amount: 100000000,
    percent: 10,
    color: '#F9653C',
  },
  {
    //     public sale: 20%
    // 200,000,000 $UTBETS
    category: 'Public Sale',
    amount: 200000000,
    percent: 20,
    color: '#D07574',
  },
  {
    //     community incentives: 30%
    // 300,000,000 $UTBETS
    category: 'Community Incentives',
    amount: 300000000,
    percent: 30,
    color: '#BA7CE8',
  },
]

const TokenInformation = () => {
  const [currentMainnetOrTestnetAttrs,] = useState(
    process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);

  return (
    <Flex
      direction='column'>
      <Flex
        justifyContent={'center'}
        direction={'column'}
        gap={'15px'}
      >
        <UtBetsTokenRoutes />

        <Flex
          justifyContent={'center'}
          alignItems={'center'}
          gap={'10px'}
          mt='66'
        >
          <Text
            fontFamily={'Inter'}
            fontWeight={'700'}
            fontSize={'35px'}
            lineHeight={'42px'}
            color={'#E18833'}
            textTransform={'capitalize'}
          >
            $UTBETS
          </Text>
          <Text
            fontWeight={'700'}
            fontSize={'35px'}
            lineHeight={'42px'}
            color={'white'}
            textTransform={'capitalize'}
          >
            Tokenomics
          </Text>
        </Flex>
        <Flex
          justifyContent={'center'}
          alignItems={'center'}
          gap={'10px'}
          mb='10px'
        >
          <Text
            fontFamily={'Inter'}
            fontWeight={'700'}
            fontSize={'20px'}
            lineHeight={'24px'}
            color={'#E18833'}
            textTransform={'capitalize'}
          >
            Total supply:{' '}
          </Text>
          <Text
            fontFamily={'Inter'}
            fontWeight={'700'}
            fontSize={'20px'}
            lineHeight={'24px'}
            color={'white'}
            textTransform={'capitalize'}
          >
            1,000,000,000 $UTBETS{' '}
          </Text>
        </Flex>

        {/* chainAttrs */}
        <Flex
          alignItems='center'
          textAlign='center'
          justifyContent='center'
          fontFamily={'Inter'}
        >
          <Flex
            direction={['column', 'column', 'column', 'row']}
            justifyContent={['start', 'start', 'start', 'center']}
            gap={['10px', '10px', '10px', '40px']}
            px={['80px', '80px', '80px', '0']}
            py={['20px', '30px', '20px', '0']}
            width={['100%', '100%', '100%', '100%']}
          >
            {
              currentMainnetOrTestnetAttrs.map((item, index) => (
                <Flex
                  gap='2'
                  key={index}
                >
                  <Image
                    width='20px'
                    src={item.logo}
                  />
                  <Text
                    fontSize='20px'
                    textTransform='capitalize'
                  >
                    {item.name}
                  </Text>
                  <Text
                    fontSize='20px'
                  >
                    25%
                  </Text>
                </Flex>
              ))
            }
          </Flex>
        </Flex>


        <Flex
          display={['none', 'none', 'none', 'flex']}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Pie data={chartData} />
        </Flex>
      </Flex>

      {/* chart info(in mobile) */}
      <Flex
        gap='5'
        direction='column'
        fontFamily='Inter'
        px='80px'
        fontSize='20px'
        mt='20px'
        mb='40px'
        display={['flex', 'flex', 'flex', 'none']}
      >
        {
          chartData.map((item, index) => (
            <Flex
              direction='column'
              justifyContent='start'
            >
              <Text
                color={item.color}
              >
                {item.category}: {item.percent}%
              </Text>
              <Text>
                {item.amount.toLocaleString()} $UTBETS
              </Text>
            </Flex>
          ))
        }
      </Flex>

      <Image
        src='/images/pngs/logo-desktop.svg'
        width='200px'
        left={['unset', 'unset', 'unset', '5%', '15%']}
        top='45%'
        position='absolute'
        display={['none', 'none', 'none', 'flex']}
      />


      {/* after chart */}
      < Flex
        direction={'column'}
        justifyContent={'center'}
        alignItems={'left'}
      >

        <Flex
          width={'100vw'}
          height={'0px'}
          border={'1px solid #FFFFFF'}
          display={['block', 'block', 'block', 'none']}
        />

        <Text
          fontFamily={'Nunito'}
          fontWeight={'700'}
          fontSize={'25px'}
          lineHeight={'34px'}
          color={'white'}
          textTransform={'capitalize'}
          mt={'40px'}
          mb={'20px'}
          pl='20'
        >
          vesting and unlock
        </Text>

        <Flex
          width={'100vw'}
          height={'0px'}
          border={'1px solid #FFFFFF'}
          display={['none', 'none', 'none', 'block']}
        />

        <Flex
          gap={['30px', '40px', '30px', '50px']}
          mt={['10px', '10px', '10px', '60px']}
          mb={'25px'}
          direction={['column', 'column', 'column', 'row']}
          px='20'
          justifyContent={'space-between'}
        >
          <Flex
            direction={'column'}
            gap={'10px'}
          >
            <Text
              fontFamily={'Nunito'}
              fontWeight={'700'}
              fontSize={'16px'}
              lineHeight={'22px'}
              color={'white'}
              textTransform={'capitalize'}
            >
              Team{' '}
            </Text>
            <Text
              fontFamily={'Nunito'}
              fontWeight={'700'}
              fontSize={'16px'}
              lineHeight={'22px'}
              color={'white'}
              textTransform={'capitalize'}
            >
              Cliff 6 months, vesting 12 months, then unlock every month for 24
              months @ 1/24th per month, post mainnet{' '}
            </Text>
          </Flex>
          <Flex
            direction={'column'}
            gap={'10px'}
          >
            <Text
              fontFamily={'Nunito'}
              fontWeight={'700'}
              fontSize={'16px'}
              lineHeight={'22px'}
              color={'white'}
              textTransform={'capitalize'}
            >
              funding{' '}
            </Text>
            <Text
              fontFamily={'Nunito'}
              fontWeight={'700'}
              fontSize={'16px'}
              lineHeight={'22px'}
              color={'white'}
              textTransform={'capitalize'}
            >
              vesting period 12 months, then unlock every month for 12 months @
              1/12th per month, post mainnet
            </Text>
          </Flex>
          <Flex
            direction={'column'}
            gap={'10px'}
          >
            <Text
              fontFamily={'Nunito'}
              fontWeight={'700'}
              fontSize={'16px'}
              lineHeight={'22px'}
              color={'white'}
              textTransform={'capitalize'}
            >
              thortstarter IDO{' '}
            </Text>
            <Text
              fontFamily={'Nunito'}
              fontWeight={'700'}
              fontSize={'16px'}
              lineHeight={'22px'}
              color={'white'}
              textTransform={'capitalize'}
            >
              30% unlock on TGE, 3 month cliff. then unlock 10% monthly linear{' '}
            </Text>
          </Flex>
        </Flex>
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
  )
}

export default TokenInformation
