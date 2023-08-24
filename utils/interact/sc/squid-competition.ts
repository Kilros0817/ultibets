import {
    useContractRead,
    useContractWrite,
    useNetwork,
    usePrepareContractWrite,
    useAccount,
    useWaitForTransaction,
} from 'wagmi';
import { readContract, writeContract } from "@wagmi/core";
import { BigNumber, ethers } from 'ethers';
import {
    contractAddressesInSBC,
    mumbaiChainId,
    newChainAttrs,
    polygonChainId,
} from '../../config';
import { useChainContext, } from '../../Context';
import { nativeTokenBetsAbiInSBC, ultibetsTokenBetsAbiInSBC } from '../../assets';

// function getEventList(
//     uint256 _pageNumber,
//     uint256 _pageSize
// )
export const useGetEventList = (
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { data: getEventList, error, isLoading } = useContractRead({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: "getEventList",
        cacheTime: 2_000,
        args: [],
        watch: true,
        chainId: chainId,
        onSuccess() {
            console.log("getting squid event list success")
        },
        onError(error: any) {
            console.log("error occured in getting squid event list: ", error);
        }
    });

    return {
        status: error == undefined ? true : false,
        result: getEventList,
        isLoading,
    }
}

// mapping(uint256 => EventInfo) public eventData;
export const useEventData = (
    eventID: number
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { data: eventData, error, isLoading } = useContractRead({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: "eventData",
        cacheTime: 2_000,
        args: [eventID],
        watch: true,
        chainId: chainId,
        onSuccess() {
            console.log("getting event list success")
        },
        onError(error: any) {
            console.log("error occured in getting event list: ", error);
        }
    });

    return {
        status: error == undefined ? true : false,
        result: eventData,
        isLoading,
    }
}


// function registerOnEvent(uint256 _eventID) external payable
export const registerOnEvent = async (
    eventID: number,
    registerAmount: number,
    chainId: number,
    isNativeToken: boolean
) => { 
    try {
        const { hash, wait } = await writeContract({
            mode: "recklesslyUnprepared",
            address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
            abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
            functionName: 'registerOnEvent',
            args: isNativeToken ? [eventID] : [eventID,],
            overrides: {
                value: isNativeToken ? ethers.utils.parseEther((registerAmount ?? '0')?.toString()) : 0,
            },
          });
          await wait();
          return true;
    } catch (e) {
        console.log(e, "============error in register=============")
        return false
    }
}

// function getRegisterIDOfBettor(
//     uint256 _eventID,
//     address _bettor
// ) public view returns(uint16)
export const getRegisterIDOfBettor = async (
    eventID: number,
    chainId: number,
    isNativeToken: boolean,
    bettor: string,
) => {
    const registerID = await readContract({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: "registerIDOfBettor",
        args: [bettor, eventID,],
    });

    return registerID
}


// function getRoundTotalInfo(
//     uint256 _roundID
// ) public view returns
export const useGetRoundTotalInfo = (
    roundID: number
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { data: getRoundTotalInfo, error, isLoading } = useContractRead({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: "getRoundTotalInfo",
        cacheTime: 2_000,
        args: [roundID,],
        watch: true,
        chainId: chainId,
        onSuccess() {
            console.log("getting round total info success")
        },
        onError(error: any) {
            console.log("error occured in getting round total info: ", error);
        }
    });

    return {
        status: error == undefined ? true : false,
        result: getRoundTotalInfo,
        isLoading,
    }
}


//  mapping(address => mapping(uint256 => RoundResult)) public betByBettor;
export const useGetBetByBettor = (
    roundID: number
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    const { address, } = useAccount();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { data: betByBettor, error, isLoading } = useContractRead({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: "betByBettor",
        cacheTime: 2_000,
        args: [address, roundID,],
        watch: true,
        chainId: chainId,
        onSuccess() {
            console.log("getting bets by bettor success")
        },
        onError(error: any) {
            console.log("error occured in getting bets by bettor: ", error);
        }
    });

    return {
        status: error == undefined ? true : false,
        result: betByBettor,
        isLoading,
    }
}

