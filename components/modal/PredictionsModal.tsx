import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useAccount, useNetwork, useBalance, useSigner, } from 'wagmi';
import PredictionsModalBody from './PredictionsModalBody';
import { chainRPCs, contractAddressesInDailyBets, contractAddressesInSBC, mumbaiChainId, newChainAttrs, polygonChainId, utbetsTokenAddresses } from '../../utils/config';
import FinalModal from './FinalModal';
import { placeBetInPM, placeBetUsingPerk, } from '../../utils/interact/sc/prediction-markets';
import { placeBetInSBC } from '../../utils/interact/sc/squid-competition';
import { useRouter } from 'next/router';
import { useChainContext } from '../../utils/Context';
import Account from '../Account';
import AnnounceModal from './AnnounceModal';
import { convertBetValue2Number } from '../../utils/interact/utility';
import axios from 'axios';
import { PerkInfo } from '../../utils/types';
import { getAllowance, utbetsApprove } from '../../utils/interact/sc/utbets';
import { checkIconInGreenBg, UltiBetsTokenAbi } from '../../utils/assets';
import { toast } from 'react-toastify';
import { BigNumberish, ethers } from 'ethers';
const crossIconInRedBg = "/images/svgs/modal/cross-icon-in-red-bg.svg";

export type PredictionsModalProps = {
  isOpenSecond: boolean,
  onCloseSecond(): void,
  isOpenThird: boolean,
  onOpenThird(): void,
  onCloseThird(): void,
  type: string,
  summary?: any,
  roundBetAmount?: number // for sbc
  yesPoolAmount?: number // for sbc
  noPoolAmount?: number // for sbc
  registerID?: number // for sbc
  currentPlayers?: number // for sbc
  canBeInvited?: boolean // for pm
}

