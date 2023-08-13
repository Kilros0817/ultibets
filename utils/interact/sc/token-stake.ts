import {
    useContractWrite,
    useNetwork,
    usePrepareContractWrite,
    useWaitForTransaction,
} from 'wagmi';
import {
    mumbaiChainId,
    polygonChainId,
    lpStakingAddresses,
    newChainAttrs,
} from '../../config';
import { nativeUtbetsLpStakingAbi, usdcUtbetsLpStakingAbi } from '../../assets';
import { BigNumber, ethers } from 'ethers';

// function stake(uint256 _amount) public {
export const useStake = (
    amount: number,
    isNativeUtbetsLp: boolean,
) => {
    const { chain } = useNetwork();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (lpStakingAddresses as any)[chainId][isNativeUtbetsLp ? 'nativeUtbetsLpStaking' : 'usdcUtbetsLpStaking'],
        abi: isNativeUtbetsLp ? nativeUtbetsLpStakingAbi : usdcUtbetsLpStakingAbi,
        functionName: 'stake',
        args: [
            ethers.utils.parseEther(amount.toString()),
        ],
        cacheTime: 2_000,
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
    const { write: stakeFunction, data } = useContractWrite(config)
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
        stakeFunction,
        isSuccess,
    }
}

// function unStake(uint256 _amount) public {
export const useUnStake = (
    amount: number,
    isNativeUtbetsLp: boolean,
) => {
    const { chain } = useNetwork();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (lpStakingAddresses as any)[chainId][isNativeUtbetsLp ? 'nativeUtbetsLpStaking' : 'usdcUtbetsLpStaking'],
        abi: isNativeUtbetsLp ? nativeUtbetsLpStakingAbi : usdcUtbetsLpStakingAbi,
        functionName: 'unStake',
        cacheTime: 2_000,
        args: [
            ethers.utils.parseEther(amount.toString()),
        ],
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error', prepareError)
        },
    })
    const { write: unStakeFunction, data } = useContractWrite(config)
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
        unStakeFunction,
        isSuccess,
    }
}

// function claim() public nonReentrant {
export const useClaim = (
    isNativeUtbetsLp: boolean,
) => {
    const { chain } = useNetwork();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (lpStakingAddresses as any)[chainId][isNativeUtbetsLp ? 'nativeUtbetsLpStaking' : 'usdcUtbetsLpStaking'],
        abi: isNativeUtbetsLp ? nativeUtbetsLpStakingAbi : usdcUtbetsLpStakingAbi,
        functionName: 'claim',
        cacheTime: 2_000,
        args: [],
        onSuccess(data) {
            console.log('claim button clicked  prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('claim button clicked  prepare contract write Error', prepareError)
        },
    })
    const { write: claimFunction, data } = useContractWrite(config)
    const { isLoading, isSuccess, isError, error, } = useWaitForTransaction({
        hash: data?.hash,
        cacheTime: 2_000,
        onSuccess(data) {
            console.log("claim button clicked wait for transaction success: ", data);
        },
        onError(error) {
            console.log('claim button clicked wait for transaction result error: ', error);
        },
    })

    return {
        status: error == undefined ? true : false,
        isLoading,
        claimFunction,
        isSuccess,
    }
}
