import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import Tees from '../../components/MerchStore/Tees';
import SubHeader from '../../components/MerchStore/SubHeader';
import { TeesData } from '../../constant/';
import '@fontsource/inter';

const MerchStore = () => {
  return (
    <Box>
      <SubHeader />
      <Box bg={'#1F1F1F'} width={'auto'}>
        <Flex
          direction={'column'}
          gap={'10px'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Text
            color={'white'}
            fontSize={['27px', '27px', '27px', '27px']}
            fontWeight={'700'}
            lineHeight={'32.68px'}
            fontFamily={'inter'}
            mb={'10px'}
            mt={'10px'}
          >
            Featured Products 🔥
          </Text>{' '}
          <Grid
            zIndex={11}
            templateColumns={[
              'repeat(1, 1fr)',
              'repeat(1, 1fr)',
              'repeat(3, 1fr)',
              'repeat(3, 1fr)',
            ]}
            mr={'25px'}
            gap='50px'
            mb={'20px'}
          >
            {TeesData.map((tee) => {
              return (
                <Tees
                  key={tee.id}
                  id={tee.id}
                  name={tee.name}
                  price={tee.price as number}
                  image={tee.image}
                />
              );
            })}
          </Grid>
        </Flex>
      </Box>
    </Box>
  );
};

export default MerchStore;
