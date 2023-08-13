import {
    useContractWrite,
    useNetwork,
    usePrepareContractWrite,
    useWaitForTransaction,
} from 'wagmi';
import {
    ultibetsRewardAddresses,
    mumbaiChainId,
    polygonChainId,
    newChainAttrs,
} from '../../config';
import { ultibetsRewardAbi } from '../../assets';
import { BigNumber, ethers } from 'ethers';

// function claimReferralBettingReward(
//     uint256 _amount,
//     bytes memory _signature
// ) external
export const useClaimReferralBettingReward = (
    amount: number,
    signature: string
) => {
    const { chain } = useNetwork();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (ultibetsRewardAddresses as any)[chainId],
        abi: ultibetsRewardAbi,
        functionName: 'claimReferralBettingReward',
        args: [
            ethers.utils.parseEther(amount?.toString() ?? '0'),
            signature,
        ],
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error', prepareError)
        },
    })
    const { write: claimReferralBettingRewardFunction, data } = useContractWrite(config)
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
        claimReferralBettingRewardFunction,
        isSuccess,
    }
}


// function claimReward() external {
export const useClaimReward = (
) => {
    const { chain } = useNetwork();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (ultibetsRewardAddresses as any)[chainId],
        abi: ultibetsRewardAbi,
        functionName: 'claimReward',
        cacheTime: 2_000,
        args: [],
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error', prepareError)
        },
    })
    const { write: claimRewardFunction, data } = useContractWrite(config)
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
        claimRewardFunction,
        isSuccess,
    }
}