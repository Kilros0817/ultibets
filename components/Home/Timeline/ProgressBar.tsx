import {
  Box,
  Flex,
  Image,
  keyframes,
  usePrefersReducedMotion,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import Content from './Content';

const ProgressBar = () => {
  const scrl = useRef<any>();
  const [scrollX, setscrollX] = useState<number>(0); // For detecting start scroll postion
  const [scrolEnd, setscrolEnd] = useState<boolean>(false); // For detecting end of scrolling

  const slide = (shift: any) => {
    scrl.current.scrollLeft += shift;
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };
  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const glow = keyframes`
  from { box-shadow: 2 0 6px -3px yellow; }
  to { box-shadow: 0 0 6px 3px yellow; }
`;

  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion
    ? undefined
    : `${glow} 1s infinite alternate`;

  const contentItemsTop = [
    {
      title: 'Q4 2021 - Q1 2022',
      subtitle: 'Ultibets Genesis',
      item1: 'Protocol design',
      item2: 'Smart contract design',
      item3: 'UI/UX design',
      item4: 'Organic marketing campaign design',
    },
    {
      title: 'Q2 2022 - Q3 2023',
      subtitle: 'Platform Building Phase',
      item1: 'Full Smart contracts written',
      item2: "Websites built (Landing Page / Main App / Merch' Store)",
      item3: 'Multichain environment built and setup',
    },
    {
      title: 'Q4 2023',
      subtitle: 'Platform and Token Mainnet Launch',
      item1:
        '4 Chains Environment',
      item2:
        '11 Prediction Categories & weekly SBC',
      item3: 'UTBETS Token Social Feature: Leaderboard / My Referral / My Rewards',
      item4: "Merch' Store with physical and digital items",
      item5: "Governance / Swap / LP's / Bridge",
      item6: 'AVAX/BNB/ETH/MATIC/UTBETS, 5 Currencies on UltiBets',
    },
    {
      title: 'Q1-Q2 2024',
      subtitle: 'Metaverse Launch',
      item1:
        'Squid Bets Competitions Arena & Prediction Building For Daily Predictions',
      item2:
        'Digital Store With Packs & NFTs',
      item3: 'Native Chain "Meet And Chill" Areas With Exciting Animations & Marketing Operations (Arbitrum Area In Red, BSC Area In Yellow Etc)',
    },
  ];

  const contentItemsBottom = [
    {
      title: 'Jan-Feb 2022',
      subtitle: 'Alpha Test Phase and IDO with Thorstarter',
      item1: '8000+ Unique Visitors',
      item2: "12+ Countries",
      item3: '190 000+ Testnet FTM Predict On The Protocol Over 745 Prediction Contracts',
      item4: 'First Fantom IDO on Thorstarter',
    },
    {
      title: 'Q3 2023',
      subtitle: 'Audits + Platform Finalisation',
      item1: 'Audits Passed Successfully With GuardianAudits',
      item2: 'Last Testing Sessions With The Full UltiBets Website + Contracts',
      item3: 'Marketing Campaign For Mainnet Launch',
      item4: 'Beta testing internally and with the Community.',
    },
    {
      title: 'Q4 2023-Q1 2024',
      subtitle: 'Metaverse Building Phase',
      item1:
        'Cross Chain Metaverse & Prediction Integration + SBC with UTBETS Tokens As The Only Prediction Currency',
      item2:
        'Full UltiBets Platform  Integration inside the Metaverse To Offer One Unique Location To Join For The UltiBettors Community Scattered Around The 6 Chains',
      item3: 'Second Fundraising IDO And Team Hiring Process',
    },
    {
      title: 'Q2-Q4 2024',
      subtitle: 'Platform Improvements',
      item1:
        'Base / Ethereum / Optimism Integration',
      item2:
        'Side Predictions Integration (Over/Under, Scorers, Points/Goals Per Qt/Half)',
      item3: 'Chainlink Price and Data Feeds Integration',
    },
  ];

  const mobileContentItemsTop = [
    {
      title: 'Q4 2021 - Q1 2022',
      subtitle: 'Ultibets Genesis',
      item1: 'Protocol design',
      item2: 'Smart contract design',
      item3: 'UI/UX design',
      item4: 'Organic marketing campaign design',
    },
    {
      title: 'Jan-Feb 2022',
      subtitle: 'Alpha Test Phase and IDO with Thorstarter',
      item1: '8000+ Unique Visitors',
      item2: "12+ Countries",
      item3: '190 000+ Testnet FTM Predict On The Protocol Over 745 Prediction Contracts',
      item4: 'First Fantom IDO on Thorstarter',
    },
    {
      title: 'Q2 2022 - Q3 2023',
      subtitle: 'Platform Building Phase',
      item1: 'Full Smart contracts written',
      item2: "Websites built (Landing Page / Main App / Merch' Store)",
      item3: 'Multichain environment built and setup',
    },
    {
      title: 'Q3 2023',
      subtitle: 'Audits + Platform Finalisation',
      item1: 'Audits Passed Successfully With GuardianAudits',
      item2: 'Last Testing Sessions With The Full UltiBets Website + Contracts',
      item3: 'Marketing Campaign For Mainnet Launch',
      item4: 'Beta testing internally and with the Community.',
    },
    {
      title: 'Q4 2023',
      subtitle: 'Platform and Token Mainnet Launch',
      item1:
        '4 Chains Environment',
      item2:
        '11 Prediction Categories & weekly SBC',
      item3: 'UTBETS Token Social Feature: Leaderboard / My Referral / My Rewards',
      item4: "Merch' Store with physical and digital items",
      item5: "Governance / Swap / LP's / Bridge",
      item6: 'AVAX/BNB/ETH/MATIC/UTBETS, 5 Currencies on UltiBets',
    },
    {
      title: 'Q4 2023-Q1 2024',
      subtitle: 'Metaverse Building Phase',
      item1:
        'Cross Chain Metaverse & Prediction Integration + SBC with UTBETS Tokens As The Only Prediction Currency',
      item2:
        'Full UltiBets Platform  Integration inside the Metaverse To Offer One Unique Location To Join For The UltiBettors Community Scattered Around The 6 Chains',
      item3: 'Second Fundraising IDO And Team Hiring Process',
    },
    {
      title: 'Q1-Q2 2024',
      subtitle: 'Metaverse Launch',
      item1:
        'Squid Bets Competitions Arena & Prediction Building For Daily Predictions',
      item2:
        'Digital Store With Packs & NFTs',
      item3: 'Native Chain "Meet And Chill" Areas With Exciting Animations & Marketing Operations (Optimism Area In Red, BSC Area In Yellow Etc)',
    },
    {
      title: 'Q2-Q4 2024',
      subtitle: 'Platform Improvements',
      item1:
        'Base / Ethereum / Optimism Integration',
      item2:
        'Side Predictions Integration (Over/Under, Scorers, Points/Goals Per Qt/Half)',
      item3: 'Chainlink Price and Data Feeds Integration',
    },
  ];
  useEffect(() => {
    if (
      scrl.current &&
      scrl?.current?.scrollWidth === scrl?.current?.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
    return () => {};
  }, [scrl?.current?.scrollWidth, scrl?.current?.offsetWidth]);
  return (
    <Box mt={'80px'} position={'relative'}>
      <Box display={['none', 'none', 'block', 'block']}>
        <Box
          display={['none', 'none', 'none', 'block']}
          opacity={0.8}
          zIndex={-1}
          position={'absolute'}
          width={'289px'}
          height={'289px'}
          left={'-170px'}
          top={'-80px'}
          background={
            'radial-gradient(50% 50% at 50% 50%, rgba(225, 137, 51, 0.5) 0%, rgba(225, 136, 51, 0.5) 0.01%, rgba(190, 59, 49, 0) 100%)'
          }
        />{' '}
        <Box
          display={['none', 'none', 'none', 'block']}
          opacity={0.8}
          position={'absolute'}
          width={'289px'}
          height={'289px'}
          left={'500px'}
          top={'-90px'}
          background={
            'radial-gradient(50% 50% at 50% 50%, rgba(225, 137, 51, 0.5) 0%, rgba(225, 136, 51, 0.5) 0.01%, rgba(190, 59, 49, 0) 100%)'
          }
        />
        <Box
          display={['none', 'none', 'none', 'block']}
          opacity={0.8}
          position={'absolute'}
          width={'289px'}
          height={'289px'}
          left={['444px','644px', '644px', '644px']}
          top={'300px'}
          background={
            'radial-gradient(50% 50% at 50% 50%, rgba(225, 137, 51, 0.5) 0%, rgba(225, 136, 51, 0.5) 0.01%, rgba(190, 59, 49, 0) 100%)'
          }
        />
        <Flex
          opacity={0.8}
          position={'absolute'}
          width={'135px'}
          height={'135px'}
          left={'1px'}
          top={'550px'}
          background={
            'radial-gradient(50% 50% at 50% 50%, rgba(225, 137, 51, 0.5) 0%, rgba(225, 136, 51, 0.5) 0.01%, rgba(190, 59, 49, 0) 100%)'
          }
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box
            background={'url(/images/svgs/bg/x-bg.svg)'}
            backgroundSize={'cover'}
            backgroundPosition={'center'}
            width={'43px'}
            height={'43px'}
            mt={'15px'}
            ml={'20px'}
          />
        </Flex>
        <Flex
          position={'relative'}
        >
          {!scrolEnd && (
            <Box
              id='nextBtn'
              _hover={{
                cursor: 'pointer',
                transform: 'scale(1.2)',
              }}
              position={'absolute'}
              right={'-28px'}
              mt={'373px'}
              zIndex={100}
              fontSize={'44px'}
              color={'#FFB11C'}
              onClick={() => slide(630)}
            >
              <Image
                width={'50px'}
                height={'50px'}
                borderRadius={'50%'}
                animation={animation}
                src='images/svgs/icon/right.svg'
                alt='right-arrow'
              />
            </Box>
          )}
          {scrollX !== 0 && (
            <Box
              _hover={{
                cursor: 'pointer',
                transform: 'scale(1.2)',
              }}
              id='prevBtn'
              position={'absolute'}
              left={'-28px'}
              mt={'373px'}
              fontSize={'44px'}
              color={'#FFB11C'}
              onClick={() => slide(-630)}
            >
              <Image
                width={'50px'}
                height={'50px'}
                borderRadius={'50%'}
                animation={animation}
                src='images/svgs/icon/left.svg'
                alt='left-arrow'
              />
            </Box>
          )}
        </Flex>
        <Box
          width={'90vw'}
          overflowX={'scroll'}
          overflowY={'hidden'}
          scrollBehavior={'smooth'}
          onScroll={scrollCheck}
          ref={scrl}
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none',
              background: 'transparent',
              width: '0',
              height: '0',
            },
          }}
        >
          <Box width={'100%'}>
            <Flex
              width={'2500px'}
              mt={'30px'}
              gap={'350px'}
            >
              {contentItemsTop.map((item, index) => (
                <Content
                  key={index}
                  title={item.title}
                  subtitle={item.subtitle}
                  item1={item.item1}
                  item2={item.item2}
                  item3={item.item3}
                  item4={item.item4}
                  item5={item.item5}
                  item6={item.item6}
                />
              ))}
            </Flex>
            <Flex
              mt={'10px'}
              height={'0px'}
              width={'2550px'}
              border={'1px solid #FFB11C'}
            ></Flex>

            <Flex gap={'305px'} width={'2500px'}>
              {[...Array(8)].map((dot, index) => (
                <Flex
                  key={index}
                  mt={'-10px'}
                  width={'20px'}
                  height={'20px'}
                  background={'#FFB11C'}
                  justifyContent={'space-between'}
                  boxShadow={'0px 0px 8px rgba(0, 0, 0, 0.4)'}
                  borderRadius={'50%'}
                />
              ))}
            </Flex>
            <Flex ml={'320px'} width={'2250px'}>
              <Flex my={'30px'} direction={'row'} gap={'350px'}>
                {contentItemsBottom.map((item, index) => (
                  <Content
                    key={index}
                    title={item.title}
                    subtitle={item.subtitle}
                    item1={item.item1}
                    item2={item.item2}
                    item3={item?.item3}
                    item4={item?.item4}
                  />
                ))}
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Box>
      <Flex
        alignItems={'start'}
        justifyContent={'start'}
        width={'100%'}
        display={['flex', 'block', 'none', 'none']}
        direction={'row'}
      >
        <Flex>
          <Flex
            alignItems={'start'}
            justifyContent={'start'}
            mt={'10px'}
            height={'3460px'}
            width={'0px'}
            border={'1px solid #FFB11C'}
          ></Flex>
          <Flex gap={'436px'} direction={'column'} position={'relative'}>
            {[...Array(8)].map((dot, index) => (
              <Flex
                key={index}
                ml={'-10px'}
                width={'20px'}
                height={'20px'}
                background={'#FFB11C'}
                justifyContent={'space-between'}
                boxShadow={'0px 0px 8px rgba(0, 0, 0, 0.4)'}
                borderRadius={'50%'}
              >
                {' '}
                <Box
                  mt={'-100px'}
                  opacity={0.8}
                  position={'absolute'}
                  width={'289px'}
                  height={'289px'}
                  left={'-114px'}
                  background={
                    'radial-gradient(50% 50% at 50% 50%, rgba(225, 137, 51, 0.5) 0%, rgba(225, 136, 51, 0.5) 0.01%, rgba(190, 59, 49, 0) 100%)'
                  }
                />
              </Flex>
            ))}
          </Flex>
          <Flex
            flexDirection={'column'}
            my={'30px'}
            gap={['40px', '90px', '200px', '200px']}
            mt={'-20px'}
            ml={'20px'}
          >
            {mobileContentItemsTop.map((item, index) => (
              <Content
                key={index}
                title={item.title}
                subtitle={item.subtitle}
                item1={item.item1}
                item2={item.item2}
                item3={item?.item3}
                item4={item?.item4}
                item5={item?.item5}
                item6={item?.item6}
              />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProgressBar;