// function placePrediction(uint256 _eventID, RoundResult _result) external payable {
export const usePlaceBetInSBC = (
    eventID: number,
    result: number,
    roundBetAmount: number
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: 'placePrediction',
        cacheTime: 2_000,
        args: isNativeToken ? [eventID, result] : [eventID, result,],
        overrides: {
            value: isNativeToken ? ethers.utils.parseEther((roundBetAmount ?? '0')?.toString()) : 0,
            gasLimit: BigNumber.from(3000000),
        },
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error', prepareError)
        },
    })
    const { write: placeBetFunction, data } = useContractWrite(config)
    const { isLoading, isSuccess, isError, error, } = useWaitForTransaction({
        hash: data?.hash,
        cacheTime: 2_000,
        onSuccess(data) {
            console.log("wait for transaction success: ", data);
        },
        onError(error) {
            console.log('wait for transaction result error: ', error);
        },
    })

    return {
        status: error == undefined ? true : false,
        isLoading,
        placeBetFunction,
        isSuccess,
    }
}

//     function voteEvent(uint256 _eventID) public onlyAdmin {
export const useVoteEvent = (
    eventID: number,
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: 'voteEvent',
        cacheTime: 2_000,
        args: [eventID],
        overrides: {
            gasLimit: BigNumber.from(3000000),
        },
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error', prepareError)
        },
    })
    const { write: voteEventFunction, data } = useContractWrite(config)
    const { isLoading, isSuccess, isError, error, } = useWaitForTransaction({
        hash: data?.hash,
        cacheTime: 2_000,
        onSuccess(data) {
            console.log("wait for transaction success: ", data);
        },
        onError(error) {
            console.log('wait for transaction result error: ', error);
        },
    })

    return {
        status: error == undefined ? true : false,
        isLoading,
        voteEventFunction,
        isSuccess,
    }
}

// function Vote(uint8 _playerVote, uint256 _eventID) external
export const useVote = (
    option: number,
    eventID: number,
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: 'vote',
        cacheTime: 2_000,
        args: [option, eventID],
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error', prepareError)
        },
    })
    const { write: voteFunction, data } = useContractWrite(config)
    const { isLoading, isSuccess, isError, error, } = useWaitForTransaction({
        hash: data?.hash,
        cacheTime: 2_000,
        onSuccess(data) {
            console.log("wait for transaction success: ", data);
        },
        onError(error) {
            console.log('wait for transaction result error: ', error);
        },
    })

    return {
        status: error == undefined ? true : false,
        isLoading,
        voteFunction,
        isSuccess,
    }
}

// function isWinner(
//     address _address,
//     uint256 _eventID,
//     uint8 _level
// ) public view returns (bool) {
export const useIsWinner = (
    address: string,
    eventID: number,
    roundLevel: number,
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { data: isWinner, error, isLoading } = useContractRead({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: "isWinner",
        cacheTime: 2_000,
        args: [address, eventID, roundLevel],
        watch: true,
        chainId: chainId,
        onSuccess() {
            console.log("getting is winner success")
        },
        onError(error: any) {
            console.log("error occured in is winner: ", error);
        }
    });

    return {
        status: error == undefined ? true : false,
        result: isWinner,
        isLoading,
    }
}

// mapping(address => mapping(uint256 => bool)) playersVoteState;
export const usePlayersVoteState = (
    eventID: number,
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    const { address, } = useAccount();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { data: playersVoteState, error, isLoading } = useContractRead({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: "playersVoteState",
        args: [address, eventID,],
        watch: true,
        chainId: chainId,
        onSuccess() {
            console.log("getting player vote state success")
        },
        onError(error: any) {
            console.log("error occured in player vote state: ", error);
        }
    });

    return {
        status: error == undefined ? true : false,
        result: playersVoteState,
        isLoading,
    }
}

// function getWinners(
//     uint256 _eventID
// ) public view returns(address[] memory)
export const useGetWinners = (
    eventID: number,
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { data: getWinners, error, isLoading } = useContractRead({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: "getWinners",
        cacheTime: 2_000,
        args: [eventID,],
        watch: true,
        chainId: chainId,
        onSuccess() {
            console.log("getting winner state success")
        },
        onError(error: any) {
            console.log("error occured in getting winner state: ", error);
        }
    });

    return {
        status: error == undefined ? true : false,
        result: getWinners,
        isLoading,
    }
}

