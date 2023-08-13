import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  Switch,
  useDisclosure
} from '@chakra-ui/react'
import React, { useState, useEffect, } from 'react'
import UtBetsTokenRoutes from "../tokenRoutes";
import { getEllipsisTxt } from '../../../utils/formatters';
import { useAccount, useNetwork } from 'wagmi';
import { useClaimPrize, usePrizeAmount } from '../../../utils/interact/sc/airdrop';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import AnnounceModal from '../../../components/modal/AnnounceModal';
import { checkIconInGreenBg } from '../../../utils/assets';

const UtbetsAirdrop = () => {
  const { chain, } = useNetwork();
  const { address, } = useAccount();
  const [isEligible, setIsEligible] = useState(false);
  const {
    isOpen: isOpenSuccessAnnounceModal,
    onOpen: onOpenSuccessAnnounceModal,
    onClose: onCloseSuccessAnnounceModal,
  } = useDisclosure();

  const goBack = () => {
    console.log("back button clicked");
  }

  const prizeAmount = usePrizeAmount();

  useEffect(() => {
    if (prizeAmount.isLoading) return;
    if (prizeAmount.status) {
      setIsEligible(Number(ethers.utils.formatEther(prizeAmount.result as string)) > 0);
    }
  }, [
    chain,
    address,
    prizeAmount.isLoading,
    prizeAmount.result,
  ])

  const claimPrize = useClaimPrize();

  const handleClaimAirdrop = () => {
    console.log("is eligible: ", isEligible);
    if (!isEligible) {
      toast.error('You can\'t claim airdrop');
      return;
    }

    if (claimPrize.isLoading) return;
    try {
      claimPrize.claimPrizeFunction?.();
      onOpenSuccessAnnounceModal();
    } catch (err) {
      console.log('error in claim airdrop: ', err);
    }
  }

  return (
    <>
      <Flex
        direction={'column'}
      >
        <UtBetsTokenRoutes />
        <Flex
          mt={'80px'}
          justifyContent={'center'}
          alignItems={'center'}
          direction='column'
        >
          {/* <Flex
            direction='row'
          >
            <Switch
              colorScheme="orange"
              size="lg"
              isChecked={isEligible}
              onChange={() => setIsEligible(!isEligible)}
            />
            Eligible(This is just for test in development)
          </Flex> */}

          <Text
            fontFamily='Nunito'
            fontSize='18px'
            fontWeight='700'
            fontStyle='normal'
            lineHeight='25px'
          >
            $UtBets Airdrop
          </Text>

          <Image
            src={isEligible ? '/images/pngs/airdrop-eligible.svg' : '/images/pngs/airdrop-not-eligible.svg'}
            my='3'
          />

          <Flex
            direction={['column', 'column', 'row']}
          >
            <Text
              fontFamily='Nunito'
              fontStyle='italic'
              fontSize='22px'
              textAlign='center'
              mr={isEligible ? '3' : '2'}
            >
              {isEligible ? 'Congrats!' : 'Unfortunatly'}
            </Text>

            {
              isEligible ? (
                <Flex
                >
                  <Image
                    maxWidth='19px'
                    src='/images/pngs/checkbox.svg'
                    mr='1'
                  />
                  <Text
                    fontFamily='Nunito'
                    fontStyle='italic'
                    fontSize='22px'
                    textAlign='center'
                    textTransform='capitalize'
                  >
                    You’re eligible for the airdrop
                  </Text>
                </Flex>
              ) : (
                <Text
                  fontFamily='Nunito'
                  fontStyle='italic'
                  fontSize='22px'
                  textAlign='center'
                  textTransform='capitalize'
                >
                  You’re not eligible for the airdrop
                </Text>
              )
            }
          </Flex>

          <Text
            color='#848484'
            fontFamily='Nunito'
            fontSize='18px'
            my='27px'
          >
            Address: {getEllipsisTxt(address ?? '0x0', 5)}
          </Text>

          {
            isEligible ? (
              <>
                <Flex
                  direction='column'
                  fontFamily='Nunito'
                  width={['250px', '300px', '400px', '500px']}
                >
                  <Flex
                    justifyContent={'space-between'}
                    alignItems={'center'}
                  >
                    <Text
                    >
                      UltiBets User:
                    </Text>
                    <Flex
                      direction='row'
                      mb='9px'
                    >
                      <Text
                        color='#FF9100'
                        mr='2'
                      >
                        100K
                      </Text>
                      <Text
                      >
                        $UTBETS
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    mb='9px'
                  >
                    <Text
                    >
                      Bonus:
                    </Text>
                    <Flex
                      direction='row'
                    >
                      <Text
                        color='#FF9100'
                        mr='2'
                      >
                        200K
                      </Text>
                      <Text
                      >
                        $UTBETS
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    mb='9px'
                  >
                    <Text
                    >
                      Early Bird multiplier:
                    </Text>
                    <Text
                    >
                      x 1.2
                    </Text>
                  </Flex>

                  <Flex
                    justifyContent={'space-between'}
                    alignItems={'center'}
                  >
                    <Text
                    >
                      Betting hero:
                    </Text>
                    <Text
                    >
                      x 2
                    </Text>
                  </Flex>

                  <Box
                    height='0px'
                    borderBottom='1px dashed #8E8E8E'
                    my='18px'
                  />

                  <Flex
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    mb='9px'
                  >
                    <Text
                    >
                      Total:
                    </Text>
                    <Flex
                      direction='row'
                    >
                      <Text
                        color='#FF9100'
                        mr='2'
                      >
                        356K
                      </Text>
                      <Text
                      >
                        $UTBETS
                      </Text>
                    </Flex>
                  </Flex>

                </Flex>

                <Flex
                  my='60px'
                  justifyContent={'center'}
                >
                  <Button
                    border='1px solid #FC541C'
                    px='41px'
                    py='10px'
                    borderRadius='34px'
                    background='transparent'
                    _hover={{
                      backgroundColor: '#FC541C',
                    }}
                    _active={{
                      backgroundColor: '#FC541C',
                    }}
                    onClick={() => handleClaimAirdrop()}
                  >
                    Claim $UTBETS
                  </Button>
                </Flex>
              </>
            ) : (
              <Flex
                my='60px'
                justifyContent={'center'}
              >
                <Button
                  border='1px solid #FC541C'
                  px='41px'
                  py='10px'
                  borderRadius='34px'
                  background='transparent'
                  _hover={{
                    backgroundColor: '#FC541C',
                  }}
                  _active={{
                    backgroundColor: '#FC541C',
                  }}
                  onClick={() => goBack()}
                >
                  Go Back
                </Button>
              </Flex>
            )
          }
        </Flex>

        <Image
          src='/images/pngs/left-white-gradient-1.svg'
          alt='left-white-gradient'
          position='absolute'
          bottom='0'
          left='0'
          zIndex='1'
        />
        <Image
          src='/images/pngs/right-white-gradient-1.svg'
          alt='right-white-gradient'
          position='absolute'
          top='10%'
          right='0'
          zIndex='1'
        />
        <AnnounceModal
          isOpenAnnounceModal={isOpenSuccessAnnounceModal && claimPrize.isSuccess}
          onCloseAnnounceModal={onCloseSuccessAnnounceModal}
          announceText={'Your name has been successfully registered'}
          announceLogo={checkIconInGreenBg}
          announceModalButtonText={'Close'}
        />
        <AnnounceModal
          isOpenAnnounceModal={(isOpenSuccessAnnounceModal && claimPrize.isLoading)}
          onCloseAnnounceModal={onCloseSuccessAnnounceModal}
          announceText={'Your transaction is currently processing on the blockchain'}
          announceGif={true}
          announceModalButtonText={'Close'}
          announceModalButtonAction={onCloseSuccessAnnounceModal}
        />
      </Flex>
    </>
  )
}

export default UtbetsAirdrop;
