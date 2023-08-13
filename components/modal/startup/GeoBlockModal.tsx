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

export type GeoBlockModalProps = {
  isOpenGeoBlockModal: boolean,
  onCloseGeoBlockModal(): void,
  ip: string,
  country: string,
}

const GeoBlockModal = ({
  isOpenGeoBlockModal,
  onCloseGeoBlockModal,
  country,
}: GeoBlockModalProps) => {

  return (
    <Modal isOpen={isOpenGeoBlockModal} onClose={onCloseGeoBlockModal}>
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
              className='geoblock-modal-images'
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
                You are located in {country}
              </Flex>
              <br />
              <Flex
                fontFamily={'Nunito'}
                fontWeight={'700'}
                fontSize={'20px'}
                lineHeight={'34px'}
                color={'white'}
                textTransform={'capitalize'}
              >
                You are trying to access the UltiBets website within a sanctioned or banned country due to regulations.
              </Flex>
              <br />
              <Flex
                fontFamily={'Nunito'}
                fontWeight={'700'}
                fontSize={'20px'}
                lineHeight={'34px'}
                color={'white'}
                textTransform={'capitalize'}
              >
                Please try again within any accepted jurisdiction or location.
              </Flex>
              <br />
              <Flex
                fontFamily={'Nunito'}
                fontWeight={'700'}
                fontSize={'20px'}
                lineHeight={'34px'}
                color={'white'}
                textTransform={'capitalize'}
              >
                Thank you
              </Flex>
            </Flex>

            <Button
              onClick={() => {
                onCloseGeoBlockModal()
              }}
              mt={'30px'}
              mb={'30px'}
              height={'46px'}
              width={'155px'}
              background={'unset'}
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

export default GeoBlockModal