// mapping(uint256 => EvenEventVotetInfo) public eventVote;
export const useEventVote = (
    eventID: number
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { data: eventVote, error, isLoading } = useContractRead({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: "eventVote",
        cacheTime: 2_000,
        args: [eventID],
        watch: true,
        chainId: chainId,
        onSuccess() {
            console.log("getting event vote success")
        },
        onError(error: any) {
            console.log("error occured in getting event vote: ", error);
        }
    });

    return {
        status: error == undefined ? true : false,
        result: eventVote,
        isLoading,
    }
}

// function getWinnerIDs(
//     uint256 _eventID
// ) public view returns (uint16[] memory)
export const useGetWinnerIDs = (
    eventID: number
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { data: getWinnerIDs, error, isLoading } = useContractRead({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: "getWinnerIDs",
        cacheTime: 2_000,
        args: [eventID],
        watch: true,
        chainId: chainId,
        onSuccess() {
            console.log("getting winner ids success")
        },
        onError(error: any) {
            console.log("error occured in getting winner ids: ", error);
        }
    });

    return {
        status: error == undefined ? true : false,
        result: getWinnerIDs,
        isLoading,
    }
}

// mapping(uint256 => uint256) public registerDeadlineOfEvent;
export const useRegisterDeadlineOfEvent = (
    eventID: number
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { data: registerDeadlineOfEvent, error, isLoading } = useContractRead({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: "registerDeadlineOfEvent",
        cacheTime: 2_000,
        args: [eventID],
        watch: true,
        chainId: chainId,
        onSuccess() {
            console.log("getting event vote success")
        },
        onError(error: any) {
            console.log("error occured in getting event vote: ", error);
        }
    });

    return {
        status: error == undefined ? true : false,
        result: registerDeadlineOfEvent,
        isLoading,
    }
}

// function getFinalRoundWinnersByEvent(
//     uint256 _eventID
// ) public view returns(address[] memory)
export const useGetFinalRoundWinnersByEvent = (
    eventID: number
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { data: getFinalRoundWinnersByEvent, error, isLoading } = useContractRead({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: "getFinalRoundWinnersByEvent",
        args: [eventID],
        cacheTime: 2_000,
        watch: true,
        chainId: chainId,
        onSuccess() {
            console.log("getting event vote success")
        },
        onError(error: any) {
            console.log("error occured in getting event vote: ", error);
        }
    });

    return {
        status: error == undefined ? true : false,
        result: getFinalRoundWinnersByEvent,
        isLoading,
    }
}

// function createNewEvent(
//     string memory _desc,
//     uint256 _maxPlayers,
//     uint256 _registerAmount,
//     uint256 _registerDeadline,
//     uint8 _totalRound,
//     uint256 _roundAmount,
//     uint8 _orgFeePercent,
//    // bool _isWarrior
// ) external virtual onlyAdmin {
export const useCreateNewEvent = (
    description: string,
    maxPlayers: number,
    registrationCost: number,
    registerDeadline: number,
    totalRound: number,
    roundBetCost: number,
    orgFeePercent: number,
    isNativeToken: boolean,
    isWarrior: boolean,
) => {
    const { chain } = useNetwork();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: 'createNewEvent',
        cacheTime: 2_000,
        args: isNativeToken ? [
            description,
            maxPlayers,
            ethers.utils.parseEther(registrationCost.toString()),
            registerDeadline,
            totalRound,
            ethers.utils.parseEther(roundBetCost.toString()),
            orgFeePercent,
        ] : [
            description,
            maxPlayers,
            ethers.utils.parseEther(registrationCost.toString()),
            registerDeadline,
            totalRound,
            ethers.utils.parseEther(roundBetCost.toString()),
            orgFeePercent,
            isWarrior,
        ],
        overrides: {
            gasLimit: BigNumber.from(3000000),
        },
        onSuccess(data) {
            console.log('in the create new event prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('in the create new event prepare contract write Error', prepareError)
        },
    })
    const { write: createNewEventFunction, data } = useContractWrite(config)
    const { isLoading, isSuccess, isError, error, } = useWaitForTransaction({
        hash: data?.hash,
        cacheTime: 2_000,
        onSuccess(data) {
            console.log("wait for transaction success: ", data);
        },
        onError(error) {
            console.log('wait for transaction result error: ', error);
        },
    })

    return {
        status: error == undefined ? true : false,
        isLoading,
        createNewEventFunction,
        isSuccess,
    }
}

