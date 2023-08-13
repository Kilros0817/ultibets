import {
    useAccount,
    useContractWrite,
    useNetwork,
    usePrepareContractWrite,
    useWaitForTransaction,
} from 'wagmi';
import { BigNumber, ethers } from 'ethers';
import {
    contractAddressesInDailyBets,
    mumbaiChainId,
    newChainAttrs,
    polygonChainId,
} from '../../config';
import { useChainContext, } from '../../Context';
import { nativeTokenDailyBetsAbiInPM, ultibetsTokenDailyBetsAbiInPM } from '../../assets';

// function placeBet(uint256 _eventID, EventResultInPM _eventValue)
export const usePlaceBetInPM = (
    eventID: number,
    _eventValue: number,
    newBetAmount: number | null,
    referer: string,
    signature: string,
) => {

    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;
    const { address, } = useAccount();

    console.log("referer: ", referer != '' ? referer : address)

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (contractAddressesInDailyBets as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenDailyBetsAbiInPM : ultibetsTokenDailyBetsAbiInPM,
        functionName: 'placeBet',
        cacheTime: 2_000,
        args: isNativeToken ? [
            eventID,
            _eventValue,
        ] : [
            eventID,
            _eventValue,
            ethers.utils.parseEther((newBetAmount ?? 0).toString()),
            referer != '' ? referer : address,
            signature,
        ],
        overrides: {
            value: isNativeToken ? ethers.utils.parseEther((newBetAmount ?? 0)?.toString()) : 0,
            gasLimit: ethers.BigNumber.from(1000000),
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

// function placeBetUsingPerk(
//     uint256 _eventID,
//     EventResult _eventValue,
//     uint8 _perkRound
// ) external {
export const usePlaceBetUsingPerk = (
    eventID: number,
    eventValue: number,
    perkRound: number,
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (contractAddressesInDailyBets as any)[chainId][1],
        abi: ultibetsTokenDailyBetsAbiInPM,
        functionName: 'placeBetUsingPerk',
        cacheTime: 2_000,
        args: [
            eventID,
            eventValue,
            perkRound,
        ],
        overrides: {
            gasLimit: BigNumber.from(3000000),
        },
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error ============', prepareError)
        },
    })
    const { write: placeBetUsingPerkFunction, data } = useContractWrite(config)
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
        placeBetUsingPerkFunction,
        isSuccess,
    }
}

// function withdrawGain(uint256 _eventID, uint8 _betValue)
export const useWidthdrawGain = (
    eventID: number,
    _betValue: number,
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (contractAddressesInDailyBets as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenDailyBetsAbiInPM : ultibetsTokenDailyBetsAbiInPM,
        functionName: 'withdrawGain',
        cacheTime: 2_000,
        args: [eventID, _betValue],
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error', prepareError)
        },
    })
    const { write: withdrawGainFunction, data } = useContractWrite(config)
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
        withdrawGainFunction,
        isSuccess,
    }
}

// function cancelEvent(uint256 _eventID) external onlyAdmin {
export const useCancelEvent = (
    eventID: number,
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (contractAddressesInDailyBets as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenDailyBetsAbiInPM : ultibetsTokenDailyBetsAbiInPM,
        functionName: 'cancelEvent',
        cacheTime: 2_000,
        args: [eventID],
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error', prepareError)
        },
    })
    const { write: cancelEventFunction, data } = useContractWrite(config)
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
        cancelEventFunction,
        isSuccess,
    }
}

//     function addEvent(
//     string memory _description,
//     uint8 _category,
//     uint8 _subcategory,
//     uint256 _eventStartTime,
//     uint256 _eventDate
// ) public onlyAdmin {
export const useAddEvent = (
    description: string,
    category: number,
    subcategory: number,
    eventStartTime: number,
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (contractAddressesInDailyBets as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenDailyBetsAbiInPM : ultibetsTokenDailyBetsAbiInPM,
        functionName: 'addEvent',
        // cacheTime: 2_000,
        args: [
            description,
            category,
            subcategory,
            eventStartTime,
        ],
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error', prepareError)
        },
    })
    const { write: addEventFunction, data } = useContractWrite(config)
    const { isLoading, isSuccess, isError, error, } = useWaitForTransaction({
        hash: data?.hash,
        // cacheTime: 2_000,
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
        addEventFunction,
        isSuccess,
    }
}


// function reportResult(uint256 _eventID, EventResultInPM _result)
export const useReportResult = (
    eventID: number,
    _result: number,
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (contractAddressesInDailyBets as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenDailyBetsAbiInPM : ultibetsTokenDailyBetsAbiInPM,
        functionName: 'reportResult',
        cacheTime: 2_000,
        args: [eventID, _result,],
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


// function claimBetCancelled(uint256 _eventID, EventResultInPM _EventResultInPM)
export const useClaimBetCancelled = (
    eventID: number,
    _result: number,
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (contractAddressesInDailyBets as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenDailyBetsAbiInPM : ultibetsTokenDailyBetsAbiInPM,
        functionName: 'claimBetCancelled',
        cacheTime: 2_000,
        args: [eventID, _result,],
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error', prepareError)
        },
    })
    const { write: claimBetCancelledFunction, data } = useContractWrite(config)
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
        claimBetCancelledFunction,
        isSuccess,
    }
}
