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
} from '@chakra-ui/react'
import { useChainContext } from '../../utils/Context'

export type FinalModalProps = {
  isOpenThird: boolean,
  onCloseSecond(): void,
  onCloseThird(): void,
  type: string,
}

const FinalModal = ({
  isOpenThird,
  onCloseSecond,
  onCloseThird,
  type,
}: FinalModalProps) => {
  const {
    shouldRender,
    setShouldRender,
  } = useChainContext();

  return (
    <Modal isOpen={isOpenThird} onClose={onCloseThird}>
      {' '}
      <ModalOverlay
        bg='blackAlpha.10'
        backdropFilter='blur(10px) hue-rotate(10deg)'
      />
      <ModalContent
        border={'1px solid white'}
      >
        <ModalHeader>Success</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            justifyContent={'center'}
            direction={'column'}
            alignItems={'center'}
          >
            <Image
              width={'250px'}
              height={'250px'}
              src={'/images/svgs/chain/congrets.svg'}
              alt={'win'}
            />
            <Text
              fontFamily={'Nunito'}
              fontWeight={'700'}
              fontSize={'25px'}
              lineHeight={'34px'}
              color={'white'}
              textTransform={'capitalize'}
              textAlign={'center'}
            >
              {
                type == 'bet' ? 'Your prediction has been successfully placed'
                  : 'Your vote has been successfully placed'
              }
            </Text>
            <Button
              onClick={() => {
                onCloseThird()
                onCloseSecond()
                setShouldRender(!shouldRender);
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

export default FinalModal
