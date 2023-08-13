import {
    useContractRead,
    useContractWrite,
    useNetwork,
    usePrepareContractWrite,
    useWaitForTransaction,
} from 'wagmi';
import {
    mumbaiChainId,
    polygonChainId,
    lpStakingAddresses,
    lpTokenAddresses,
    uniswapV2Router02routerAddresses,
    newChainAttrs,
} from '../../config';
import { UniswapV2PairAbi, } from '../../assets';
import { ethers } from 'ethers';

// // function stake(uint256 _amount) public {
// export const useStake = (
//     amount: number,
//     isNativeUtbetsLp: boolean,
// ) => {
//     const { chain } = useNetwork();
//     const chainId = chain?.id != undefined ? chain.id :
//         process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

//     const { config, error: prepareError } = usePrepareContractWrite({
//         //@ts-ignore
//         address: (lpStakingAddresses as any)[chainId][isNativeUtbetsLp ? 'nativeUtbetsLpStaking' : 'usdcUtbetsLpStaking'],
//         abi: isNativeUtbetsLp ? nativeUtbetsLpStakingAbi : usdcUtbetsLpStakingAbi,
//         functionName: 'stake',
//         args: [
//             ethers.utils.parseEther(amount.toString()),
//         ],
//         onSuccess(data) {
//             console.log('prepare contract write Success', data)
//         },
//         onError(prepareError) {
//             console.log('prepare contract write Error', prepareError)
//         },
//     })
//     const { write: stakeFunction, data } = useContractWrite(config)
//     const { isLoading, isSuccess, isError, error, } = useWaitForTransaction({
//        hash: data?.hash,
// cacheTime: 2_000,
//         onSuccess(data) {
//             console.log("wait for transaction success: ", data);
//         },
//         onError(error) {
//             console.log('wait for transaction result error: ', error);
//         },
//     })

//     return {
//         status: error == undefined ? true : false,
//         isLoading,
//         stakeFunction,
//         isSuccess,
//     }
// }

// // function unStake(uint256 _amount) public {
// export const useUnStake = (
//     amount: number,
//     isNativeUtbetsLp: boolean,
// ) => {
//     const { chain } = useNetwork();
//     const chainId = chain?.id != undefined ? chain.id :
//         process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

//     const { config, error: prepareError } = usePrepareContractWrite({
//         //@ts-ignore
//         address: (lpStakingAddresses as any)[chainId][isNativeUtbetsLp ? 'nativeUtbetsLpStaking' : 'usdcUtbetsLpStaking'],
//         abi: isNativeUtbetsLp ? nativeUtbetsLpStakingAbi : usdcUtbetsLpStakingAbi,
//         functionName: 'unStake',
//         args: [
//             ethers.utils.parseEther(amount.toString()),
//         ],
//         onSuccess(data) {
//             console.log('prepare contract write Success', data)
//         },
//         onError(prepareError) {
//             console.log('prepare contract write Error', prepareError)
//         },
//     })
//     const { write: unStakeFunction, data } = useContractWrite(config)
//     const { isLoading, isSuccess, isError, error, } = useWaitForTransaction({
//        hash: data?.hash,
// cacheTime: 2_000,
//         onSuccess(data) {
//             console.log("wait for transaction success: ", data);
//         },
//         onError(error) {
//             console.log('wait for transaction result error: ', error);
//         },
//     })

//     return {
//         status: error == undefined ? true : false,
//         isLoading,
//         unStakeFunction,
//         isSuccess,
//     }
// }

// // function claim() public nonReentrant {
// export const useClaim = (
//     isNativeUtbetsLp: boolean,
// ) => {
//     const { chain } = useNetwork();
//     const chainId = chain?.id != undefined ? chain.id :
//         process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

//     const { config, error: prepareError } = usePrepareContractWrite({
//         //@ts-ignore
//         address: (lpStakingAddresses as any)[chainId][isNativeUtbetsLp ? 'nativeUtbetsLpStaking' : 'usdcUtbetsLpStaking'],
//         abi: isNativeUtbetsLp ? nativeUtbetsLpStakingAbi : usdcUtbetsLpStakingAbi,
//         functionName: 'claim',
//         args: [],
//         onSuccess(data) {
//             console.log('prepare contract write Success', data)
//         },
//         onError(prepareError) {
//             console.log('prepare contract write Error', prepareError)
//         },
//     })
//     const { write: claimFunction, data } = useContractWrite(config)
//     const { isLoading, isSuccess, isError, error, } = useWaitForTransaction({
//        hash: data?.hash,
// cacheTime: 2_000,
//         onSuccess(data) {
//             console.log("wait for transaction success: ", data);
//         },
//         onError(error) {
//             console.log('wait for transaction result error: ', error);
//         },
//     })

//     return {
//         status: error == undefined ? true : false,
//         isLoading,
//         claimFunction,
//         isSuccess,
//     }
// }

// function approve(address spender, uint value) external returns (bool) {
export const useApprove = (
    amount: number,
    isNativeUtbetsLp: boolean,
) => {
    const { chain } = useNetwork();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (lpTokenAddresses as any)[chainId][isNativeUtbetsLp ? 'nativeUtbetsLp' : 'usdcUtbetsLp'],
        abi: UniswapV2PairAbi,
        functionName: 'approve',
        cacheTime: 2_000,
        args: [
            (lpStakingAddresses as any)[chainId][isNativeUtbetsLp ? 'nativeUtbetsLpStaking' : 'usdcUtbetsLpStaking'],
            ethers.utils.parseEther(amount.toString()),
        ],
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error', prepareError)
        },
    })
    const { write: approveFunction, data } = useContractWrite(config)
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
        approveFunction,
        isSuccess,
    }
}


// function totalSupply() external view returns (uint);
export const useTotalSupply = (
    isNativeUtbetsLp: boolean,
) => {
    const { chain } = useNetwork();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { data: totalSupply, error, isLoading } = useContractRead({
        address: (lpTokenAddresses as any)[chainId][isNativeUtbetsLp ? 'nativeUtbetsLp' : 'usdcUtbetsLp'],
        abi: UniswapV2PairAbi,
        functionName: "totalSupply",
        args: [
            (uniswapV2Router02routerAddresses as any)[chainId],
        ],
        watch: true,
        chainId: chainId,
        onSuccess() {
            console.log("getting total supply success")
        },
        onError(error: any) {
            console.log("error occured in getting total supply: ", error);
        }
    });

    return {
        status: error == undefined ? true : false,
        result: totalSupply,
        isLoading,
    }
}
