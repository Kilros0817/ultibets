import { Box, Flex, Grid } from '@chakra-ui/react';
import Tees from '../../../components/MerchStore/Tees';
import { PacksData, TeesData } from '../../../constant';
import SubHeader from '../../../components/MerchStore/SubHeader';
import Pack from '../../../components/MerchStore/Pack';
import { useNetwork } from 'wagmi';
import { useEffect, useState } from 'react';
import { getNPrice } from '../../../utils/interact/utility';
import { getUTBETSPrice } from '../../../utils/interact/sc/utbets';
import { rate } from '../../../utils/config';

const AllItems = () => {
  const [utbetsPrice, setUTBETSPrice] = useState(0.1)
  const {chain} = useNetwork();

  useEffect(() => {
    const initNPrice = async () => {
      const nativePrice = await getNPrice(chain?.id ?? 137);
      const price = await getUTBETSPrice(chain?.id ?? 137)
      setUTBETSPrice(nativePrice * price / rate);
    }
    initNPrice()
  }, [chain])
  return (
    <Box bg={'#1F1F1F'} width={'auto'}>
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
      <Flex
        direction={'column'}
        gap={'10px'}
        justifyContent={'center'}
        alignItems={'center'}
        mt={'30px'}
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
          {PacksData.map((pack) => {
            return (
              <Pack
                key={pack.id}
                id={pack.id}
                name={pack.name}
                uPrice={utbetsPrice}
                bonus={pack.bonus}
                price={pack.price} 
                image={pack.image}
              />
            );
          })}
        </Grid>
      </Flex>
    </Box>
  );
};
export default AllItems;
