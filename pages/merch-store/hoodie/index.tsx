import { Box, Flex, Grid } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Tees from '../../../components/MerchStore/Tees';
import { TeesData } from '../../../constant';
import SubHeader from '../../../components/MerchStore/SubHeader';

const Hoodie = () => {
  const router = useRouter();
  const hoodies = TeesData.filter((obj) => {
    return obj.code == router.pathname.split('/')[2];
  });

  return (
    <Box
      bg={'#1F1F1F'}
    >
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
          gap='50px'
          mb={'20px'}
        >
          {hoodies.map((tee) => {
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
  );
};
export default Hoodie;