// function addRound(
//     uint256 _eventID,
//     string memory _desc,
//     uint256 _startTime
// ) public onlyAdmin
export const useAddRound = (
    eventID: number,
    description: string,
    startTime: number,
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: 'addRound',
        cacheTime: 2_000,
        args: [
            eventID,
            description,
            startTime,
        ],
        overrides: {
            gasLimit: BigNumber.from(3000000),
        },
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error', prepareError)
        },
    })
    const { write: addRoundFunction, data } = useContractWrite(config)
    const { isLoading, isSuccess, isError, error, } = useWaitForTransaction({
        hash: data?.hash,
        cacheTime: 2_000,
        onSuccess(data) {
            console.log("wait for transaction success: ", data);
        },
        onError(error) {
            console.log('wait for transaction result error: ', error);
        },
    })

    return {
        status: error == undefined ? true : false,
        isLoading,
        addRoundFunction,
        isSuccess,
    }
}

// function reportResult(
//     uint256 _roundID,
//     RoundResult _result
// ) public virtual onlyOracle
export const useReportResultForSBCRound = (
    roundID: number,
    result: number,
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: 'reportResult',
        cacheTime: 2_000,
        args: [
            roundID,
            result,
        ],
        overrides: {
            gasLimit: BigNumber.from(3000000),
        },
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error', prepareError)
        },
    })
    const { write: reportResultFunction, data } = useContractWrite(config)
    const { isLoading, isSuccess, isError, error, } = useWaitForTransaction({
        hash: data?.hash,
        cacheTime: 2_000,
        onSuccess(data) {
            console.log("wait for transaction success: ", data);
        },
        onError(error) {
            console.log('wait for transaction result error: ', error);
        },
    })

    return {
        status: error == undefined ? true : false,
        isLoading,
        reportResultFunction,
        isSuccess,
    }
}


// function resultVote(uint256 _eventID) external onlyAdmin {
export const useResultVote = (
    eventID: number,
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: 'resultVote',
        cacheTime: 2_000,
        args: [
            eventID,
        ],
        overrides: {
            gasLimit: BigNumber.from(3000000),
        },
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error', prepareError)
        },
    })
    const { write: resultVoteFunction, data } = useContractWrite(config)
    const { isLoading, isSuccess, isError, error, } = useWaitForTransaction({
        hash: data?.hash,
        cacheTime: 2_000,
        onSuccess(data) {
            console.log("wait for transaction success: ", data);
        },
        onError(error) {
            console.log('wait for transaction result error: ', error);
        },
    })

    return {
        status: error == undefined ? true : false,
        isLoading,
        resultVoteFunction,
        isSuccess,
    }
}

// // function voteDeadline(
// //     uint256 _eventID
// // ) public view returns(address[] memory)
// export const useVoteDeadline = (
//     eventID: number
// ) => {
//     const { chain } = useNetwork();
//     const { isNativeToken, } = useChainContext();
//     const chainId = chain?.id != undefined ? chain.id :
//         process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

//     const { data: voteDeadline, error, isLoading } = useContractRead({
//         address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
//         abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
//         functionName: "voteDeadline",
//         args: [eventID],
//         watch: true,
//         chainId: chainId,
//         onSuccess() {
//             console.log("getting vote deadline success")
//         },
//         onError(error: any) {
//             console.log("error occured in getting vote deadline: ", error);
//         }
//     });

//     return {
//         status: error == undefined ? true : false,
//         result: voteDeadline,
//         isLoading,
//     }
// }

