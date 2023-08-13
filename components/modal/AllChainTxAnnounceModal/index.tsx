import {
  Button,
  Checkbox,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { newChainAttrs } from '../../../utils/config';

export type AllChainTxAnnounceModalProps = {
  isOpenAllChainTxAnnounceModal: boolean,
  onCloseAllChainTxAnnounceModal(): void,
  allChainTxAnnounceResult: any,
}

const AllChainTxAnnounceModal = ({
  isOpenAllChainTxAnnounceModal,
  onCloseAllChainTxAnnounceModal,
  allChainTxAnnounceResult,
}: AllChainTxAnnounceModalProps) => {

  return (
    <Modal isOpen={isOpenAllChainTxAnnounceModal} onClose={onCloseAllChainTxAnnounceModal}>
      {' '}
      <ModalOverlay
        bg='blackAlpha.10'
        backdropFilter='blur(10px) hue-rotate(10deg)'
      />
      <ModalContent
        border={'1px solid white'}
        borderRadius={'15px'}
      >
        <ModalCloseButton />
        <ModalBody>
          <Flex
            justifyContent={'center'}
            direction={'column'}
            alignItems={'center'}
          >
            <Flex
              direction={'column'}
            >
              <Flex
                fontFamily={'Nunito'}
                fontWeight={'700'}
                fontSize={'25px'}
                lineHeight={'34px'}
                color={'white'}
                textTransform={'capitalize'}
                textAlign={'center'}
                direction={'column'}
                mt={'70px'}
              >
                {
                  allChainTxAnnounceResult.map((item: any, index: number) => {
                    const key = (Object.keys(item))[0];
                    const isNative = key.includes('a') ? true : false;
                    const chainId = Number(key.slice(0, -1));
                    const value = (Object.values(item))[0] as boolean;

                    return <Checkbox
                      size="lg"
                      colorScheme="orange"
                      isChecked={value}
                      key={index}
                    >
                      {(newChainAttrs as any)[chainId].name} - {isNative ? 'Native' : 'Utbets'}
                    </Checkbox>
                  })
                }
              </Flex>
            </Flex>

            <Button
              onClick={onCloseAllChainTxAnnounceModal}
              mt={'30px'}
              mb={'30px'}
              height={'46px'}
              minWidth={'155px'}
              width={'fit-content'}
              background={'unset'}
              borderRadius={'34px'}
              border={'1px solid #FC541C'}
              _hover={{
                background: '#FC541C',
              }}
              fontSize={'20px'}
              fontFamily={'Nunito'}
            >
              Close
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal >
  )
}

export default AllChainTxAnnounceModal
