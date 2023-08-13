import { Flex, } from '@chakra-ui/react'
import React from 'react'
import SquidCarousel from '../../components/Container/SquidCarousel'
import SquidCardList from '../../components/squid/main-page/SquidCardList'
import Sidebar from '../../components/Sidebar'
import TokenSelector from '../../components/predictions/TokenSelector'

const SbcHome = () => {
  return (
    <Flex
      direction='column'
    >
      <SquidCarousel />
      <Flex>
        <Flex
          width={['70px', '90px']}
          justifyContent='center'
        >
          <Sidebar />
        </Flex>
        <Flex
          width='calc(100% - 90px)'
          mt={'30px'}
          className='sbc-bottom-right-component'
          direction={['column']}
          gap={['50px']}
        >
          <Flex
            className='token-selector-component-wrapper-in-prediction-markets'
            maxHeight={['54px']}
            justifyContent={['center']}
          >
            <TokenSelector />
          </Flex>

          <SquidCardList />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SbcHome
