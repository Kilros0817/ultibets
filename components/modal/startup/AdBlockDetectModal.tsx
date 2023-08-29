import {
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react'

export type AdBlockDetectModalProps = {
  isOpenAdBlockDetectModal: boolean,
  onCloseAdBlockDetectModal(): void,
}

const AdBlockDetectModal = ({
  isOpenAdBlockDetectModal,
  onCloseAdBlockDetectModal,
}: AdBlockDetectModalProps) => {

  return (
    <Modal isOpen={isOpenAdBlockDetectModal} onClose={onCloseAdBlockDetectModal}>
      {' '}
      <ModalOverlay
        bg='blackAlpha.10'
        backdropFilter='blur(10px) hue-rotate(10deg)'
      />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            justifyContent={'center'}
            direction={'column'}
            alignItems={'center'}
          >
            <Flex
              className='adblock-modal-images'
              position={'relative'}
              direction={'column'}
              alignItems={'center'}
            >
              <Image
                width={'308px'}
                height={'200px'}
                src={'/images/svgs/modal/geoblock-modal-background.svg'}
                margin={'-8px'}
              />
              <Image
                width={'38px'}
                height={'38px'}
                src={'/images/svgs/modal/exclamation-logo.svg'}
                top={'50px'}
                position={'absolute'}
              />
            </Flex>

            <Flex
              direction={'column'}
            >
              <Flex
                fontFamily={'Nunito'}
                fontWeight={'700'}
                fontSize={'20px'}
                lineHeight={'34px'}
                color={'white'}
                textTransform={'capitalize'}
              >
                You are using adblocker. Please disable adblock and try again.
              </Flex>
            </Flex>

            <Button
              onClick={() => {
                onCloseAdBlockDetectModal()
              }}
              mt={'30px'}
              mb={'30px'}
              height={'46px'}
              width={'155px'}
              background={'unset'}
              color={'white'}
              borderRadius={'34px'}
              border={'1px solid #FC541C'}
              _hover={{
                background: '#FC541C',
              }}
              fontSize={'20px'}
            >
              Okay
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AdBlockDetectModal
