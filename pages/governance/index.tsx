import {
  Flex,
  Image
} from '@chakra-ui/react'
import React from 'react'
import Proposals from '../../components/Governance/proposals'
import NewProposal from '../../components/Governance/NewProposal'
import '@fontsource/inter'
import '@fontsource/nunito'

const Governance = () => {

  return (
    <Flex
      mt={'30px'}
      px='3'
      py='6'
      width={'100%'}
      gap={'50px'}
      justifyContent={'center'}
      alignItems={['center', 'center', 'center', 'start']}
      direction={['column', 'column', 'column', 'row']}
    >
      <NewProposal />
      <Proposals />

      <Image
        src='/images/pngs/left-white-gradient-1.svg'
        alt='left-white-gradient'
        position='absolute'
        bottom='0'
        left='0'
        zIndex='1'
      />
      <Image
        src='/images/pngs/right-white-gradient-1.svg'
        alt='right-white-gradient'
        position='absolute'
        top='10%'
        right='0'
        zIndex='1'
      />
    </Flex>
  )
}

export default Governance
