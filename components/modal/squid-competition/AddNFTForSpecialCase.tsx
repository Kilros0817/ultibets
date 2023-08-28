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
import { NftSetStatus, chainAttrs, mumbaiChainId, nftImageHeight, nftImageWidth, NFTType, polygonChainId, RoundStateInSBC, secondsInHalfHour, newChainAttrs } from '../../../utils/config'
import { checkIconInGreenBg, utbetsLogoInNFT } from '../../../utils/assets'
import AnnounceModal from '../AnnounceModal'
import { getFormattedDateString } from '../../../utils/formatters'
import { getNFTTypeString } from '../../../utils/interact/utility'
import { setRoundNFTURI } from '../../../utils/interact/sc/sbcNFT'
import { useNetwork } from 'wagmi'
import { useChainContext } from '../../../utils/Context'

type AddNFTForSpecialCaseProps = {
  isOpen: boolean
  onClose: () => void
  eventID: number
  roundLevel: number
  totalPlayers: number
  playersInThisPhase: number
  nftSetStatus: NftSetStatus
  setNftSetStatus: (addRoundStatu: NftSetStatus) => void
  callback?: () => void
}

const AddNFTForSpecialCase = ({
  isOpen,
  onClose,
  eventID,
  roundLevel,
  totalPlayers,
  playersInThisPhase,
  nftSetStatus,
  setNftSetStatus,
  callback,
}: AddNFTForSpecialCaseProps) => {
  const [image, setImage] = useState<any>()
  const { isNativeToken } = useChainContext();
  const [nftType, setNftType] = useState<string>('0');
  const [metadataUrl, setMetadataUrl] = useState<string>('');
  const { chain, } = useNetwork();
  const [currentMainnetOrTestnetAttrs,] = useState(
    process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
  const [chainAttrsIndex, setChainAttrsIndex] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
      process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId; let currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == chainId);
    if (currentChainAttrsItem.length == 0) {
      const temporaryChainId = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? 137 : 80001
      currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == temporaryChainId);
    }
    setChainAttrsIndex(currentChainAttrsItem[0].index)
  }, [chain]);

  useEffect(() => {
    setNftType(isNativeToken ? '0' : '1');
  }, [isNativeToken])

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
              round: ${roundLevel > 0 ? `Round ${roundLevel}` : `Final Winner`},
              totalPlayers: ${totalPlayers},
              currentPlayers: ${playersInThisPhase},
            }`,
            //   `{
            //   eventID: ${eventID},
            // }`,
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
          ctx.fillText(`${playersInThisPhase}/${totalPlayers}`, 290, 540)

          ctx.font = '14px Nunito'
          ctx.fillText(
            getFormattedDateString(new Date(), '.').slice(2),
            30,
            645
          );

          switch (Number(nftType)) {
            case NFTType.Normal:
              ctx.drawImage(secondImage, 260, 632, 15, 15);
              ctx.fillText(
                currentMainnetOrTestnetAttrs[chainAttrsIndex].name,
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
              ctx.font = '26px Kautiva-Caps-Black'
              ctx.fillText(
                'Warrior',
                249,
                647
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
    setIsLoading(true)
    const result = await axios.post('/api/pinata/uploadNFT', {
      image: image,
      nftType: Number(nftType),
      eventID: eventID,
      roundLevel: roundLevel,
    })

    setMetadataUrl(result.data?.hash)
    setNftSetStatus(NftSetStatus.UploadToPinata);
    setIsLoading(false);
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
    if (res) {
      onOpenWinnerNFTSetSuccessAnnounceModal();
      onClose();
    }
    setIsLoading(false);
  }

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
              Set the Winner Round NFT
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
              direction={['column']}
              mt={['10px']}
              mb={['20px']}
              gap={['10px']}
            >
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
                isDisabled={nftSetStatus < NftSetStatus.ImageRead}
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
        isOpenAnnounceModal={isLoading}
        onCloseAnnounceModal={() => setIsLoading(true)}
        announceText={'Your transaction is currently processing.'}
        announceGif={true}
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
          onClose();
          setNftSetStatus(NftSetStatus.WinnerNFTSet);
          callback ? callback() : {};
        }}
      />
    </Flex>
  )
}

export default AddNFTForSpecialCase
