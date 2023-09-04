import { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { PacksData } from '../../../constant';
import SubHeader from '../../../components/MerchStore/SubHeader';
import DetailedPack from '../../../components/MerchStore/DetailedPack';
import { useNetwork } from 'wagmi';
import { getUTBETSPrice } from '../../../utils/interact/sc/utbets';

const PackDetails: NextPage = () => {
  const router = useRouter();
  const {chain} = useNetwork()
  const [price, setPrice] = useState(0)
  const pack = PacksData.find((obj) => {
    return obj.id == router.query.slug;
  });

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
      width={'100vw'}
      height={['auto', 'auto', '100vh', '100vh']}
    >
      <SubHeader />
      {' '}
      <DetailedPack
        id={pack?.id as string}
        image={pack?.image as string}
        name={pack?.name as string}
        price={price * (pack?.weight as number)}
        description={pack?.description as string}
        weight={pack?.weight as number}
      />
    </Box>
  );
};

export default PackDetails;
