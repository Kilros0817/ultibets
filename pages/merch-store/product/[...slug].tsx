import { Box } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';
import DetailedTee from '../../../components/MerchStore/DetailedTee';
import SubHeader from '../../../components/MerchStore/SubHeader';

const ProductDetails: NextPage = () => {
  const searchParams = useSearchParams()

  return (
    <Box
      bg={'#1F1F1F'}
    >
      <SubHeader />
      {' '}
      <DetailedTee
      />
    </Box>
  );
};

export default ProductDetails;
