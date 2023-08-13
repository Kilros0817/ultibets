import {
    Box,
    Flex,
    Grid,
    Button,
    useDisclosure,
} from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState, } from 'react'
import { useAccount, useContractEvent, useNetwork, useSigner } from 'wagmi';
import { useChainContext } from '../../../utils/Context';
import { useMassClaimSBCNFT, } from '../../../utils/interact/sc/sbcNFT';
import AnnounceModal from '../../modal/AnnounceModal';
import {
    checkIconInGreenBg,
    nftClaimerAbi,
    perkMoneyLogo
} from '../../../utils/assets';
import { getNFTData } from '../../../utils/interact/thegraph/getNFTData';
import {
    chainAttrs,
    delayTimeFromSubgraph,
    mumbaiChainId,
    nftClaimerContract,
    polygonChainId,
    utbetsAmountPerPerkLevel,
} from '../../../utils/config';
import { ethers } from 'ethers';
import { getFormattedDateString } from '../../../utils/formatters';
// @ts-ignore
import QRCode from "react-qr-code";
import { getNFTTypeString } from '../../../utils/interact/utility';

type MyNFTsComponentProps = {
    tabIndex: number
}

const MyNFTsComponent = ({
    tabIndex,
}: MyNFTsComponentProps) => {
    const { chain, } = useNetwork();
    const { isNativeToken, } = useChainContext();
    const { address, } = useAccount();
    const [currentMainnetOrTestnetAttrs,] = useState(
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
    const [claimableNFTs, setClaimableNFTs] = useState<any[]>([]);
    const [claimedNFTs, setClaimedNFTs] = useState<any[]>([]);
    const [shouldRender, setShouldRender] = useState<boolean>(true);
    const [contract, setContract] = useState<any>();
    const [chainId, setChainId] = useState<number>(polygonChainId);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const { data: signer } = useSigner();
    const {
        isOpen: isOpenClaimNFTSuccessModal,
        onOpen: onOpenClaimNFTSuccessModal,
        onClose: onCloseClaimNFTSuccessModal,
    } = useDisclosure();
    const {
        isOpen: isOpenClaimPerksSuccessModal,
        onOpen: onOpenClaimPerksSuccessModal,
        onClose: onCloseClaimPerksSuccessModal,
    } = useDisclosure();

    const rounds = ["winner", 'I', 'II', 'III', 'IV', 'V'];

    useEffect(() => {
        const chainId = chain?.id != undefined ? chain.id :
            process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;
        let currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == chainId);
        if (currentChainAttrsItem.length == 0) {
            const temporaryChainId = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? 137 : 80001
            currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == temporaryChainId);
        }
        setChainId(chainId);
        setContract({
            address: (nftClaimerContract as any)[chainId],
            abi: nftClaimerAbi,
        })
    }, [chain, isNativeToken]);

    const massClaimSBCNFT = useMassClaimSBCNFT();

    const handleMassClaimSBCNFT = async () => {
        if (massClaimSBCNFT.isLoading) return;

        try {
            massClaimSBCNFT.massClaimSBCNFTFunction?.();
            onOpenClaimNFTSuccessModal();
        } catch (err) {
            console.log('error in mass claim sbc nft: ', err);
        }
    }

    const fetchDataFromSubgraph7 = (delayTime?: number) => {
        if (chainId == undefined) return;
        setIsLoading(true);
        setTimeout(() => {
            (async () => {
                const sbcNfts = await getNFTData(address?.toLowerCase() ?? '0x0', chainId);
                if (sbcNfts?.isSuccess) {
                    console.log("sbcNfts: ", "sbcNfts?.isSuccess: ", (sbcNfts?.returnedData));
                    handleNFTsFromSubgraph(sbcNfts?.returnedData);
                }
                setIsLoading(false);
            })()
        }, delayTime ? delayTime : delayTimeFromSubgraph) // delay from the state change of the thegraph
    }

    useEffect(() => {
        fetchDataFromSubgraph7(200);
    }, [
        isNativeToken,
        chainId,
        address,
    ])

    useEffect(() => {
        fetchDataFromSubgraph7();
    }, [
        shouldRender,
    ])

    useContractEvent({
        ...contract,
        eventName: 'ClaimNFT',
        listener(tokenId: any) {
            console.log("ClaimNFT listened");
            setShouldRender(!shouldRender);
        },
    });

    useContractEvent({
        ...contract,
        eventName: 'ClaimFreeBetPerk',
        listener(tokenId: any) {
            setShouldRender(!shouldRender);
        },
    });

    const handleNFTsFromSubgraph = async (nftsFromSubgraph: any) => {
        let length = nftsFromSubgraph?.length;

        let claimedNFTs = [];
        let claimableNFTs = [];

        for (let i = 0; i < length; i++) {
            let tokenURI = nftsFromSubgraph[i]?.tokenURI;
            if (tokenURI != "") {
                let cid = (tokenURI.split('//'))[1];
                const metadata = (await axios.get(`${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/${cid}`)).data;
                let imageUri = metadata.image;
                imageUri = process.env.NEXT_PUBLIC_PINATA_GATEWAY + (imageUri.split('//'))[1]

                if (nftsFromSubgraph[i]?.isClaimed) {
                    claimedNFTs.push({
                        tokenId: Number(nftsFromSubgraph[i]?.id),
                        imageUri,
                        isFreeBet: nftsFromSubgraph[i]?.isFreeBet,
                        roundLevel: nftsFromSubgraph[i]?.roundLevel,
                        eventID: Number(nftsFromSubgraph[i]?.eventID),
                        timestamp: Number(nftsFromSubgraph[i]?.blockTimestamp),
                        totalPlayers: nftsFromSubgraph[i]?.totalPlayers,
                        currentPlayers: nftsFromSubgraph[i]?.remainPlayers,
                        type: nftsFromSubgraph[i]?.type,
                    });
                } else {
                    claimableNFTs.push({
                        tokenId: Number(nftsFromSubgraph[i]?.id),
                        imageUri,
                    });
                }
            }
        }
        console.log("============:  claimableNFTs", claimableNFTs);
        console.log("============:  claimedNFTs", claimedNFTs);
        setClaimedNFTs(claimedNFTs);
        setClaimableNFTs(claimableNFTs);
    }

    const getContract = () => {
        const contractAddress = (nftClaimerContract as any)[chainId];
        const contract = new ethers.Contract(contractAddress, nftClaimerAbi, (signer?.provider as any)?.getSigner());

        return contract;
    }

    const handleClaimPerks = async (tokenId: any) => {
        try {
            const contract = getContract();
            let tx = await contract.claimFreeBetPerk(tokenId);
            setIsProcessing(true);
            await tx.wait();
            onOpenClaimPerksSuccessModal();

        } catch (e) {
            console.log("nft claim error: ", e);
        }

        setIsProcessing(false);
    }

    return (
        <Flex
            className='my-nfts-component'
            mt={['34px']}
            justifyContent={['center', 'center', 'start']}
            direction={'column'}
        >
            {
                (tabIndex == 0) && (
                    <Button
                        onClick={handleMassClaimSBCNFT}
                        height={'46px'}
                        width={'155px'}
                        background={'unset'}
                        borderRadius={'34px'}
                        border={'1px solid #FC541C'}
                        _hover={{
                            background: '#FC541C',
                        }}
                        fontFamily={'Nunito'}
                        fontSize={'20px'}
                        mb={'30px'}
                        isDisabled={claimableNFTs.length == 0}
                    >
                        {
                            claimableNFTs.length == 1 ? 'Claim NFT' : 'Mass Claim'
                        }
                    </Button>
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

            <Grid
                gridTemplateColumns={[
                    'repeat(1, 1fr)',
                    'repeat(2, 1fr)',
                    'repeat(3, 1fr)',
                    'repeat(4, 1fr)',
                    'repeat(5, 1fr)',
                ]}
                columnGap={'54px'}
                rowGap={'65px'}
            >
                {
                    !isLoading && (tabIndex == 0) && claimableNFTs?.map((item, index) => (
                        <Flex
                            key={index}
                            className='nft-card-wrapper'
                        >
                            <Flex
                                width={'193px'}
                                height={'344px'}
                            >
                                <img
                                    src={item.imageUri}
                                    style={{
                                        width: '193px',
                                        height: '344px'
                                    }}
                                />
                            </Flex>
                        </Flex>
                    ))
                }
                {
                    !isLoading && (tabIndex == 1) && claimedNFTs?.map((item, index) => (
                        <Flex
                            key={index}
                            position='relative'
                            className='nft-card-wrapper'
                        >
                            <Flex
                                width={'193px'}
                                height={'344px'}
                            >
                                <img
                                    src={item.imageUri}
                                    style={{
                                        width: '193px',
                                        height: '344px'
                                    }}
                                />
                            </Flex>

                            <Box
                                position={'absolute'}
                                opacity={0}
                                width={'193px'}
                                height={'344px'}
                                className='nft-card-details'
                                _hover={{
                                    opacity: 1
                                }}
                                background={'black'}
                            >
                                <Flex
                                    position={'relative'}
                                >
                                    <Flex
                                        opacity={0.2}
                                    >
                                        <img
                                            src={item.imageUri}
                                        />
                                    </Flex>
                                    <Flex
                                        position={'absolute'}
                                        direction={'column'}
                                        width={'193px'}
                                        height={'344px'}
                                    >
                                        <Flex
                                            fontFamily={'Nunito'}
                                            fontSize={'12px'}
                                            lineHeight={'16px'}
                                            px={'37px'}
                                            pt={'30px'}
                                        >
                                            NFT Info
                                        </Flex>
                                        <Flex
                                            mt={'22px'}
                                            px={'37px'}
                                            justifyContent={'space-between'}
                                            gap={'10px'}
                                        >
                                            <Box
                                                width={'52px'}
                                            >
                                                <QRCode
                                                    value={`{
                                                        type: ${getNFTTypeString(Number(item.type))},
                                                        date: ${getFormattedDateString(new Date(item.timestamp * 1000), "-").slice(2)},
                                                        eventID: ${item.eventID},
                                                        roundID: ${item.roundLevel},
                                                        totalPlayers: ${item.totalPlayers},
                                                        currentPlayers: ${item.remainPlayers},
                                                      }`}
                                                    bgColor={'transparent'}
                                                    fgColor={'#FFFFFF'}
                                                    size={50}
                                                />

                                                <Flex
                                                    justifyContent={'center'}
                                                >
                                                    <Flex
                                                        fontFamily={'Nunito'}
                                                        fontSize={'12px'}
                                                        lineHeight={'16px'}
                                                        mt={'5px'}
                                                    >
                                                        ID: {item.tokenId}
                                                    </Flex>
                                                </Flex>
                                            </Box>

                                            <Flex
                                                fontFamily={'Nunito'}
                                                fontSize={'12px'}
                                                lineHeight={'16px'}
                                                gap={'12px'}
                                                direction={'column'}
                                            >
                                                <Flex>
                                                    SBC #{item.eventID}
                                                </Flex>
                                                <Flex>
                                                    {`Round ${rounds[item.roundLevel]} `}
                                                </Flex>
                                                <Flex>
                                                    {getFormattedDateString(new Date(item.timestamp * 1000), ".").slice(2)}
                                                </Flex>
                                            </Flex>
                                        </Flex>

                                        <Flex
                                            mt={'19px'}
                                            pl={'40px'}
                                            direction={'column'}
                                        >
                                            <Flex>
                                                <img
                                                    src={perkMoneyLogo}
                                                    style={{
                                                        width: '14px',
                                                        height: '14px',
                                                    }}
                                                />
                                                <Flex
                                                    fontFamily={'Nunito'}
                                                    fontSize={'12px'}
                                                    lineHeight={'16px'}
                                                    ml={'5px'}
                                                >
                                                    Perks:
                                                </Flex>
                                            </Flex>
                                            <Flex
                                                textTransform={'capitalize'}
                                                fontFamily={'Nunito'}
                                                fontSize={'12px'}
                                                lineHeight={'16px'}
                                            >
                                                Freebet (
                                                {item.isFreeBet ? `${item.roundLevel == 0 ? utbetsAmountPerPerkLevel[6] :
                                                    utbetsAmountPerPerkLevel[item.roundLevel]
                                                    } UTBETS` : 'Claimed'}
                                                )
                                            </Flex>
                                        </Flex>

                                        <Flex
                                            justifyContent={'center'}
                                            mt={'28px'}
                                        >
                                            <Button
                                                textTransform={'capitalize'}
                                                fontFamily={'Nunito'}
                                                fontSize={'12px'}
                                                lineHeight={'16px'}
                                                py={'11px'}
                                                px={'22px'}
                                                border={'1px solid #FC541C'}
                                                borderRadius={'29px'}
                                                _hover={{
                                                    backgroundColor: '#E18833',
                                                }}
                                                background={'transparent'}
                                                onClick={() => {
                                                    console.log("token id: ", item.tokenId);
                                                    handleClaimPerks(item.tokenId);
                                                }}
                                                isDisabled={!item.isFreeBet}
                                            >
                                                sign to claim perks
                                            </Button>
                                        </Flex>
                                    </Flex>

                                </Flex>
                            </Box>
                        </Flex>
                    ))
                }
            </Grid>
            <AnnounceModal
                isOpenAnnounceModal={isOpenClaimNFTSuccessModal && massClaimSBCNFT.isSuccess}
                onCloseAnnounceModal={onCloseClaimNFTSuccessModal}
                announceText={'You claimed successfully your nfts'}
                announceLogo={checkIconInGreenBg}
                announceModalButtonText={'Close'}
            />
            <AnnounceModal
                isOpenAnnounceModal={isOpenClaimPerksSuccessModal && !isProcessing}
                onCloseAnnounceModal={onCloseClaimPerksSuccessModal}
                announceText={'You claimed successfully your perks'}
                announceLogo={checkIconInGreenBg}
                announceModalButtonText={'Close'}
            />
            <AnnounceModal
                isOpenAnnounceModal={
                    (isOpenClaimNFTSuccessModal && massClaimSBCNFT.isLoading) || isProcessing
                }
                onCloseAnnounceModal={onCloseClaimNFTSuccessModal}
                announceText={'Your transaction is currently processing on the blockchain'}
                announceGif={true}
                announceModalButtonText={'Close'}
            />
        </Flex>
    )
}

export default MyNFTsComponent
