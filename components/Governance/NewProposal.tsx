import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import snapshot from '@snapshot-labs/snapshot.js';
import React, { useState } from 'react'
import NewProposalModal from '../modal/NewProposalModal';

const NewProposal = () => {
  const {
    isOpen: isOpenAddNewProposaleModal,
    onOpen: onOpenAddNewProposaleModal,
    onClose: onCloseAddNewProposaleModal,
  } = useDisclosure();

  return (
    <Flex direction={'column'} gap={'30px'}>
      <Flex
        justifyContent={'start'}
        alignItems={'start'}
        direction={'column'}
        gap={'25px'}
      >
        <Text
          ml={'40px'}
          fontFamily={'Inter'}
          fontStyle={'normal'}
          fontWeight={700}
          fontSize={'20px'}
          lineHeight={'24px'}
          textTransform={'capitalize'}
          color={'#FFFFFF'}
          _before={{
            content: `""`,
            position: "absolute",
            width: "30%",
            height: '20%',
            left: "-15%",
            bottom: '20%',
            bg: "radial-gradient(50% 50% at 50% 50%, rgba(115, 154, 240, 0.4) 0%, rgba(115, 154, 240, 0) 100%)",
            // opacity: "1",
            filter: "blur(100px)",
          }}
        >
          voting wallet
        </Text>
        <Flex
          px='42px'
          py='30px'
          width={'100%'}
          height={'148px'}
          justifyContent={'center'}
          alignItems={'center'}
          borderRadius={'5px'}
          border={'1px solid #FFFFFF'}
          direction={'column'}
          gap={'30px'}
        >
          <Text
            fontFamily={'Inter'}
            fontStyle={'normal'}
            fontWeight={700}
            fontSize={'20px'}
            lineHeight={'24px'}
            textTransform={'capitalize'}
            color={'#FFFFFF'}
          >
            Add a new proposal
          </Text>
          <Button
            py='10px'
            px='56px'
            fontFamily={'Nunito'}
            // width={'145px'}
            background={'unset'}
            borderRadius={'34px'}
            border={'1px solid #FC541C'}
            _hover={{
              background: '#FC541C',
            }}
            onClick={onOpenAddNewProposaleModal}
          >
            Submit Proposal
          </Button>
        </Flex>
      </Flex>
      <NewProposalModal
        isOpen={isOpenAddNewProposaleModal}
        onClose={onCloseAddNewProposaleModal}
      />
    </Flex>
  )
}

export default NewProposal
