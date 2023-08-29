import {
  Flex,
  Image,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import '@fontsource/inter'
import '@fontsource/nunito'
import PlaceVoteModal from '../../../modal/PlaceVoteModal'
import Welcome from '../Welcome'
import { exclamationIconInRedBg, randomSoloWinnerButton, spliqtEquallyButton } from '../../../../utils/assets'
import { roundProperties, VotingResultInSBC } from '../../../../utils/config'
import { eventVote, getWinnerIDs, playersVoteState } from '../../../../utils/interact/sc/squid-competition'
import { useAccount, useNetwork } from 'wagmi'
import { useChainContext } from '../../../../utils/Context'
import { useRouter } from 'next/router'
import StepBar from '../../../StepBar'
import FinalWinnerAnnounceModal from '../../../modal/FinalWinnerAnnounceModal'

type FinalVoteComponentProps = {
  eventID: number
  totalAmount: number
  currentToken: string
  voteResult: VotingResultInSBC
  winnersNumber: number
  registerID: number
}

const FinalVoteComponent = ({
  eventID,
  totalAmount,
  currentToken,
  voteResult,
  winnersNumber,
  registerID,
}: FinalVoteComponentProps) => {
  const router = useRouter();
  const [option, setOption] = useState<VotingResultInSBC>(VotingResultInSBC.Indeterminate);
  const { chain, } = useNetwork();
  const { address } = useAccount();
  const { isNativeToken } = useChainContext();
  const [isAlreadyVoted, setIsAlreadyVoted] = useState<boolean>(false);
  const [splitPoint, setSplitPoint] = useState<number>(0);
  const [soloPoint, setSoloPoint] = useState<number>(0);
  const [winnerIds, setWinnerIds] = useState<number[]>([]);

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure();
  const {
    isOpen: isOpenFinalWinnerAnnounceModal,
    onOpen: onOpenFinalWinnerAnnounceModal,
    onClose: onCloseFinalWinnerAnnounceModal,
  } = useDisclosure();

  useEffect(() => {
    document.title = 'Squid Competitions | UltiBets'
  }, [])

  const handleVote = () => {
    if (option == VotingResultInSBC.Indeterminate) {
      setOption(VotingResultInSBC.Split);
    }

    onOpen();
  }



  useEffect(() => {

    const getPlayersVoteState = async () => {
      const res = await playersVoteState(
        eventID,
        address,
        chain?.id ?? 0,
        isNativeToken
      );
      setIsAlreadyVoted(res as boolean);
    }

    if (chain?.id && address) {
      getPlayersVoteState()
    }
  }, [
    chain?.id,
    address,
    isNativeToken,
  ]);



  useEffect(() => {

    const getVote = async () => {
      const res = await eventVote(
        eventID,
        chain?.id ?? 0,
        isNativeToken
      );
      //@ts-ignore
      setSplitPoint(res.splitPoint);
      //@ts-ignore
      setSoloPoint(res.soloPoint);
    }
    if (chain?.id) getVote()
  }, [
    chain?.id,
    isNativeToken,
  ]);

  useEffect(() => {
    if (voteResult != VotingResultInSBC.Indeterminate) {
      onOpenFinalWinnerAnnounceModal();
    }
  }, [voteResult,])

  

  useEffect(() => {
    const initWinnerIDs = async () => {
      const res = await getWinnerIDs(
        eventID,
        chain?.id ?? 0,
        isNativeToken
      );
      setWinnerIds(res as any);
    }

    if (chain?.id) initWinnerIDs()
  }, [
    chain?.id,
    isNativeToken,
    winnersNumber,
  ]);

  const votePoolTypes = useMemo(() => {
    const poolInfo = [
      {
        title: "'Split' Vote",
        value: splitPoint,
        percent: parseFloat(((splitPoint / (splitPoint + soloPoint)) * 100).toFixed(1)),
        fakePercent: parseFloat(((splitPoint / (splitPoint + soloPoint)) * 100).toFixed(1)),
        color: '#E18933',
        background: '/images/svgs/bets/orange-bets-background.svg',
      },
      {
        title: "'Solo' Vote",
        value: soloPoint,
        percent: parseFloat(((soloPoint / (splitPoint + soloPoint)) * 100).toFixed(1)),
        fakePercent: parseFloat(((soloPoint / (splitPoint + soloPoint)) * 100).toFixed(1)),
        color: '#739AF0',
        background: '/images/svgs/bets/white-bets-background.svg',
      },
    ]

    let control = 0;
    let controlledIndex = [];
    if (poolInfo[0].fakePercent < 20 && poolInfo[0].fakePercent > 0) {
      control += 20 - poolInfo[0].fakePercent;
      poolInfo[0].fakePercent = 20;
      controlledIndex.push(0);
    }
    if (poolInfo[1].fakePercent < 20 && poolInfo[1].fakePercent > 0) {
      control += 20 - poolInfo[1].fakePercent;
      poolInfo[1].fakePercent = 20;
      controlledIndex.push(1);
    }

    if (control != 0) {
      const bigPools = poolInfo.filter((item: any) => item.fakePercent >= 40);
      bigPools[0].fakePercent -= control;
    }

    return poolInfo;
  }, [splitPoint, soloPoint,]);

  const StepBars = () => (
    <Flex
      mt={'30px'}
      justifyContent={'center'}
      alignItems={'baseline'}
      width={['calc(100vw - 130px)', 'calc(100vw - 130px)', '100%']}
    >
      {
        votePoolTypes.map((item, index) => (
          <StepBar
            key={index}
            category={item.title}
            value={item.value}
            percent={item.percent}
            fakePercent={item.fakePercent}
            color={item.color}
            background={item.background}
            isSquid={true}
          />
        ))
      }
    </Flex>
  );

  return (
    <>
      <Flex
        mt='20px'
      >
        <Welcome
          title={`Welcome to Squid Bet #${eventID}`}
          round={'Final Round vote'}
        />
      </Flex>

      <Flex
        gap={'23px'}
        maxW={'560px'}
        alignItems={'center'}
        my={'36px'}
      >
        <Image
          src={exclamationIconInRedBg}
          width={'38px'}
          height={'38px'}
        />
        <Flex
          fontFamily={'Nunito'}
          fontWeight={'700'}
          fontSize={'12px'}
          lineHeight={'16px'}
          textTransform={'capitalize'}
        >
          To prevent the lack of consensus in the case of an equal vote between the two voting choices,
          the "Random Solo Winner" choice will be triggered by default using Chainlink VRF on the blockchain
          to randomly select a solo winner of Squid Bet Competition.
        </Flex>
      </Flex>

      <Flex
        mb={'30px'}
        direction='column'
        width={['calc(100vw - 110px)', '100%']}
      >
        <Flex
          gap={['20px', '20px', '20px', '40px', '50px']}
          justifyContent={['start', 'start', 'start', 'start']}
          width='100%'
          height='100%'
          pr='5'
          mr='10'
          direction='row'
        >

          {/* images */}
          <Flex
            height={'150px'}
          >
            <Flex
              width={'150px'}
              height={'150px'}
            >
              <Image
                src={spliqtEquallyButton}
                width={option == VotingResultInSBC.Split ? '123.2px' : '112px'}
                height={option == VotingResultInSBC.Split ? '127.6px' : '116px'}
                _hover={{
                  width: '123.2px',
                  height: ' 127.6px'
                }}
                onClick={() => setOption(VotingResultInSBC.Split)}
                cursor={'pointer'}
              />
            </Flex>
            <Flex
              width={'150px'}
              height={'150px'}
            >
              <Image
                src={randomSoloWinnerButton}
                width={option == VotingResultInSBC.Solo ? '123.2px' : '112px'}
                height={option == VotingResultInSBC.Solo ? '127.6px' : '116px'}
                _hover={{
                  width: '123.2px',
                  height: ' 127.6px'
                }}
                onClick={() => setOption(VotingResultInSBC.Solo)}
                cursor={'pointer'}
              />
            </Flex>
          </Flex>
        </Flex>

        <Flex
          display={['flex', 'flex', 'flex', 'flex']}
          mr='5'
          className='bets-stepbars-wrapper'
          maxW={'600px'}
        >
          <StepBars />
        </Flex>
      </Flex>

      <Flex
        gap='30px'
        direction={['column', 'row']}
        mb='50px'
      >
        <Button
          lineHeight={'20px'}
          fontFamily={'Nunito'}
          fontWeight={'700'}
          width='150px'
          px='25px'
          py='11px'
          background={'unset'}
          borderRadius={'34px'}
          border={'1px solid #FC541C'}
          _hover={{
            background: '#FC541C',
          }}
          fontSize={'15px'}
          textAlign='center'
          alignItems={'center'}
          color={'white'}
          display='flex'
          justifyContent='center'
          mt={['0', '30px']}
          onClick={handleVote}
          cursor='pointer'
          isDisabled={isAlreadyVoted}
        >
          {
            isAlreadyVoted ? 'Vote placed' : 'Place Vote'
          }
        </Button>

        <Button
          lineHeight={'20px'}
          fontFamily={'Nunito'}
          fontWeight={'700'}
          width='fit-content'
          px='25px'
          py='11px'
          background={'unset'}
          borderRadius={'34px'}
          border={'1px solid #FC541C'}
          _hover={{
            background: '#FC541C',
          }}
          color={'white'}
          fontSize={'15px'}
          textAlign='center'
          alignItems={'center'}
          display='flex'
          justifyContent='center'
          mt='30px'
          onClick={() => router.push(`/sbc/${eventID}/winner-page`)}
          cursor='pointer'
          isDisabled={!isAlreadyVoted || winnersNumber == 0 || !(winnerIds.includes(registerID))}
        >
          {roundProperties['final-vote'].accessButtonText}
        </Button>
      </Flex>

      <PlaceVoteModal
        isOpen={isOpen}
        onClose={onClose}
        description={option == VotingResultInSBC.Split ? "split equally" : 'random solo winner'}
        eventID={eventID}
        logo={option == VotingResultInSBC.Split ? spliqtEquallyButton : randomSoloWinnerButton}
        option={option}
      />
      <FinalWinnerAnnounceModal
        isOpenFinalWinnerAnnounceModal={
          isOpenFinalWinnerAnnounceModal && winnersNumber > 0}
        onCloseFinalWinnerAnnounceModal={onCloseFinalWinnerAnnounceModal}
        eventID={eventID}
        voteResult={voteResult}
        prizePool={totalAmount}
        currentToken={currentToken}
        winnersNumber={winnersNumber}
      />
    </>
  )
}

export default FinalVoteComponent
