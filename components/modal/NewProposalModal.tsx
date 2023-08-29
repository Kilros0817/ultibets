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
import snapshot from '@snapshot-labs/snapshot.js';
import React, { useState, useEffect } from 'react'
// @ts-ignore
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { toast } from 'react-toastify'
import { useBlockNumber, } from 'wagmi'
import AnnounceModal from './AnnounceModal'
import { secondsInDay } from '../../utils/config'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { ethers } from 'ethers'
import { checkIconInGreenBg } from '../../utils/assets'

type NewProposalModalProps = {
  isOpen: boolean
  onClose: () => void
}

const hub = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ?
  'https://hub.snapshot.org' : 'https://testnet.snapshot.org';
const client = new snapshot.Client712(hub);

const NewProposalModal = ({
  isOpen,
  onClose,
}: NewProposalModalProps) => {
  const [shouldRender, setShouldRender] = useState(true)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date(Date.now() + secondsInDay * 3 * 1000))
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [discussion, setDiscussion] = useState<string>('')
  const [image, setImage] = useState<any>()
  const [choices, setChoices] = useState<any>(['']);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const {
    isOpen: isOpenSubmitProposalAnnounceModal,
    onOpen: onOpenSubmitProposalAnnounceModal,
    onClose: onCloseSubmitProposalAnnounceModal,
  } = useDisclosure();

  // const handleImageOpen = (e: any) => {
  //   const render = new FileReader()

  //   render.onload = async () => {
  //     if (render.readyState === 2) {
  //       const baseImage = new Image()
  //       await new Promise((resolve) => {
  //         baseImage.onload = () => {
  //           resolve(baseImage);
  //         }
  //         baseImage.src = render.result ? render.result.toString() : ''
  //       })

  //       const secondImage = new Image();
  //       await new Promise((resolve) => {
  //         secondImage.onload = () => {
  //           resolve(secondImage);
  //         }
  //         if (Number(nftType) == NFTType.Normal) {
  //           secondImage.src = currentMainnetOrTestnetAttrs[chainAttrsIndex].logo;
  //         } else {
  //           secondImage.src = utbetsLogoInNFT;
  //         }
  //       })

  //       const canvas = document.createElement('canvas')
  //       canvas.width = nftImageWidth
  //       canvas.height = nftImageHeight
  //       const ctx = canvas.getContext('2d')

  //       if (ctx) {
  //         ctx.drawImage(baseImage, 0, 0, nftImageWidth, nftImageHeight);
  //         ctx.drawImage(secondImage, 253, 631, 20, 20);
  //         const opts = {
  //           errorCorrectionLevel: 'L',
  //           type: 'image/png',
  //           margin: 1,
  //           color: {
  //             dark: '#FFFFFFFF',
  //             light: '#FFFFFF00',
  //           },
  //         }

  //         const qr = await QRCode.toDataURL(
  //           `{
  //             type: ${getNFTTypeString(Number(nftType))},
  //             date: ${getFormattedDateString(new Date(), '-')},
  //             eventID: ${eventID},
  //             roundID: ${roundLevel},
  //             totalPlayers: ${totalPlayers},
  //             currentPlayers: ${playersInThisPhase},
  //           }`,
  //           opts
  //         )

  //         const qrImage = new Image()
  //         await new Promise((resolve) => {
  //           qrImage.onload = () => resolve(qrImage)
  //           qrImage.src = qr
  //         })

  //         ctx.drawImage(qrImage, 280, 560, 60, 60);

  //         ctx.fillStyle = 'white'
  //         ctx.font = '14px Nunito'
  //         ctx.fillText('Remaining Players:', 220, 520)

  //         ctx.font = 'bold 14px Nunito'
  //         ctx.fillText(`${playersInThisPhase}/${totalPlayers}`, 290, 540)

  //         ctx.font = '14px Nunito'
  //         ctx.fillText(
  //           getFormattedDateString(new Date(), '.').slice(2),
  //           30,
  //           645
  //         );

  //         switch (Number(nftType)) {
  //           case NFTType.Normal:
  //             ctx.drawImage(secondImage, 253, 631, 20, 20);
  //             ctx.fillText(
  //               (newChainAttrs as any)[chainId].name,
  //               282,
  //               645
  //             )
  //             break;

  //           case NFTType.UTBETS:
  //             ctx.drawImage(secondImage, 253, 631, 20, 20);
  //             ctx.fillText(
  //               'UTBETS',
  //               282,
  //               645
  //             )
  //             break;

  //           case NFTType.Warrior:
  //             ctx.font = '20px Kautiva-Caps-Black'
  //             ctx.fillText(
  //               'Warrior',
  //               282,
  //               645
  //             )
  //             break;
  //         }

  //         const dataURL = canvas.toDataURL('image/png')
  //         setImage(dataURL)
  //       }
  //     }
  //   }

  //   if (e.target.files[0]) {
  //     render.readAsDataURL(e.target.files[0])
  //   }

  //   setNftSetStatus(NftSetStatus.ImageRead);
  // }

  // const uploadToPinata = async () => {
  //   if (nftSetStatus != NftSetStatus.ImageRead) return;
  //   const result = await axios.post('/api/pinata/uploadNFT', {
  //     image: image,
  //     nftType: Number(nftType),
  //     eventID: eventID,
  //     roundLevel: roundLevel,
  //   })

  //   console.log('result: ', result);
  //   setMetadataUrl(result.data?.hash)
  //   onOpenUploadToPinataSuccessAnnounceModal();
  // }

  const updateIthChoiceLabel = (index: number, ithChoiceLabel: string) => {
    let newChoices = choices;
    newChoices[index] += ithChoiceLabel;
    console.log("new choices: ", newChoices);
    setChoices(newChoices);
  }

  const handleSubmitProposal = async () => {
    if (title == '') {
      toast.error('Please type title');
      return;
    }
    if (endDate <= startDate) {
      toast.error('Please select end date correctly');
      return;
    }
    if (choices.find((item: string) => item == '') !== undefined) {
      toast.error('Please type choices correctly');
      return;
    }

    const web3 = new ethers.providers.Web3Provider((window as any).ethereum);
    const [account] = await web3.listAccounts();
    const blockNumber = await (new ethers.providers.JsonRpcProvider('https://ethereum.publicnode.com')).getBlockNumber();

    try {
      setIsProcessing(true);
      let receipt = await client.proposal(web3, account, {
        space: process.env.NEXT_PUBLIC_SPACE_NAME ?? '1.eth',
        type: 'single-choice', // define the voting system
        title: title,
        body: description,
        choices: choices,
        start: Math.round(startDate.getTime() / 1000),
        end: Math.round(endDate.getTime() / 1000),
        snapshot: blockNumber,
        discussion: discussion,
        plugins: JSON.stringify({}),
        app: 'snapshot' // provide the name of your project which is using this snapshot.js integration
      });
      console.log({ receipt });
      onOpenSubmitProposalAnnounceModal();
    } catch (e) {
      console.log("error happened in submitting a proposal: ", e);
      toast.error('Unfortunately submitting your proposal was failed. Please try again');
    }

    setIsProcessing(false);
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
      className="new-proposal-modal-wrapper"
      bg={'#1F1F1F'}
      borderRadius={'15px'}
    >
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose()
          setImage('')
          setTitle('')
          setDescription('')
          setDiscussion('')
          setStartDate(new Date())
          setEndDate(new Date(Date.now() + secondsInDay * 3 * 1000))
          setChoices([''])
        }}
      >
        {' '}
        <ModalOverlay
          bg="blackAlpha.10"
          backdropFilter="blur(10px) hue-rotate(10deg)"
        />
        <ModalContent
          className="new-proposal-modal-content"
          width={'auto'}
          border={'1px solid white'}
        >
          <ModalCloseButton />
          <ModalBody
            py={'60px'}
            px={['20px', '60px']}
            className="new-proposal-modal-body"
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
              New Proposal Modal
            </Flex>

            <Flex
              direction={['column']}
              mt={['10px']}
              mb={['20px']}
              gap={['10px']}
            >
              <Flex
                className="proposal-title-wrapper"
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
                  Title
                </Flex>
                <Input
                  value={title}
                  variant="flushed"
                  borderBottom={'2px solid #739AF0 !important'}
                  onChange={(e) => setTitle(e.target.value)}
                  fontFamily={'Nunito'}
                  _focusVisible={{
                    boxShadow: 'none',
                  }}
                />
              </Flex>

              <Flex
                className="proposal-description-wrapper"
                direction={'column'}
                mt={'10px'}
              >
                <Flex
                  fontFamily={'Nunito'}
                  fontWeight={'700'}
                  fontSize={'22px'}
                  lineHeight={'30px'}
                  color={'white'}
                  textTransform={'capitalize'}
                >
                  Description
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
                className="proposal-discussion-wrapper"
                direction={'column'}
                mt={'10px'}
              >
                <Flex
                  fontFamily={'Nunito'}
                  fontWeight={'700'}
                  fontSize={'22px'}
                  lineHeight={'30px'}
                  color={'white'}
                  textTransform={'capitalize'}
                >
                  Discussion
                </Flex>
                <Input
                  value={discussion}
                  placeholder={'https://'}
                  variant="flushed"
                  borderBottom={'2px solid #739AF0 !important'}
                  onChange={(e) => setDiscussion(e.target.value)}
                  fontFamily={'Nunito'}
                  _focusVisible={{
                    boxShadow: 'none',
                  }}
                />
              </Flex>

              {/* <Flex
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
              </RadioGroup> */}

              {/* <Flex
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
              </Flex> */}
            </Flex>

            <Flex
              className="event-start-time-picker-wrapper-in-admin-page"
              direction={'column'}
              mt={'30px'}
            >
              <Flex
                fontFamily={'Nunito'}
                fontWeight={'700'}
                fontSize={'22px'}
                lineHeight={'30px'}
                color={'white'}
                textTransform={'capitalize'}
                mb={'10px'}
              >
                Start time
              </Flex>
              <DatePicker
                selected={startDate}
                onMonthChange={() => setShouldRender(!shouldRender)}
                onChange={(date: Date) => {
                  setStartDate(date)
                  setShouldRender(!shouldRender)
                }}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
                showPopperArrow={false}
              />

              <Flex
                fontFamily={'Nunito'}
                fontWeight={'700'}
                fontSize={'22px'}
                lineHeight={'30px'}
                color={'white'}
                textTransform={'capitalize'}
                mt={'20px'}
                mb={'10px'}
              >
                End time
              </Flex>
              <DatePicker
                selected={endDate}
                onMonthChange={() => setShouldRender(!shouldRender)}
                onChange={(date: Date) => {
                  setEndDate(date)
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
              className='choices'
              gap={'10px'}
              mt={'30px'}
            >
              <Flex
                fontFamily={'Nunito'}
                fontWeight={'700'}
                fontSize={'22px'}
                lineHeight={'30px'}
                color={'white'}
                textTransform={'capitalize'}
              >
                Choices
              </Flex>

              {
                choices.map((item: string, index: number) => (
                  <Flex
                    key={index}
                  >
                    <Input
                      value={item}
                      placeholder={`Choice ${index + 1}`}
                      variant="flushed"
                      borderBottom={'2px solid #739AF0 !important'}
                      onChange={(e) => updateIthChoiceLabel(index, e.target.value)}
                      fontFamily={'Nunito'}
                      _focusVisible={{
                        boxShadow: 'none',
                      }}
                    />

                    <Flex
                      direction={'column'}
                      justifyContent={'center'}
                      onClick={index == choices.length - 1 ? () => { setChoices([...choices, '']) } : () => { }}
                      display={index == choices.length - 1 ? 'flex' : 'none'}
                      cursor={'pointer'}
                    >
                      <AiOutlinePlusCircle />
                    </Flex>
                  </Flex>
                ))
              }

            </Flex>

            <Button
              border={'1px solid #FC541C'}
              borderRadius={'45px'}
              px={'28px'}
              py={'7px'}
              mt={'30px'}
              onClick={() => handleSubmitProposal()}
              fontFamily={'Nunito'}
              fontSize={'14px'}
              color={'white'}
              lineHeight={'19px'}
              cursor={'pointer'}
              width={'fit-content'}
              background={'transparent'}
            >
              Confirm Proposal
            </Button>

          </ModalBody>
        </ModalContent>
      </Modal>
      {/* <AnnounceModal
        isOpenAnnounceModal={
          isOpenAddRoundSuccessAnnounceModal && addRound.isSuccess
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
          (isOpenAddRoundSuccessAnnounceModal && addRound.isLoading) ||
          (isOpenWinnerNFTSetSuccessAnnounceModal && setRoundNFTURI.isLoading)
        }
        onCloseAnnounceModal={onCloseAddRoundSuccessAnnounceModal}
        announceText={'Your transaction is currently processing on the blockchain'}
        announceGif={true}
        announceModalButtonText={'Close'}
      /> */}
      <AnnounceModal
        isOpenAnnounceModal={isProcessing}
        onCloseAnnounceModal={onCloseSubmitProposalAnnounceModal}
        announceText={'Your proposal is in processing'}
        announceGif={true}
        announceModalButtonText={'Close'}
      />
      <AnnounceModal
        isOpenAnnounceModal={isOpenSubmitProposalAnnounceModal && !isProcessing}
        onCloseAnnounceModal={onCloseSubmitProposalAnnounceModal}
        announceText={'Your proposal was successfully submitted.'}
        announceLogo={checkIconInGreenBg}
        announceModalButtonText={'Close'}
      />
    </Flex>
  )
}

export default NewProposalModal