// function pickWinner(uint256 _eventID) public onlyAdmin {
export const usePickWinner = (
    eventID: number,
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: 'pickWinner',
        cacheTime: 2_000,
        args: [
            eventID,
        ],
        overrides: {
            gasLimit: BigNumber.from(3000000),
        },
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error', prepareError)
        },
    })
    const { write: pickWinnerFunction, data } = useContractWrite(config)
    const { isLoading, isSuccess, isError, error, } = useWaitForTransaction({
        hash: data?.hash,
        cacheTime: 2_000,
        onSuccess(data) {
            console.log("wait for transaction success: ", data);
        },
        onError(error) {
            console.log('wait for transaction result error: ', error);
        },
    })

    return {
        status: error == undefined ? true : false,
        isLoading,
        pickWinnerFunction,
        isSuccess,
    }
}

// mapping(address => mapping(uint256 => mapping(uint8 => RoundResult)))
// public bettorDecisionOnRound;
export const useBettorDecisionOnRound = (
    eventID: number,
    roundID: number,
) => {
    const { chain } = useNetwork();
    const { address, } = useAccount();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { data: bettorDecisionOnRound, error, isLoading } = useContractRead({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: "bettorDecisionOnRound",
        cacheTime: 2_000,
        args: [address, eventID, roundID,],
        watch: true,
        chainId: chainId,
        onSuccess() {
            console.log("getting bettor decision on round  success")
        },
        onError(error: any) {
            console.log("error occured in getting bettor decision on round : ", error);
        }
    });

    return {
        status: error == undefined ? true : false,
        result: bettorDecisionOnRound,
        isLoading,
    }
}

// function winnersClaimPrize(uint256 _eventID) public onlyAdmin {
export const useWinnersClaimPrize = (
    eventID: number,
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: 'winnersClaimPrize',
        cacheTime: 2_000,
        args: [eventID,],
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error', prepareError)
        },
    })
    const { write: winnersClaimPrizeFunction, data } = useContractWrite(config)
    const { isLoading, isSuccess, isError, error, } = useWaitForTransaction({
        hash: data?.hash,
        cacheTime: 2_000,
        onSuccess(data) {
            console.log("wait for transaction success: ", data);
        },
        onError(error) {
            console.log('wait for transaction result error: ', error);
        },
    })

    return {
        status: error == undefined ? true : false,
        isLoading,
        winnersClaimPrizeFunction,
        isSuccess,
    }
}

// function getWinnersNumber(
//     uint256 _eventID,
//     RoundResult _result
// ) external view returns (uint16 winnerNumber)
export const useGetWinnersNumber = (
    eventID: number,
    result: number,
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { data: getWinnersNumber, error, isLoading } = useContractRead({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: "getWinnersNumber",
        cacheTime: 2_000,
        args: [eventID, result,],
        watch: true,
        chainId: chainId,
        onSuccess() {
            console.log("getting winners number success")
        },
        onError(error: any) {
            console.log("error occured in getting winners number: ", error);
        }
    });

    return {
        status: error == undefined ? true : false,
        result: getWinnersNumber,
        isLoading,
    }
}

///======================================= This is for warrior event only  (utbets token only)
// function registerOnWarriorEvent(
//     uint256 _eventID,
//     bytes memory _signature
// ) external
export const useRegisterOnWarriorEvent = (
    eventID: number,
    signature: string,
) => {

    const { chain } = useNetwork();
    const isNativeToken = false;
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC,
        functionName: 'registerOnWarriorEvent',
        cacheTime: 2_000,
        args: [eventID, signature,],
        // overrides: {
        //     gasLimit: BigNumber.from(3000000),
        // },
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error', prepareError)
        },
    })
    const { write: registerOnWarriorEventFunction, data } = useContractWrite(config)
    const { isLoading, isSuccess, isError, error, } = useWaitForTransaction({
        hash: data?.hash,
        cacheTime: 2_000,
        onSuccess(data) {
            console.log("wait for transaction success: ", data);
        },
        onError(error) {
            console.log('wait for transaction result error: ', error);
        },
    })

    return {
        status: error == undefined ? true : false,
        isLoading,
        registerOnWarriorEventFunction,
        isSuccess,
    }
}