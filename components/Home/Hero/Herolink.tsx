import { Flex, Image } from '@chakra-ui/react';
import React from 'react';

const Herolink = () => {
  const heroLink = [
    {
      id: '1',
      name: 'Arbitrum',
      logo: '/images/svgs/bg/arbitrum.svg',
    },
    {
      id: '2',
      name: 'Avax',
      logo: '/images/svgs/bg/avax.svg',
    },
    {
      id: '3',
      name: 'Base',
      logo: '/images/svgs/bg/base.svg',
    },
    {
      id: '4',
      name: 'Binance Smart Chain',
      logo: '/images/svgs/bg/bnb.svg',
    },
    {
      id: '5',
      name: 'Ethereum',
      logo: '/images/svgs/bg/ethereum.svg',
    },
    {
      id: '6',
      name: 'Optimism',
      logo: '/images/pngs/chain-logo/optimism.svg',
    },
    {
      id: '7',
      name: 'Polygon',
      logo: '/images/svgs/bg/polygon.svg',
    },

  ];
  return (
    <>
      {heroLink.map((item) => (
        <Flex key={item.id} direction='row' gap={'30px'}>
          <Image
            width={['30px', '30px', '30px', '38px']}
            height={['30px', '30px', '30px', '38px']}
            src={item.logo}
            alt={item.name}
          />
        </Flex>
      ))}
    </>
  );
};

export default Herolink;
