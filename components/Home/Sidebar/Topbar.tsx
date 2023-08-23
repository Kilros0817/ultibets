import { Box, Flex, Text } from '@chakra-ui/react';
import React, {useState} from 'react';
import SideLink from './SideLink';

type SidebarItemProps = {
  id: string;
  name: string;
  href?: string;
  icon: string;
};

const Sidebar = () => {
  const [sidebarLink, setSideBarLink] = useState<string | undefined>('/world-cup');
  const SidebarItems: Array<SidebarItemProps> = [
    {
      id: '1',
      name: 'Soccer',
      href: '/',
      icon: '/images/svgs/sidebar/soccer-ball.svg',
    },
    {
      id: '2',
      name: 'Basketball',
      href: '/basketball',
      icon: '/images/svgs/sidebar/basketball.svg',
    },
    {
      id: '12',
      name: 'US Football',
      href: '/us-football',
      icon: '/images/svgs/sidebar/nfl.svg',
    },
    {
      id: '3',
      name: 'Tennis',
      href: '/tennis',
      icon: '/images/svgs/sidebar/tennis-ball.svg',
    },
    {
      id: '4',
      name: 'Combat Sports',
      href: '/combat-sports',
      icon: '/images/svgs/sidebar/boxing.svg',
    },
    {
      id: '5',
      name: 'Motor Sports',
      href: '/motor-sports',
      icon: '/images/svgs/sidebar/finish-flag.svg',
    },
    {
      id: '6',
      name: 'Cryptos',
      href: '/cryptos',
      icon: '/images/svgs/sidebar/bitcoin.svg',
    },
    {
      id: '7',
      name: 'Stocks',
      href: '/stocks',
      icon: '/images/svgs/sidebar/profit.svg',
    },
    {
      id: '8',
      name: 'Politics',
      href: '/politics',
      icon: '/images/svgs/sidebar/elections.svg',
    },
    {
      id: '9',
      name: 'Movies/TV Series',
      href: '/movies-tv-Series',
      icon: '/images/svgs/sidebar/clapperboard.svg',
    },
    {
      id: '10',
      name: 'Music',
      href: '/music',
      icon: '/images/svgs/sidebar/musical.svg',
    },
    {
      id: '11',
      name: 'Squid Bet Competitions',
      href: '/sbc',
      icon: '/images/svgs/sidebar/squid.svg',
    },
  ];
  return (
    <>
      <Flex mt={'10px'} alignItems={'center'} justifyContent={'center'}>
        <Box width={'3px'} height={'3px'} mr={'10px'} background={'#D9D9D9'} />

        <Text
          fontFamily={'Nunito'}
          fontStyle={'normal'}
          fontWeight={'700'}
          fontSize={'14px'}
          lineHeight={'19px'}
          letterSpacing={'0.645em'}
          textTransform={'uppercase'}
          color={'#FFFFFF'}
        >
          categories
        </Text>
        <Box width={'3px'} height={'3px'} background={'#D9D9D9'} />
      </Flex>

      <Flex
        mt={'10px'}
        flexDirection={'row'}
        cursor='pointer'
        zIndex={1}
        alignItems='center'
        justifyContent='center'
      >
        {SidebarItems?.map((item) => (
          <div key={item.id}>
            <SideLink name={item.name} icon={item.icon} href={item.href} sidebarLink={sidebarLink} setSideBarLink={setSideBarLink}/>
          </div>
        ))}
      </Flex>
    </>
  );
};

export default Sidebar;
