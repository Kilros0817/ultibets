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

export type AnnounceModalProps = {
  isOpenAnnounceModal: boolean,
  onCloseAnnounceModal(): void,
  announceText: string,
  announceLogo?: string,
  announceGif?: true,
  announceCongrets?: true,
  announceModalButtonText: string,
  announceModalButtonAction?(): void,
  announceModalCloseButtonShow?: boolean
}

const AnnounceModal = ({
  isOpenAnnounceModal,
  onCloseAnnounceModal,
  announceText,
  announceLogo,
  announceCongrets,
  announceGif,
  announceModalButtonText,
  announceModalButtonAction,
  announceModalCloseButtonShow = true,
}: AnnounceModalProps) => {

  return (
    <Modal isOpen={isOpenAnnounceModal} onClose={onCloseAnnounceModal}>
      {' '}
      <ModalOverlay
        bg='blackAlpha.10'
        backdropFilter='blur(10px) hue-rotate(10deg)'
      />
      <ModalContent
        border={'1px solid white'}
        borderRadius={'15px'}
      >
        {
          announceModalCloseButtonShow && (
            <ModalCloseButton />
          )
        }
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
              {
                announceCongrets && announceLogo && (
                  <Image
                    width={'250px'}
                    height={'250px'}
                    src={announceLogo}
                    top={'50px'}
                    position={'absolute'}
                  />
                )
              }
              {
                ! announceCongrets && announceLogo && (
                  <Image
                    width={'38px'}
                    height={'38px'}
                    src={announceLogo}
                    top={'50px'}
                    position={'absolute'}
                  />
                )
              }
              {
                announceGif && (
                  <Flex
                    className="loading-container"
                    justifyContent={'center'}
                    textAlign={'center'}
                    mt={'100px'}
                    alignItems={'center'}
                    px={'20px'}
                    position={'absolute'}
                  >
                    <section>
                      <Flex className="loader loader-1">
                        <Flex className="loader-outter" />
                        <Flex className="loader-inner" />
                      </Flex>
                    </section>
                  </Flex>
                )
              }
            </Flex>

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
              >
                {announceText}
              </Flex>
            </Flex>

            <Button
              onClick={() => {
                (announceModalButtonAction) ? announceModalButtonAction() : onCloseAnnounceModal()
              }}
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
              {announceModalButtonText}
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AnnounceModal
