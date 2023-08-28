import {
    Button,
    Flex, useDisclosure,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { useContractEvent, useNetwork, } from 'wagmi';
import { contractAddressesInSBC, delayTimeFromSubgraph, EventStateInSBC, mumbaiChainId, newChainAttrs, NftSetStatus, polygonChainId, RoundResultInSBC, secondsIn12Hours, secondsInHalfHour, } from '../../utils/config';
import { useChainContext } from '../../utils/Context';
import {
    checkIconInGreenBg,
    ultibetsTokenBetsAbiInSBC,
    nativeTokenBetsAbiInSBC,
} from '../../utils/assets';
import { getSBCEvents } from '../../utils/interact/thegraph/getSBCEventData';
import { getFinalRoundWinnersByEvent, getWinnerIDs, pickWinner, resultVote } from '../../utils/interact/sc/squid-competition';
import AnnounceModal from '../modal/AnnounceModal';
import AddRoundModal from '../modal/squid-competition/AddRoundModal';
import AddEventModalInSBC from '../modal/squid-competition/AddEventModalInSBC';
import ReportResultModalForSBCRound from '../modal/squid-competition/ReportResultModalForSBCRound';
import CountDownRenderer from '../predictions/PredictionsCardList/CountDownRenderer';
import SquidCardList from '../squid/main-page/SquidCardList';
import { requestRandomWords } from '../../utils/interact/sc/rnd-generator';
import AddNFTForSpecialCase from '../modal/squid-competition/AddNFTForSpecialCase';
import TokenSelector from '../predictions/TokenSelector';
import AdminHandleEventButton from './AdminHandleEventButton';

const AdminSBCComponent = () => {
    const { chain, } = useNetwork();
    const { isNativeToken, shouldRender, setShouldRender, } = useChainContext();
    const [sbcContract, setSbcContract] = useState<Object>();
    const [eventList, setEventList] = useState<any[]>([]);
    const [currentEvent, setCurrentEvent] = useState<any>();
    const [currentRoundUIProps, setCurrentRoundUIProps] = useState<any>({
        currentEventStatusText: '',
        deadline: 0,
        roundControlButtonText: '',
        deadlineText: '',
        isRoundControlButtonDisabled: true,
        playersInThisPhase: 0,
    })
    const [numberOfPlayersInFinalVote, setNumberOfPlayersInFinalVote] = useState<number>(0);
    const [isGeneratedRND, setIsGeneratedRND] = useState(false);
    const [winnerIds, setWinnerIds] = useState<number[]>([]);
    const [nftSetStatus, setNftSetStatus] = useState(NftSetStatus.Original);
    const [chainId, setChainId] = useState<number>(chain?.id ?? polygonChainId);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRefresh, setIsRefresh] = useState<boolean>(false);
    const [currentToken, setCurrentToken] = useState(isNativeToken ? (newChainAttrs as any)[chainId].nativeToken : "UTBETS");
    const [repeatLevel, setRepeatLevel] = useState<number>(2);
    const {
        isOpen: isOpenAddSBCEventModal,
        onOpen: onOpenAddSBCEventModal,
        onClose: onCloseAddSBCEventModal
    } = useDisclosure();
    const {
        isOpen: isOpenAddRoundModal,
        onOpen: onOpenAddRoundModal,
        onClose: onCloseAddRoundModal
    } = useDisclosure();
    const {
        isOpen: isOpenReportResultModal,
        onOpen: onOpenReportResultModal,
        onClose: onCloseReportResultModal
    } = useDisclosure();
    const {
        isOpen: isOpenResultVoteSuccessModal,
        onOpen: onOpenResultVoteSuccessModal,
        onClose: onCloseResultVoteSuccessModal
    } = useDisclosure();
    const {
        isOpen: isOpenPickWinnerSuccessModal,
        onOpen: onOpenPickWinnerSuccessModal,
        onClose: onClosePickWinnerSuccessModal
    } = useDisclosure();
    const {
        isOpen: isOpenRequestRandomWordsSuccessModal,
        onOpen: onOpenRequestRandomWordsSuccessModal,
        onClose: onCloseRequestRandomWordsSuccessModal
    } = useDisclosure();
    const {
        isOpen: isOpenAddNFTForSpecialCase,
        onOpen: onOpenAddNFTForSpecialCase,
        onClose: onCloseAddNFTForSpecialCase,
    } = useDisclosure();

    useEffect(() => {
        const chainId = chain?.id != undefined ? chain.id :
            process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

        setChainId(chainId);
        setSbcContract({
            address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
            abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC
        })
        setCurrentToken(isNativeToken ? (newChainAttrs as any)[chainId].nativeToken : "UTBETS")
    }, [chain?.id, isNativeToken,])

    const fetchDataFromSubgraph6 = (delayTime?: number) => {
        if (chainId == undefined) return;
        setIsRefresh(true);
        setTimeout(() => {
            (async () => {
                const sbeEvents = await getSBCEvents(isNativeToken, chainId);
                if (sbeEvents?.isSuccess) {
                    setEventList(sbeEvents?.eventData);
                    if (sbeEvents?.eventData?.length >= 1) {
                        setCurrentEvent(sbeEvents?.eventData[0]);
                    }
                }
            })()
        }, delayTime ? delayTime : delayTimeFromSubgraph) // delay from the state change of the thegraph
        setIsRefresh(false);
    }

    useEffect(() => {
        fetchDataFromSubgraph6(200);
    }, [
        isNativeToken,
        chainId,
    ])

    useEffect(() => {
        fetchDataFromSubgraph6(10000);
    }, [
        shouldRender,
    ])

    // for native token betting
    useContractEvent({
        ...sbcContract,
        eventName: 'EventCreated',
        listener(eventID: any) {
            setShouldRender(!shouldRender);
        },
    });

    useContractEvent({
        ...sbcContract,
        eventName: 'Register',
        listener(address: any, eventID: any) {
            console.log("register event listened");
            setShouldRender(!shouldRender);
        },
    });

    useContractEvent({
        ...sbcContract,
        eventName: 'RoundAdded',
        listener(eventID: any, roundLevel: any, playersNumber: any) {
            setShouldRender(!shouldRender);
        },
    });

    useContractEvent({
        ...sbcContract,
        eventName: 'RoundFinished',
        listener(eventID: any, roundLevel: any) {
            setShouldRender(!shouldRender);
        },
    });

    useContractEvent({
        ...sbcContract,
        eventName: 'PredictionPlaced',
        listener(bettor: any, eventID: any, roundLevel: any, result: any) {
            setShouldRender(!shouldRender);
        },
    });

    useContractEvent({
        ...sbcContract,
        eventName: 'VoteEvent',
        listener(voter: any, eventID: any, voteResult: any) {
            setShouldRender(!shouldRender);
        },
    });

    useContractEvent({
        ...sbcContract,
        eventName: 'ReportVoteResult',
        listener(eventID: any) {
            setShouldRender(!shouldRender);
        },
    });

    useContractEvent({
        ...sbcContract,
        eventName: 'PickEventWinner',
        listener(eventID: any) {
            setShouldRender(!shouldRender);
        },
    });

    useContractEvent({
        ...sbcContract,
        eventName: 'WinnerClaimedPrize',
        listener(eventID: any) {
            setShouldRender(!shouldRender);
        },
    });

    useContractEvent({
        ...sbcContract,
        eventName: 'RoundUpdated',
        listener(eventID: any, roundLevel: any) {
            setShouldRender(!shouldRender);
        },
    });

    useContractEvent({
        ...sbcContract,
        eventName: 'RoundCanceled',
        listener(eventID: any, roundLevel: any) {
            setShouldRender(!shouldRender);
        },
    });

    useContractEvent({
        ...sbcContract,
        eventName: 'RefundCanceledRound',
        listener(bettor: any, eventID: any) {
            setShouldRender(!shouldRender);
        },
    });

    useEffect(() => {
        const initFinalNumberOfWinners = async () => {
            const res = await getFinalRoundWinnersByEvent(
                Number(currentEvent?.eventID ?? 1),
                chain?.id ?? 0,
                isNativeToken
            );
            setNumberOfPlayersInFinalVote((res as any)?.length);
        }
        if (chain?.id) initFinalNumberOfWinners()
    }, [
        chain?.id,
        isNativeToken,
        shouldRender,
    ]);

    useEffect(() => {
        switch (currentEvent?.state) {
            case EventStateInSBC.Register:
                // register page
                setCurrentRoundUIProps({
                    currentEventStatusText: 'Register Phase',
                    deadlineText: 'Register Deadline',
                    deadline: Number(currentEvent.registerDeadline) + secondsInHalfHour, // this should be available 1s before deadline, not 30 mins
                    roundControlButtonText: 'Add Round 1',
                    isRoundControlButtonDisabled: Number(currentEvent.registerDeadline) > Math.round(Date.now() / 1000) ? true : false,
                    playersInThisPhase: Number(currentEvent?.totalPlayers),
                })
                break;

            case EventStateInSBC.Round:
                setCurrentRoundUIProps({
                    currentEventStatusText: `Round ${currentEvent?.currentLevel} Phase`,
                    deadlineText: `Round ${currentEvent?.currentLevel} Deadline`,
                    deadline: Number(currentEvent?.rounds[currentEvent?.currentLevel - 1]?.startTime ?? Math.round(Date.now() / 1000)),
                    roundControlButtonText: currentEvent?.rounds[currentEvent?.currentLevel - 1].result == RoundResultInSBC.Indeterminate ?
                        `Report Round ${currentEvent?.currentLevel} Result` : `Add Round ${(Number(currentEvent?.currentLevel) + 1)}`,
                    isRoundControlButtonDisabled: ((currentEvent?.rounds[currentEvent?.currentLevel - 1].result == RoundResultInSBC.Indeterminate) &&
                        (currentEvent?.rounds[currentEvent?.currentLevel - 1].startTime > Math.round(Date.now() / 1000) + secondsInHalfHour)) ? true : false,
                    playersInThisPhase: currentEvent?.rounds[currentEvent?.currentLevel - 1].playersOnRound,
                })
                break;

            case EventStateInSBC.Vote:
                setCurrentRoundUIProps({
                    currentEventStatusText: `Final Vote Phase`,
                    deadlineText: `Final Vote Deadline`,
                    deadline: Number(currentEvent?.voteStartTime) + secondsInHalfHour + secondsIn12Hours,
                    roundControlButtonText: `Result Vote`,
                    isRoundControlButtonDisabled: Number(currentEvent?.voteStartTime) + secondsIn12Hours > Math.round(Date.now() / 1000) ? true : false,
                    playersInThisPhase: numberOfPlayersInFinalVote,
                });
                break;

            case EventStateInSBC.PickWinner:
                setCurrentRoundUIProps({
                    currentEventStatusText: `Final Vote Phase`,
                    deadlineText: ``,
                    deadline: 0,
                    roundControlButtonText: isGeneratedRND ? `Pick Winner` : 'Generate seed',
                    isRoundControlButtonDisabled: false,
                    playersInThisPhase: numberOfPlayersInFinalVote,
                });
                break;

            case EventStateInSBC.ClaimPrize:
                setCurrentRoundUIProps({
                    currentEventStatusText: `Final Winner Phase`,
                    deadlineText: ``,
                    deadline: 0,
                    roundControlButtonText: ``,
                    isRoundControlButtonDisabled: true,
                    playersInThisPhase: currentEvent?.winnersNumber,
                });
                break;
        }
    }, [
        chain?.id,
        currentEvent,
        isGeneratedRND,
        shouldRender,
    ])

    const handleResultVote = async () => {
        if ((nftSetStatus < NftSetStatus.WinnerNFTSet)) {
            onOpenAddNFTForSpecialCase();
        } else {
            setIsLoading(true);
            const res = await resultVote(
                currentEvent?.eventID ?? 1,
                chain?.id ?? 0,
                isNativeToken
            )
            if (res) {
                onOpenResultVoteSuccessModal();
            }
            setIsLoading(false);
        }
    }

    const handlePickWinner = async() => {
        setIsLoading(true)
        const res = await pickWinner(
            currentEvent?.eventID ?? 1,
            chain?.id ?? 0,
            isNativeToken
        )
        if (res)
            onOpenPickWinnerSuccessModal();

        setIsLoading(true)
    }

    const handlerequestRandomWords = async () => {
        setIsLoading(true)
        try {
            const res = await requestRandomWords(chain?.id??0);
            if (res)
                onOpenRequestRandomWordsSuccessModal();
        } catch (err) {
            console.log('error in requesting random words: ', err);
        }
        setIsLoading(false)
    }

    const handleControlButton = async () => {
        if (currentEvent?.state == EventStateInSBC.Register) {
            // should add round 1
            onOpenAddRoundModal();
        } else if (currentEvent?.state == EventStateInSBC.Round) {
            if (currentEvent?.rounds[currentEvent?.currentLevel - 1].result == RoundResultInSBC.Indeterminate) {
                onOpenReportResultModal();
            } else {
                onOpenAddRoundModal();
            }
        } else if (currentEvent?.state == EventStateInSBC.Vote) {
            handleResultVote();
        } else if (currentEvent?.state == EventStateInSBC.PickWinner) {
            if (isGeneratedRND) {
                handlePickWinner();
            } else {
                handlerequestRandomWords();
            }
        }
    }

    useEffect(() => {
        const initWinnerIDs = async () => {
            const res = await getWinnerIDs(
              currentEvent?.eventID,
              chain?.id ?? 0,
              isNativeToken
            );
            setWinnerIds(res as any);
          }
      
          if (chain?.id && currentEvent) initWinnerIDs()
    
    }, [
        chain?.id,
        isNativeToken,
        shouldRender,
        currentEvent?.winnersNumber,
    ]);

    return (
        <Flex
            className='admin-sbc-component'
            justifyContent={'center'}
            direction={'column'}
            mx={[
                '0',
                '0',
                'calc(calc(100% - 255px * 2 - 40px * 1) / 2)',
                'calc(calc(100% - 255px * 3 - 40px * 2) / 2)',
                'calc(calc(100% - 255px * 4 - 40px * 3) / 2)'
            ]}
            gap={'50px'}
        >

            <Flex
                className='token-selector-component-wrapper-in-prediction-markets'
                mt='39px'
            >
                <TokenSelector />
            </Flex>

            <Flex
                className='title'
                textTransform={'capitalize'}
                fontFamily={'Nunito'}
                fontSize={'40px'}
                justifyContent={'center'}
            >
                Current ongoing event
            </Flex>

            {
                (eventList?.length > 0) && (currentRoundUIProps.roundControlButtonText != '') && (
                    <Flex
                        className='round-control-button-wrapper'
                        justifyContent={'right'}
                    >
                        <Button
                            p={'7px 24px '}
                            background={'unset'}
                            borderRadius={'34px'}
                            fontSize={'15px'}
                            fontFamily={'Nunito'}
                            lineHeight={'20px'}
                            border={'1px solid #FC541C'}
                            textTransform={'capitalize'}
                            minWidth={'160px'}
                            width={'fit-content'}
                            justifyContent={'center'}
                            // isDisabled={currentRoundUIProps.isRoundControlButtonDisabled}
                            onClick={handleControlButton}
                        >
                            {currentRoundUIProps.roundControlButtonText}
                        </Button>
                    </Flex>
                )
            }

            {
                (eventList?.length == 0) && (
                    <Flex>
                        No on going event currently
                    </Flex>
                )
            }

            {
                isLoading && (
                    <Flex
                        className="loading-container"
                        justifyContent={'center'}
                        textAlign={'center'}
                        mt={'100px'}
                        alignItems={'center'}
                        px={'20px'}
                    >
                        <section>
                            <Flex className="loader loader-1">
                                <Flex className="loader-outter" />
                                <Flex className="loader-inner" />
                            </Flex>
                        </section>
                    </Flex>
                )
            }

            {
                !isLoading && (eventList?.length >= 1) && (
                    <Flex
                        className='round-status'
                        justifyContent={'center'}
                        direction={'column'}
                        gap={'20px'}
                        p={['15px', '20px', '20px']}
                    >
                        <Flex
                            className='event-name'
                            textTransform={'capitalize'}
                            fontFamily={'Nunito'}
                            fontSize={'20px'}
                        >
                            Event Name: {currentEvent?.description}
                        </Flex>

                        <Flex
                            className='event-current-status'
                            textTransform={'capitalize'}
                            fontFamily={'Nunito'}
                            fontSize={'20px'}
                        >
                            Event Status: {currentRoundUIProps.currentEventStatusText}
                        </Flex>

                        {
                            (currentEvent?.state == EventStateInSBC.Round) && (
                                <Flex
                                    className='round-description'
                                    textTransform={'capitalize'}
                                    fontFamily={'Nunito'}
                                    fontSize={'20px'}
                                >
                                    Round {currentEvent?.currentLevel} Description: {currentEvent?.rounds[currentEvent?.currentLevel - 1]?.description ?? ''}
                                </Flex>
                            )
                        }

                        <Flex
                            className='event-organization-fee'
                            textTransform={'capitalize'}
                            fontFamily={'Nunito'}
                            fontSize={'20px'}
                        >
                            Organization Fee: {Number(currentEvent?.orgFeePercent)} %
                        </Flex>

                        <Flex
                            className='event-organization-fee'
                            textTransform={'capitalize'}
                            fontFamily={'Nunito'}
                            fontSize={'20px'}
                        >
                            Register Amount: {ethers.utils.formatEther(currentEvent?.registerAmount)} {currentToken}
                        </Flex>

                        <Flex
                            className='event-organization-fee'
                            textTransform={'capitalize'}
                            fontFamily={'Nunito'}
                            fontSize={'20px'}
                        >
                            Round Bet Amount: {ethers.utils.formatEther(currentEvent?.roundBetAmount)} {currentToken}
                        </Flex>

                        <Flex
                            className='event-organization-fee'
                            textTransform={'capitalize'}
                            fontFamily={'Nunito'}
                            fontSize={'20px'}
                        >
                            Total Prize Amount: {ethers.utils.formatEther(currentEvent?.totalAmount)} {currentToken}
                        </Flex>

                        <Flex
                            className='event-organization-fee'
                            textTransform={'capitalize'}
                            fontFamily={'Nunito'}
                            fontSize={'20px'}
                        >
                            Maximum Players: {Number(currentEvent?.maxPlayers)}
                        </Flex>

                        <Flex
                            className='event-organization-fee'
                            textTransform={'capitalize'}
                            fontFamily={'Nunito'}
                            fontSize={'20px'}
                        >
                            Registered players in this event: {Number(currentEvent?.totalPlayers)}
                        </Flex>

                        <Flex
                            className='event-organization-fee'
                            textTransform={'capitalize'}
                            fontFamily={'Nunito'}
                            fontSize={'20px'}
                        >
                            Players in this phase: {currentRoundUIProps.playersInThisPhase}
                        </Flex>

                        {
                            (currentEvent?.state == EventStateInSBC.ClaimPrize) && (
                                <Flex
                                    className='event-organization-fee'
                                    textTransform={'capitalize'}
                                    fontFamily={'Nunito'}
                                    fontSize={'20px'}
                                >
                                    Number of players which claimed prize: {currentEvent?.claimedWinnersNumber}
                                </Flex>
                            )
                        }

                        {
                            (currentRoundUIProps.deadlineText != '') && (
                                <Flex
                                    className='event-current-deadline'
                                    fontFamily={'Nunito'}
                                    fontSize={'20px'}
                                >
                                    {currentRoundUIProps.deadlineText}:
                                    <Countdown date={(currentRoundUIProps.deadline - secondsInHalfHour) * 1000} renderer={CountDownRenderer} />
                                </Flex>
                            )
                        }

                        {
                            (currentEvent?.state == EventStateInSBC.Round) && (
                                <Flex
                                    className='event-current-status'
                                    textTransform={'capitalize'}
                                    fontFamily={'Nunito'}
                                    fontSize={'20px'}
                                >
                                    Players betted in this phase:
                                    {currentEvent?.rounds[currentEvent?.currentLevel - 1].playersBettedOnRound}
                                </Flex>
                            )
                        }
                        {
                            (currentEvent?.state == EventStateInSBC.Vote ||
                                currentEvent?.state == EventStateInSBC.PickWinner) && (
                                <Flex
                                    className='event-current-status'
                                    textTransform={'capitalize'}
                                    fontFamily={'Nunito'}
                                    fontSize={'20px'}
                                >
                                    {/* ts-ignore */}
                                    Split vs Solo:{'    '}
                                    {currentEvent?.splitVote} - {currentEvent?.soloVote}
                                </Flex>
                            )
                        }

                        {
                            (currentEvent?.state == EventStateInSBC.ClaimPrize) && (
                                <Flex
                                    className='event-current-status'
                                    textTransform={'capitalize'}
                                    fontFamily={'Nunito'}
                                    fontSize={'20px'}
                                >
                                    Winners:{'    #'}
                                    {winnerIds.join(', #')}
                                </Flex>
                            )
                        }

                    </Flex>
                )
            }

            <Flex
                className='current-registerred-events-in-sbc'
                direction={'column'}
            >
                <Flex
                    position={'relative'}
                    className='title'
                    textTransform={'capitalize'}
                    fontFamily={'Nunito'}
                    fontSize={'40px'}
                    justifyContent={'center'}
                >
                    Current registerred events in squid competition
                </Flex>

                <Flex
                    className='event-control-button-wrapper'
                    justifyContent={'right'}
                >
                    <AdminHandleEventButton
                        setRepeatLevel={setRepeatLevel}
                        onOpenModal={onOpenAddSBCEventModal}
                        buttonLabel={'Add Event'}
                    />
                </Flex>

                <SquidCardList />
            </Flex>
            <AddEventModalInSBC
                isOpen={isOpenAddSBCEventModal}
                onClose={onCloseAddSBCEventModal}
                repeatLevel={repeatLevel}
            />
            <AddRoundModal
                isOpen={isOpenAddRoundModal}
                onClose={onCloseAddRoundModal}
                eventID={currentEvent?.eventID}
                result={Number(currentEvent?.rounds[currentEvent?.currentLevel - 1]?.result)}
                isNativeToken={isNativeToken}
                roundLevel={currentEvent?.currentLevel + 1}
                totalPlayers={Number(currentEvent?.totalPlayers)}
                playersInThisPhase={currentRoundUIProps.playersInThisPhase}
            />
            <ReportResultModalForSBCRound
                isOpen={isOpenReportResultModal}
                onClose={onCloseReportResultModal}
                eventID={currentEvent?.eventID}
                currentLevel={currentEvent?.currentLevel}
                totalPlayers={Number(currentEvent?.totalPlayers)}
                playersInThisPhase={currentRoundUIProps.playersInThisPhase}
            />
            <AnnounceModal
                isOpenAnnounceModal={isOpenResultVoteSuccessModal}
                onCloseAnnounceModal={onCloseResultVoteSuccessModal}
                announceText={`Result has been successfully voted`}
                announceLogo={checkIconInGreenBg}
                announceModalButtonText={'Close'}
            />
            <AnnounceModal
                isOpenAnnounceModal={isOpenPickWinnerSuccessModal}
                onCloseAnnounceModal={onClosePickWinnerSuccessModal}
                announceText={`Winner has been successfully picked`}
                announceLogo={checkIconInGreenBg}
                announceModalButtonText={'Close'}
            />
            <AnnounceModal
                isOpenAnnounceModal={isOpenRequestRandomWordsSuccessModal}
                onCloseAnnounceModal={onCloseRequestRandomWordsSuccessModal}
                announceText={`RND has been successfully genereated`}
                announceLogo={checkIconInGreenBg}
                announceModalButtonText={'Pick Winner'}
                announceModalButtonAction={() => {
                    setIsGeneratedRND(true);
                    handlePickWinner();
                    onCloseRequestRandomWordsSuccessModal();
                }}
            />
            <AddNFTForSpecialCase
                isOpen={isOpenAddNFTForSpecialCase}
                onClose={onCloseAddNFTForSpecialCase}
                eventID={currentEvent?.eventID}
                roundLevel={0} // final winner
                totalPlayers={currentEvent?.totalPlayers}
                playersInThisPhase={
                    currentEvent?.state == 2 && currentEvent?.splitVote > currentEvent?.soloVote ? numberOfPlayersInFinalVote : 1
                }
                nftSetStatus={nftSetStatus}
                setNftSetStatus={setNftSetStatus}
                callback={() => handleResultVote()}
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

export default AdminSBCComponent;