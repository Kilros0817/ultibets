import {
  Flex,
  Image
} from '@chakra-ui/react'
import React from 'react'
import { snapshotURL } from '../../utils/config'

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
      <Flex mt={'80px'}
				mb='40px'
				justifyContent={'center'}
				alignItems={'center'}>
				<a href={snapshotURL}
					target="_new">Snapshot</a>
				</Flex>
    </Flex>
  )
}

export default Governance
