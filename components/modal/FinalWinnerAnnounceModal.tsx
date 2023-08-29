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
import { VotingResultInSBC } from '../../utils/config'
import FinalWinnerComponent from '../squid/detail-pages/winner-page/FinalWinnerComponent'

export type FinalWinnerAnnounceModalProps = {
  isOpenFinalWinnerAnnounceModal: boolean,
  onCloseFinalWinnerAnnounceModal(): void,
  eventID: number
  prizePool: number
  currentToken: string
  voteResult: VotingResultInSBC
  winnersNumber: number
}

const FinalWinnerAnnounceModal = ({
  isOpenFinalWinnerAnnounceModal,
  onCloseFinalWinnerAnnounceModal,
  eventID,
  prizePool,
  currentToken,
  voteResult,
  winnersNumber,
}: FinalWinnerAnnounceModalProps) => {

  return (
    <Modal isOpen={isOpenFinalWinnerAnnounceModal} onClose={onCloseFinalWinnerAnnounceModal}>
      {' '}
      <ModalOverlay
        bg='blackAlpha.10'
        backdropFilter='blur(10px) hue-rotate(10deg)'
      />
      <ModalContent
        border={'1px solid white'}
      >
        <ModalCloseButton />
        <ModalBody>
          <Flex
            justifyContent={'center'}
            direction={'column'}
            alignItems={'center'}
          >
            <Flex
              className='final-winner-announce-modal-images'
              position={'relative'}
              direction={'column'}
              alignItems={'center'}
            >
              <Image
                width={'38px'}
                height={'38px'}
                src={'/images/svgs/modal/exclamation-logo.svg'}
                top={'50px'}
                position={'absolute'}
              />
            </Flex>

            <FinalWinnerComponent
              eventID={eventID}
              voteResult={voteResult}
              prizePool={prizePool}
              currentToken={currentToken}
              registerID={0} // not used in the final winner component for modal case
              isModalBody={true}
              winnersNumber={winnersNumber}
            />

            <Button
              onClick={() => {
                onCloseFinalWinnerAnnounceModal()
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
              color={'white'}
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

export default FinalWinnerAnnounceModal
