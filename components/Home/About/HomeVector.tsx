import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

const HomeVector = () => {
  return (
    <Box display={['none', 'none', 'none', 'block']}>
      <Flex opacity={0.7} justifyContent={'end'} mr={'20px'}>
        <Flex
          background={'url(/images/svgs/bg/vector-bg.svg)'}
          backgroundRepeat={'no-repeat'}
          backgroundPosition={'right'}
          width={'300px'}
          height={'300px'}
          mt={'-70px'}
        ></Flex>
      </Flex>
    </Box>
  );
};

export default HomeVector;
