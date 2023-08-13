import {
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { VotingResultInSBC } from '../../utils/config'
import { useVote, } from '../../utils/interact/sc/squid-competition'
import AnnounceModal from './AnnounceModal'
import FinalModal from './FinalModal'

export type PlaceVoteModalProps = {
  isOpen: boolean
  onClose: () => void
  description: string
  eventID: number
  logo: string
  option: VotingResultInSBC
}

const PlaceVoteModal = ({
  isOpen,
  onClose,
  description,
  eventID,
  logo,
  option,
}: PlaceVoteModalProps) => {
  const {
    isOpen: isOpenFinal,
    onOpen: onOpenFinal,
    onClose: onCloseFinal,
  } = useDisclosure();

  const vote = useVote(
    option,
    eventID
  )

  const handleVote = async () => {
    if (vote.isLoading) return;

    try {
      vote.voteFunction?.();
      onOpenFinal();
    } catch (err) {
      console.log('error in place bet: ', err);
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        {' '}
        <ModalOverlay
          bg='blackAlpha.10'
          backdropFilter='blur(10px) hue-rotate(10deg)'
        />
        <ModalContent
          border={'1px solid white'}
        >
          <ModalHeader>Confirm</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              textAlign={'center'}
              direction={'column'}
              alignItems={'center'}
            >
              <Image
                width={'250px'}
                height={'250px'}
                src={logo}
                alt={'win'}
              />
              <Text
                fontFamily={'Nunito'}
                fontWeight={'700'}
                fontSize={'25px'}
                lineHeight={'34px'}
                color={'white'}
                textTransform={'capitalize'}
              >
                Do you confirm your vote for {description} ?
              </Text>
              <Flex
                gap='30px'
                my='20px'
              >
                <Button
                  onClick={() => handleVote()}
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

                <Button
                  onClick={() => {
                    onClose()
                  }}
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
                  Cancel
                </Button>
              </Flex>

            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <FinalModal
        isOpenThird={isOpenFinal && vote.isSuccess}
        onCloseSecond={onClose}
        onCloseThird={onCloseFinal}
        type='vote'
      />
      <AnnounceModal
        isOpenAnnounceModal={
          (isOpenFinal && vote.isLoading)
        }
        onCloseAnnounceModal={onClose}
        announceText={'Your transaction is currently processing on the blockchain'}
        announceGif={true}
        announceModalButtonText={'Close'}
      />
    </>

  )
}

export default PlaceVoteModal
