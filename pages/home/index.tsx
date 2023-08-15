import {
  Box,
  Flex,
  Image,
} from '@chakra-ui/react'
import React from 'react'

import Topbar from '../../components/Home/Sidebar/Topbar';
import Hero from '../../components/Home/Hero/Hero';
import KeyNumbers from '../../components/Home/KeyNumbers/KeyNumbers';
import About from '../../components/Home/About/About';
import HomeVector from '../../components/Home/About/HomeVector';
import RoadMap from '../../components/Home/RoadMap/RoadMap';
import Partners from '../../components/Home/Partners/Partners';
import JoinUs from '../../components/Home/JoinUs/Index';

const Home = () => {
  return (
    <Box
    >
      <Image
        position={'absolute'}
        zIndex={'-1'}
        src={'/images/svgs/bg/simple-bg.png'}
        height={['0px', '752px', '600px', '752px']}
        width={['0px', '100vw', '100vw', '100vw']}
        marginLeft={['0', '0', '0', '80px', '50px']}
        backgroundBlendMode={'lighten'}
        alt={'background'}
      />
      <Flex
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Topbar />
        <Hero />
      </Flex>
      <KeyNumbers />
      <About />
      <HomeVector />
      <RoadMap />
      <Partners />
      <JoinUs />
    </Box>
  );
};

export default Home;