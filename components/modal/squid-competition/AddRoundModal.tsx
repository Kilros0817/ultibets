import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
// @ts-ignore
import QRCode from 'qrcode'
// @ts-ignore
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { toast } from 'react-toastify'
import {
  NftSetStatus,
  chainAttrs,
  mumbaiChainId,
  nftImageHeight,
  nftImageWidth,
  NFTType,
  polygonChainId,
  secondsInHalfHour,
  newChainAttrs,
} from '../../../utils/config'
import {
  checkIconInGreenBg,
  utbetsLogoInNFT
} from '../../../utils/assets'
import { addRound, getWinnersNumber } from '../../../utils/interact/sc/squid-competition'
import AnnounceModal from '../AnnounceModal'
import { getFormattedDateString } from '../../../utils/formatters'
import { getNFTTypeString } from '../../../utils/interact/utility'
import { setRoundNFTURI } from '../../../utils/interact/sc/sbcNFT'
import { useNetwork } from 'wagmi'

type AddRoundModalProps = {
  isOpen: boolean
  onClose: () => void
  eventID: number
  result: number
  isNativeToken: boolean
  roundLevel: number
  totalPlayers: number
  playersInThisPhase: number
}

const AddRoundModal = ({
  isOpen,
  onClose,
  eventID,
  result,
  isNativeToken,
  roundLevel,
  totalPlayers,
  playersInThisPhase,
}: AddRoundModalProps) => {
  const { chain, } = useNetwork();
  const [shouldRender, setShouldRender] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [description, setDescription] = useState<string>('')
  const [image, setImage] = useState<any>()
  const [nftType, setNftType] = useState<string>('0');
  const [metadataUrl, setMetadataUrl] = useState<string>('');
  const [chainId, setChainId] = useState<number>(polygonChainId);
  const [numberOfWinnersOfThisRound, setNumberOfWinnersOfThisRound] = useState<number>(0);
  const [currentMainnetOrTestnetAttrs,] = useState(
    process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
  const [chainAttrsIndex, setChainAttrsIndex] = useState(3);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    isOpen: isOpenAddRoundSuccessAnnounceModal,
    onOpen: onOpenAddRoundSuccessAnnounceModal,
    onClose: onCloseAddRoundSuccessAnnounceModal,
  } = useDisclosure();
  const {
    isOpen: isOpenUploadToPinataSuccessAnnounceModal,
    onOpen: onOpenUploadToPinataSuccessAnnounceModal,
    onClose: onCloseUploadToPinataSuccessAnnounceModal,
  } = useDisclosure();
  const {
    isOpen: isOpenWinnerNFTSetSuccessAnnounceModal,
    onOpen: onOpenWinnerNFTSetSuccessAnnounceModal,
    onClose: onCloseWinnerNFTSetSuccessAnnounceModal,
  } = useDisclosure();
  const [nftSetStatus, setNftSetStatus] = useState(NftSetStatus.Original);

  useEffect(() => {
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
      process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId; let currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == chainId);
    if (currentChainAttrsItem.length == 0) {
      const temporaryChainId = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? 137 : 80001
      currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == temporaryChainId);
    }
    setChainAttrsIndex(currentChainAttrsItem[0].index)
    setChainId(chainId);
  }, [chain]);

  useEffect(() => {
    const getNumberOfWinners = async () => {
      const winnersNumber = await getWinnersNumber(
        eventID,
        result,
        chain?.id ?? 137,
        isNativeToken)
      setNumberOfWinnersOfThisRound(winnersNumber as number);
    }
    getNumberOfWinners()
  }, [eventID])

  const handleImageOpen = (e: any) => {
    const render = new FileReader()

    render.onload = async () => {
      if (render.readyState === 2) {
        const baseImage = new Image()
        await new Promise((resolve) => {
          baseImage.onload = () => {
            resolve(baseImage);
          }
          baseImage.src = render.result ? render.result.toString() : ''
        })

        const secondImage = new Image();
        await new Promise((resolve) => {
          secondImage.onload = () => {
            resolve(secondImage);
          }
          if (Number(nftType) == NFTType.Normal) {
            secondImage.src = currentMainnetOrTestnetAttrs[chainAttrsIndex].logo;
          } else {
            secondImage.src = utbetsLogoInNFT;
          }
        })

        const canvas = document.createElement('canvas')
        canvas.width = nftImageWidth
        canvas.height = nftImageHeight
        const ctx = canvas.getContext('2d')

        if (ctx) {
          ctx.drawImage(baseImage, 0, 0, nftImageWidth, nftImageHeight);
          ctx.drawImage(secondImage, 253, 631, 20, 20);
          const opts = {
            errorCorrectionLevel: 'L',
            type: 'image/png',
            margin: 1,
            color: {
              dark: '#FFFFFFFF',
              light: '#FFFFFF00',
            },
          }

          const qr = await QRCode.toDataURL(
            `{
              type: ${getNFTTypeString(Number(nftType))},
              date: ${getFormattedDateString(new Date(), '-')},
              eventID: ${eventID},
              roundID: ${roundLevel},
              totalPlayers: ${totalPlayers},
              currentPlayers: ${numberOfWinnersOfThisRound},
            }`,
            opts
          )

          const qrImage = new Image()
          await new Promise((resolve) => {
            qrImage.onload = () => resolve(qrImage)
            qrImage.src = qr
          })

          ctx.drawImage(qrImage, 280, 560, 60, 60);

          ctx.fillStyle = 'white'
          ctx.font = '14px Nunito'
          ctx.fillText('Remaining Players:', 220, 520)

          ctx.font = 'bold 14px Nunito'
          ctx.fillText(`${numberOfWinnersOfThisRound}/${totalPlayers}`, 290, 540)

          ctx.font = '14px Nunito'
          ctx.fillText(
            getFormattedDateString(new Date(), '.').slice(2),
            30,
            645
          );

          switch (Number(nftType)) {
            case NFTType.Normal:
              ctx.drawImage(secondImage, 253, 631, 20, 20);
              ctx.fillText(
                (newChainAttrs as any)[chainId].name,
                282,
                645
              )
              break;

            case NFTType.UTBETS:
              ctx.drawImage(secondImage, 253, 631, 20, 20);
              ctx.fillText(
                'UTBETS',
                282,
                645
              )
              break;

            case NFTType.Warrior:
              ctx.font = '20px Kautiva-Caps-Black'
              ctx.fillText(
                'Warrior',
                282,
                645
              )
              break;
          }

          const dataURL = canvas.toDataURL('image/png')
          setImage(dataURL)
        }
      }
    }

    if (e.target.files[0]) {
      render.readAsDataURL(e.target.files[0])
    }

    setNftSetStatus(NftSetStatus.ImageRead);
  }

  const uploadToPinata = async () => {
    if (nftSetStatus != NftSetStatus.ImageRead) return;
    const result = await axios.post('/api/pinata/uploadNFT', {
      image: image,
      nftType: Number(nftType),
      eventID: eventID,
      roundLevel: roundLevel,
    })

    console.log('result: ', result);
    setMetadataUrl(result.data?.hash)
    setNftSetStatus(NftSetStatus.UploadToPinata);
    onOpenUploadToPinataSuccessAnnounceModal();
  }



  const handleSetRoundNFTURI = async () => {
    if (nftSetStatus != NftSetStatus.UploadToPinata) return;
    setIsLoading(true)
    const res = await setRoundNFTURI(
      Number(nftType),
      eventID,
      roundLevel,
      metadataUrl,
      chain?.id ?? 0
    );

    if (res)
      onOpenWinnerNFTSetSuccessAnnounceModal();
    
    setIsLoading(false)
  }

  const handleAddRound = async () => {
    if (selectedDate.getTime() <= Date.now() + secondsInHalfHour * 1000) {
      toast.warn('Event start time should be at least 30 mins after')
      return
    }

    if (description == '') {
      toast.warn('Please type in the form')
      return
    }

    setIsLoading(true)
    try {
      const res = await addRound(
        eventID,
        description,
        Math.round(selectedDate.getTime() / 1000),
        chain?.id ?? 0,
        isNativeToken
      )
      if (res)
        onOpenAddRoundSuccessAnnounceModal()
    } catch (err) {
      console.log('error in add round: ', err)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (isOpen == true) {
      let weeks = document.getElementsByClassName('react-datepicker__week')
      setTimeout(() => {
        let oldWeek = true
        let oldDate = true

        if (
          document.getElementsByClassName('react-datepicker__day--today').length
        ) {
          for (
            let weekIndex = 0;
            weekIndex < weeks.length - 1, oldWeek;
            weekIndex++
          ) {
            const today = weeks[weekIndex].getElementsByClassName(
              'react-datepicker__day--today'
            )[0]
            const currentWeek = weeks[weekIndex]
            const weekDays = currentWeek.getElementsByClassName(
              'react-datepicker__day'
            )

            //@ts-ignore
            for (
              let weekDayIndex = 0;
              weekDayIndex < 7 && oldDate;
              weekDayIndex++
            ) {
              if (weekDays[weekDayIndex] == today) {
                oldDate = false
                oldWeek = false
              } else {
                weekDays[weekDayIndex].setAttribute(
                  'style',
                  'color: #B7B7B7 !important'
                )
              }
            }
          }
        }
      }, 10)
    }
  }, [isOpen, shouldRender])

  return (
    <Flex
      className="add-round-modal-wrapper-in-sbc"
      bg={'#1F1F1F'}
      borderRadius={'15px'}
    >
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose()
          setImage('')
          setDescription('')
          setSelectedDate(new Date())
        }}
      >
        {' '}
        <ModalOverlay
          bg="blackAlpha.10"
          backdropFilter="blur(10px) hue-rotate(10deg)"
        />
        <ModalContent
          className="add-round-modal-content"
          width={'auto'}
          border={'1px solid white'}
        >
          <ModalCloseButton />
          <ModalBody
            py={'60px'}
            px={['20px', '60px']}
            className="add-round-modal-body"
          >
            <Flex
              fontFamily={'Nunito'}
              fontWeight={'700'}
              fontSize={'22px'}
              lineHeight={'30px'}
              color={'white'}
              textTransform={'capitalize'}
              className="title"
            >
              Set the Round {roundLevel} Details
            </Flex>

            <Flex
              direction={['column']}
              mt={['30px']}
              mb={['20px']}
              gap={['10px']}
            >
              <Flex
                fontFamily={'Nunito'}
                fontWeight={'700'}
                fontSize={'22px'}
                lineHeight={'30px'}
                color={'white'}
                textTransform={'capitalize'}
              >
                Winner Round {roundLevel} NFT
              </Flex>

              <Flex
                fontFamily={'Nunito'}
                fontWeight={'700'}
                fontSize={'16px'}
                lineHeight={'30px'}
                color={'white'}
                textTransform={'capitalize'}
                className='title'
                mt={['20px']}
              >
                Select NFT Type
              </Flex>

              <RadioGroup
                mt={'10px'}
                onChange={setNftType}
                value={nftType}
              >
                <Stack direction='row'>
                  <Radio value='0' fontFamily={'Nunito'}>Native</Radio>
                  <Radio value='1' fontFamily={'Nunito'}>Utbets</Radio>
                  <Radio value='2' fontFamily={'Nunito'}>Warrior</Radio>
                </Stack>
              </RadioGroup>
              <Flex
                className="winner-nft-image-wrapper"
                border={'1px solid white'}
                position={['relative']}
                height={['667px']}
                direction={['column']}
              >
                <img src={image} className="nft-image" />
                <Flex
                  position={['absolute']}
                  height={['250px']}
                  alignItems={['center']}
                  left={['50%']}
                  top={['50%']}
                  transform={['translate(-50%, -50%)']}
                >
                  <Input
                    type={'file'}
                    onChange={handleImageOpen}
                    border={['none']}
                  />
                </Flex>
              </Flex>
            </Flex>

            <Flex
              className="round-description-wrapper"
              direction={'column'}
              mt={'32px'}
            >
              <Flex
                fontFamily={'Nunito'}
                fontWeight={'700'}
                fontSize={'22px'}
                lineHeight={'30px'}
                color={'white'}
                textTransform={'capitalize'}
              >
                Round {roundLevel} Description
              </Flex>
              <Input
                value={description}
                variant="flushed"
                borderBottom={'2px solid #739AF0 !important'}
                onChange={(e) => setDescription(e.target.value)}
                fontFamily={'Nunito'}
                _focusVisible={{
                  boxShadow: 'none',
                }}
              />
            </Flex>

            <Flex
              className="event-start-time-picker-wrapper-in-admin-page"
              direction={'column'}
              mt={'46px'}
            >
              <Flex
                fontFamily={'Nunito'}
                fontWeight={'700'}
                fontSize={'22px'}
                lineHeight={'30px'}
                color={'white'}
                textTransform={'capitalize'}
                mb={'20px'}
              >
                Round {roundLevel} start time
              </Flex>
              <DatePicker
                selected={selectedDate}
                onMonthChange={() => setShouldRender(!shouldRender)}
                onChange={(date: Date) => {
                  setSelectedDate(date)
                  setShouldRender(!shouldRender)
                }}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
                showPopperArrow={false}
              />
            </Flex>

            <Flex
              direction={'column'}
            >
              <Button
                border={'1px solid #FC541C'}
                borderRadius={'45px'}
                px={'28px'}
                py={'7px'}
                mt={'30px'}
                onClick={() => uploadToPinata()}
                fontFamily={'Nunito'}
                fontSize={'14px'}
                lineHeight={'19px'}
                cursor={'pointer'}
                width={'fit-content'}
                isDisabled={nftSetStatus == NftSetStatus.Original}
                background={'transparent'}
              >
                Upload To Pinata
              </Button>


              <Button
                border={'1px solid #FC541C'}
                borderRadius={'45px'}
                px={'28px'}
                py={'7px'}
                mt={'30px'}
                onClick={() => handleSetRoundNFTURI()}
                fontFamily={'Nunito'}
                fontSize={'14px'}
                lineHeight={'19px'}
                cursor={'pointer'}
                width={'fit-content'}
                isDisabled={nftSetStatus < NftSetStatus.UploadToPinata}
                background={'transparent'}
              >
                Set Winner NFT
              </Button>

              <Button
                border={'1px solid #FC541C'}
                borderRadius={'45px'}
                px={'28px'}
                py={'7px'}
                mt={'30px'}
                onClick={() => handleAddRound()}
                fontFamily={'Nunito'}
                fontSize={'14px'}
                lineHeight={'19px'}
                cursor={'pointer'}
                width={'fit-content'}
                background={'transparent'}
              // isDisabled={nftSetStatus < NftSetStatus.WinnerNFTSet}
              >
                Add Round {roundLevel}
              </Button>
            </Flex>

          </ModalBody>
        </ModalContent>
      </Modal>
      <AnnounceModal
        isOpenAnnounceModal={isOpenUploadToPinataSuccessAnnounceModal}
        onCloseAnnounceModal={onCloseUploadToPinataSuccessAnnounceModal}
        announceText={`Upload to pinata has been successfully done`}
        announceLogo={checkIconInGreenBg}
        announceModalButtonText={'Close'}
      />
      <AnnounceModal
        isOpenAnnounceModal={
          isOpenWinnerNFTSetSuccessAnnounceModal
        }
        onCloseAnnounceModal={onCloseWinnerNFTSetSuccessAnnounceModal}
        announceText={`Winner NFT has been successfully added`}
        announceLogo={checkIconInGreenBg}
        announceModalButtonText={'Close'}
        announceModalButtonAction={() => {
          onCloseWinnerNFTSetSuccessAnnounceModal();
          setNftSetStatus(NftSetStatus.WinnerNFTSet);
        }}
      />
      <AnnounceModal
        isOpenAnnounceModal={
          isOpenAddRoundSuccessAnnounceModal
        }
        onCloseAnnounceModal={onCloseAddRoundSuccessAnnounceModal}
        announceText={`New Round has been successfully added`}
        announceLogo={checkIconInGreenBg}
        announceModalButtonText={'Close'}
        announceModalButtonAction={() => {
          onCloseAddRoundSuccessAnnounceModal();
          onClose()
          setDescription('')
          setSelectedDate(new Date())
          setNftSetStatus(NftSetStatus.Original);
          setImage('');
        }}
      />
      <AnnounceModal
        isOpenAnnounceModal={
          isLoading
        }
        onCloseAnnounceModal={() => setIsLoading(false)}
        announceText={'Your transaction is currently processing on the blockchain'}
        announceGif={true}
        announceModalButtonText={'Close'}
      />
    </Flex>
  )
}

export default AddRoundModal
