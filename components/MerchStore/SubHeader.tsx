import { Flex, Icon, Link, Spacer } from '@chakra-ui/react';
import NextLink from 'next/link';
import { CgShoppingCart, } from 'react-icons/cg'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useRouter } from 'next/router';

const SubHeader = () => {
  const router = useRouter();

  const subCategories = [
    {
      name: 'All Items',
      link: '/merch-store',
    },
    {
      name: 'UTBETS Packs',
      link: '/merch-store/utbets-packs',
    },
    {
      name: 'Men T-shirts',
      link: '/merch-store/men-tshirt',
    },
    {
      name: 'Women T-shirts',
      link: '/merch-store/women-tshirt',
    },
    {
      name: 'Hoodies',
      link: '/merch-store/hoodie',
    },
    {
      name: 'Cap',
      link: '/merch-store/cap',
    },
    {
      name: 'Mug',
      link: '/merch-store/mug',
    },
  ];

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = cartItems?.map((item) => item.quantity).reduce((a, b) => a + b, 0);

  return (
    <Flex
      bgColor={'#1F1F1F'}
      zIndex={11}
      justifyContent={'space-between'}
    >
      <Flex
        margin={'auto'}
        alignItems={'center'}
        justifyContent={'space-between'}
        width={['380px', '450px', '600px']}
        fontSize={['10px', '12px', '14px']}
        mb={'20px'}
      >
        {subCategories.map((subCategory) => (
          <NextLink href={subCategory.link} key={subCategory.name} passHref>
            <Link
              color={'white'}
              _focus={{
                border: 'none',
                color: '#E18833',
              }}
              _hover={{
                color: '#E18833',
              }}
              _selected={{
                color: '#E18833',
              }}
              fontWeight={'bold'}
            >
              {subCategory.name}
            </Link>
          </NextLink>
        ))}
      </Flex>
      <Flex position={'relative'} alignItems={'center'}
        _hover={{ transform: 'scale(1.1)' }}
        onClick={() =>
          router.push('/merch-store/checkout')
        }
      >
        <Flex
          borderRadius={'50%'}
          background={'#FF5500'}
          width={['16px', '18px']}
          height={['16px', '18px']}
          border={'3px solid #1F1F1F'}
          position={'absolute'}
          right={'-5px'}
          top={'-3px'}
          justifyContent={'center'}
          alignItems={'center'}
          fontFamily={'Inter'}
          fontSize={'8px'}
        >
          {totalAmount}
        </Flex>
        <Flex
          width={['16px', '18px', '24px']}
          mt={['-18px', '-15px', '-7px']}
          ml={['10px', '20px', '0px']}>
          <CgShoppingCart color='white' size={'100%'} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SubHeader;