const PredictionsModal = ({
  isOpenSecond,
  onCloseSecond,
  isOpenThird,
  onOpenThird,
  onCloseThird,
  type,
  summary,
  roundBetAmount,
  yesPoolAmount,
  noPoolAmount,
  registerID,
  currentPlayers,
  canBeInvited,
}: PredictionsModalProps) => {
  const router = useRouter();
  const [eventID, setEventID] = useState<number>();
  const { chain, } = useNetwork();
  const { data: signer } = useSigner();
  const {
    isNativeToken,
    prediction,
    sbc,
    referral,
  } = useChainContext();
  const [newBetAmount, setNewBetAmount] = useState<number | null>(null);
  const [currentSports, setCurrentSports] = useState('soccer');
  const [betValueNumber, setBetValueNumber] = useState(0);
  const { address, } = useAccount();
  const [signature, setSignature] = useState<string>('');
  const [isPerks, setIsPerks] = useState<string>('false');
  const [chainId, setChainId] = useState<number>(polygonChainId);
  const [isApprovedUtbets, setIsApprovedUtbets] = useState<boolean>(false);
  const [perkInfo, setPerkInfo] = useState<PerkInfo>({
    perkLevel: 1,
    count: 0,
  })

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    isOpen: isOpenApproveSuccessAnnounceModal,
    onOpen: onOpenApproveSuccessAnnounceModal,
    onClose: onCloseApproveSuccessAnnounceModal,
  } = useDisclosure();
  const {
    isOpen: isOpenAnnounceModal,
    onOpen: onOpenAnnounceModal,
    onClose: onCloseAnnounceModal,
  } = useDisclosure();

  const getApproval = async () => {
    const allowance = await getAllowance((utbetsTokenAddresses as any)[Number(chain?.id)], address, type == 'prediction' ? (contractAddressesInDailyBets as any)[Number(chain?.id)][1] : (contractAddressesInSBC as any)[Number(chain?.id)][1]);
    const amount = Number(ethers.utils.formatEther(allowance as BigNumberish));
    const betAmount = type == 'prediction' ? newBetAmount : roundBetAmount
    if (amount >= (betAmount ?? 0)) {
      setIsApprovedUtbets(true)
      await getSignature();
    }
    else setIsApprovedUtbets(false);
  }

  useEffect(() => {
    const initApproval = async () => {
      await getApproval();
    }
    if (!isNativeToken && chain?.id) {
      initApproval();
    }
  }, [newBetAmount, address])

  useEffect(() => {
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
      process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;
    setChainId(chainId);
  }, [chain])

  useEffect(() => {
    const pathName = router.asPath;
    const slug = pathName.split('/');
    if (slug[2]) {
      setCurrentSports(slug[2]);
    }

    if (slug && slug.length == 4) {
      let cardId = type == "prediction" ? slug[3] : slug[2];
      if (isNaN(parseInt(cardId))) {
        console.log("cardId")
        cardId = '1';
      }
      setEventID(parseInt(cardId));
    }
  }, [router]);

  useEffect(() => {
    let side;
    if (type == 'prediction') {
      side = prediction.sideToPredict[currentSports];

    } else if (type == 'sbc') {
      side = sbc.sideToPredict;
    }
    const betValueNumber = convertBetValue2Number(type, side);
    setBetValueNumber(betValueNumber);
  }, [type, prediction, sbc])

  const { data: balanceOfNativeTokenInWallet } = useBalance({
    address: address,
  })

  const handlePlaceBetUsingPerk = async () => {
    if (isNativeToken) return;
    if (isPerks == "false") return;
    if ((perkInfo as any).count == 0) {
      toast.error('Please select exact perk');
      return;
    }

    setIsLoading(true)
    try {
      const result = await placeBetUsingPerk(eventID ?? 1,
        betValueNumber,
        perkInfo.perkLevel,
        chain?.id ?? 0)

      if (result)
        onOpenThird();
      setIsLoading(false)

    } catch (err) {
      setIsLoading(false)

      console.log('error in place bet: ', err);
    }
  }

  const handleApproveUtbets = async () => {
    if (isNativeToken) return;
    if (((type == 'prediction' ? newBetAmount : roundBetAmount) ?? 0) == 0) {
      toast.error('Please input amount at first');
      return;
    }

    setIsLoading(true)
    try {
      const result = await utbetsApprove((utbetsTokenAddresses as any)[chainId],
        type == 'prediction' ? (contractAddressesInDailyBets as any)[chainId][1] : (contractAddressesInSBC as any)[chainId][1],
        ((type == 'prediction' ? newBetAmount : roundBetAmount) ?? 0)?.toString())

      if (result) {
        onOpenApproveSuccessAnnounceModal();
        await getSignature();
      }
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      console.log('error in approve utbets token: ', err);
    }
  }

  const handleNonPerkPredictInPM = async () => {
    if (newBetAmount == 0) return;
    if (isPerks == "true") return;

    if (isNativeToken) {
      if ((newBetAmount ?? 0) > parseFloat(balanceOfNativeTokenInWallet?.formatted ?? '0')) {
        onOpenAnnounceModal();
        return;
      }
    } else {
      const tokenAddress = (utbetsTokenAddresses as any)[chainId];
      const contract = new ethers.Contract(tokenAddress, UltiBetsTokenAbi, (signer?.provider as any)?.getSigner());
      const balanceOfUtbets = await contract.balanceOf(address);

      if ((newBetAmount ?? 0) > parseFloat(ethers.utils.formatEther(balanceOfUtbets))) {
        onOpenAnnounceModal();
        return;
      }
    }

    setIsLoading(true);
    try {
      const result = await placeBetInPM(eventID ?? 1,
        betValueNumber,
        newBetAmount ?? 0,
        isNativeToken ? '' : canBeInvited ? window.atob(referral) : address!,
        isNativeToken ? '' : signature,
        address,
        chain?.id ?? 0,
        isNativeToken
      )

      if (result) {
        onOpenThird();

      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false)
      console.log('error in place bet: ', err);
    }
  }

  const getSignature = async () => {
    try {
      const data = {
        chainId: chain?.id ?? 0,
        //@ts-ignore
        rpc: chainRPCs[chain?.id ?? mumbaiChainId],
        eventID: eventID,
        bettor: (canBeInvited && referral != '') ? window.atob(referral) : address,
      };

      console.log("data: ", data);

      const result = await axios.post(
        '/api/createSignature',
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("signature creation result: ", result);

      if ((result as any).data.isSuccess) {
        console.log("sinature:  ", (result as any).data.signature)
        setSignature((result as any).data.signature)
      }
    } catch (err) {
      console.log('error in creating signature: ', err);
    }
  }


  const handlePredictInSBC = async () => {

    setIsLoading(true);

    if (isNativeToken) {
      if ((roundBetAmount ?? 0) > parseFloat(balanceOfNativeTokenInWallet?.formatted ?? '0')) {
        onOpenAnnounceModal();
        return;
      }
    } else {
      const tokenAddress = (utbetsTokenAddresses as any)[chainId];
      const contract = new ethers.Contract(tokenAddress, UltiBetsTokenAbi, new ethers.providers.StaticJsonRpcProvider((chainRPCs as any)[chainId]));
      const balanceOfUtbets = await contract.balanceOf(address);
      const numberOfBalanceOfUtbetsToken = Number(ethers.utils.formatEther(balanceOfUtbets));

      if ((roundBetAmount ?? 0) > numberOfBalanceOfUtbetsToken) {
        onOpenAnnounceModal();
        return;
      }
    }

    try {
      const result = await placeBetInSBC(
        eventID ?? 0,
        betValueNumber,
        roundBetAmount ?? 0,
        chain?.id ?? 0,
        isNativeToken
      );
      if (result) {
        onOpenThird();
      }

      setIsLoading(false)
    } catch (err) {
      setIsLoading(false);
      console.log('error in place bet: ', err);
    }
  }

  const handlePredict = () => {
    if (!isNativeToken && isPerks == 'false' && !isApprovedUtbets) {
      return;
    }

    if (type == "prediction") {
      if (isPerks == 'true') {
        handlePlaceBetUsingPerk();
      } else {
        handleNonPerkPredictInPM();
      }
    } else {
      handlePredictInSBC();
    }
  }

  return (
    <Flex
    >
      <Modal
        isOpen={isOpenSecond}
        onClose={() => {
          onCloseSecond();
          setNewBetAmount(null);
        }}
      >
        <ModalOverlay
          bg='blackAlpha.10'
          backdropFilter='blur(10px) hue-rotate(10deg)'
        />
        <ModalContent
          border={'1px solid white'}
        >
          <ModalHeader
            height={'49px'}
          />
          <ModalCloseButton />
          <ModalBody
            px='73px'
          >
            <Flex
              justifyContent={'center'}
              alignItems={'center'}
              direction='column'
              gap='49px'
            >
              {/* <TokenSelector /> */}
              <PredictionsModalBody
                type={type}
                summary={summary} // for pm
                newBetAmount={newBetAmount}
                setNewBetAmount={setNewBetAmount}
                yesPoolAmount={yesPoolAmount} // for sbc
                noPoolAmount={noPoolAmount} // for sbc
                registerID={registerID} // for sbc
                currentPlayers={currentPlayers} // for sbc
                setIsPerks={setIsPerks}
                isPerks={isPerks}
                perkInfo={perkInfo}
                setPerkInfo={setPerkInfo}
              />
            </Flex>
          </ModalBody>
          <ModalFooter
            justifyContent={'center'}
            px='73px'
            mb='53px'
            mt='25px'
            py='0'
          >
            <Flex
              direction={'column'}
              gap={'20px'}
            >
              {
                address && !isNativeToken && isPerks == "false" && (
                  <Button
                    onClick={handleApproveUtbets}
                    height={'46px'}
                    width={'255px'}
                    background={'unset'}
                    borderRadius={'34px'}
                    border={'1px solid #FC541C'}
                    _hover={{
                      background: '#FC541C',
                    }}
                    fontSize={'20px'}
                    py='0'
                    isDisabled={isApprovedUtbets}
                  >
                    Approve
                  </Button>
                )
              }
              {
                address && (
                  <Button
                    onClick={handlePredict}
                    height={'46px'}
                    width={'255px'}
                    background={'unset'}
                    borderRadius={'34px'}
                    border={'1px solid #FC541C'}
                    _hover={{
                      background: '#FC541C',
                    }}
                    fontSize={'20px'}
                    py='0'
                    isDisabled={(isNativeToken || isPerks != 'false') ? false : !isApprovedUtbets}
                  >
                    Confirm Prediction
                  </Button>
                )
              }
              {
                !address && (
                  <Account />
                )
              }
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AnnounceModal
        isOpenAnnounceModal={isOpenApproveSuccessAnnounceModal}
        onCloseAnnounceModal={onCloseApproveSuccessAnnounceModal}
        announceText={'UTBETS successfully approved'}
        announceLogo={checkIconInGreenBg}
        announceModalButtonText={'Close'}
        announceModalButtonAction={async () => {
          await getApproval();
          onCloseApproveSuccessAnnounceModal();
        }}
      />
      <FinalModal
        isOpenThird={isOpenThird}
        onCloseSecond={() => {
          onCloseSecond();
          setIsApprovedUtbets(false);
          setSignature('');
          setNewBetAmount(null);
        }}
        onCloseThird={onCloseThird}
        type={type}
      />
      <AnnounceModal
        isOpenAnnounceModal={isOpenAnnounceModal}
        onCloseAnnounceModal={onCloseAnnounceModal}
        announceText={'You don’t have enough funds to place your prediction'}
        announceLogo={crossIconInRedBg}
        announceModalButtonText={'Close'}
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
    </Flex >
  )
}

export default PredictionsModal
