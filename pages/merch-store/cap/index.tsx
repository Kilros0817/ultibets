import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Tees from '../../../components/MerchStore/Tees';
import { TeesData } from '../../../constant';
import SubHeader from '../../../components/MerchStore/SubHeader';

const Cap = () => {
  const router = useRouter();
  const caps = TeesData.filter((obj) => {
    return obj.code == router.pathname.split('/')[2];
  });

  return (
    <Box bg={'#1F1F1F'} width={'100vw'} height={'100vh'}>
      <SubHeader />
      <Flex
        direction={'column'}
        gap={'10px'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Grid
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
          {caps?.map((tee) => {
            return (
              <Tees
                key={tee.id}
                id={tee.id}
                name={tee.name}
                price={tee.price}
                image={tee.image}
              />
            );
          })}
        </Grid>
      </Flex>
    </Box>
  );
};
export default Cap;