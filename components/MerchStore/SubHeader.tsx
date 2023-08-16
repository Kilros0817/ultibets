import { Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
const SubHeader = () => {

  const subCategories = [
    {
      name: 'All Items',
      link: '/merch-store/all-items',
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

  return (
    <Flex
      bgColor={'#1F1F1F'}
      justifyContent='center'
      alignItems={'center'}
      display={'flex'}
      zIndex={11}
    >
      <Flex
        alignItems={'center'}
        justifyContent={'space-between'}
        width={['300px', '400px','600px']}
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
    </Flex>
  );
};

export default SubHeader;
