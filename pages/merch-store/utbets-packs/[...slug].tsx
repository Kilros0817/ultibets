import { Box } from '@chakra-ui/react';
import { NextPage } from 'next';
import SubHeader from '../../../components/MerchStore/SubHeader';
import DetailedPack from '../../../components/MerchStore/DetailedPack';

const PackDetails: NextPage = () => {


  return (
    <Box
      bg={'#1F1F1F'}
    >
      <SubHeader />
      {' '}
      <DetailedPack
      />
    </Box>
  );
};

export default PackDetails;
