import { Box, Flex, Grid } from '@chakra-ui/react';
import SubHeader from '../../../components/MerchStore/SubHeader';
import { PacksData } from '../../../constant';
import Pack from '../../../components/MerchStore/Pack';
import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';
import { getUTBETSPrice } from '../../../utils/interact/sc/utbets';

const UTBETSPacks = () => {
  const [price, setPrice] = useState(0)
  const {chain} = useNetwork();

  useEffect(() => {
    const initPrice = async () => {
      const nPrice = await getUTBETSPrice(chain?.id ?? 137)
      setPrice(nPrice)
    }
    initPrice()
  }, [chain])

  return (
    <Box
      bg={'#1F1F1F'}
      width={['auto', 'auto', '100vw', '100vw']}
      height={['auto', 'auto', '100vw', '100vw']}
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
                price={price * (pack.weight ?? 0)} 
                image={pack.image}
              />
            );
          })}
        </Grid>
      </Flex>
    </Box>
  );
};
export default UTBETSPacks;
