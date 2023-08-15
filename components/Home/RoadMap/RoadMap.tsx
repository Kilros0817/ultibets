import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import Timeline from '../Timeline/Timeline';

const RoadMap = () => {
  return (
    <Box
    >
      <Flex
        mt={['150px', '130px', '180px', '-80px']}
        justifyContent={'center'}
        alignItems={'center'}
        direction={'column'}
      >
        <Flex justifyContent={'center'} alignItems={'center'}>
          <Text
            fontFamily={'Nunito'}
            fontStyle={'normal'}
            fontWeight={'700'}
            fontSize={['30px', '30px', '30px', '50px']}
            lineHeight={['41px', '41px', '41px', '68px']}
            textTransform={'capitalize'}
            color={'#FFFFFF'}
          >
            RoadMap
          </Text>
        </Flex>
        <Timeline />
      </Flex>
    </Box>
  );
};

export default RoadMap;
