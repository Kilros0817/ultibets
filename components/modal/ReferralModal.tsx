import {
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { useAccount } from 'wagmi';
import { getEllipsisTxt } from '../../utils/formatters';

export type ReferralModalProps = {
  isOpen: boolean,
  onClose(): void,
}

const ReferralModal = ({
  isOpen,
  onClose,
}: ReferralModalProps) => {
  const { address, } = useAccount();
  const referralURL = (window.location.hostname ?? 'no-host') + "/prediction-markets?r=" + window.btoa(address ?? '')
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay
        bg='blackAlpha.10'
        backdropFilter='blur(10px) hue-rotate(10deg)'
      />
      <ModalContent
        width={'497px'}
        height='520px'
        border='1px solid #FFFFFF'
        borderRadius={'15px'}
      >
        <ModalCloseButton />
        <ModalBody
        >
          <Flex
            justifyContent={'center'}
            direction={'column'}
            alignItems={'center'}
          >
            <Flex
              position={'relative'}
              justifyContent='center'
            >
              <Flex>
                <Image
                  width={'308px'}
                  height={'250px'}
                  src={'/images/svgs/referral/referral-logo.svg'}
                  alt={'win'}
                />
              </Flex>
              <Image
                width={'137px'}
                height={'137px'}
                src={'/images/svgs/referral/pyramid-logo.svg'}
                alt={'win'}
                position='absolute'
                top={'64px'}
              />
            </Flex>

            <Text
              fontFamily={'Nunito'}
              fontWeight={'700'}
              fontSize={'22px'}
              lineHeight={'30px'}
              textTransform={'capitalize'}
              mt='-20px'
            >
              Refer your friends,
              <span style={{ marginLeft: '5px', color: '#FF9100' }}>
                get $UtBets!
              </span>
            </Text>

            <Flex
              fontFamily={'Nunito'}
              fontWeight={'700'}
              fontSize={'15px'}
              lineHeight={'30px'}
              textTransform={'capitalize'}
              mt='26px'
              py='12px'
              px='43px'
              border={'1px solid #E04D1C'}
              borderRadius='43px'

            >
              <Flex
                alignItems={'center'}
                cursor={'pointer'}

                onClick={() => { navigator.clipboard.writeText(referralURL) }}
              >
                <Image
                  src='/images/svgs/referral/copy.svg'
                  mr='13px'
                  _hover={{
                    transform: 'scale(1.1)',
                  }}
                />
              </Flex>
              {getEllipsisTxt(referralURL, 10)}
            </Flex>
          </Flex>

          <Flex
            fontFamily={'Nunito'}
            fontWeight={'700'}
            fontSize={'22px'}
            lineHeight={'38px'}
            textTransform={'capitalize'}
            justifyContent='center'
            mt='26px'
          >
            Share on social media
          </Flex>

          <Flex
            fontFamily={'Nunito'}
            fontWeight={'700'}
            fontSize={'22px'}
            lineHeight={'38px'}
            textTransform={'capitalize'}
            justifyContent='center'
            mt='19px'
            mb='77px'
          >
            <a href={"https://twitter.com/ultibets"} target="_new">
              {' '}
              <Flex
                width={'50px'}
                height={'50px'}
                backgroundSize={'contain'}
                backgroundRepeat={'no-repeat'}
                backgroundPosition={'center'}
                backgroundImage={`url(/images/svgs/slider/twitter-logo.svg)`}
                cursor={'pointer'}
                _hover={{
                  transform: 'scale(1.1)',
                }}
              ></Flex>
            </a>
            <a href={"https://twitter.com/ultibets"} target="_new">
              {' '}
              <Flex
                width={'50px'}
                height={'50px'}
                backgroundSize={'contain'}
                backgroundRepeat={'no-repeat'}
                backgroundPosition={'center'}
                backgroundImage={`url(/images/svgs/slider/ig-logo.svg)`}
                cursor={'pointer'}
                _hover={{
                  transform: 'scale(1.1)',
                }}
              ></Flex>
            </a>
            <a href={"https://twitter.com/ultibets"} target="_new">
              {' '}
              <Flex
                width={'50px'}
                height={'50px'}
                backgroundSize={'contain'}
                backgroundRepeat={'no-repeat'}
                backgroundPosition={'center'}
                backgroundImage={`url(/images/svgs/slider/telegram-logo.svg)`}
                cursor={'pointer'}
                _hover={{
                  transform: 'scale(1.1)',
                }}
              ></Flex>
            </a>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ReferralModal
