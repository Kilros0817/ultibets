import {
    useContractWrite,
    useNetwork,
    usePrepareContractWrite,
    useWaitForTransaction,
} from 'wagmi';
import { BigNumber, } from 'ethers';
import {
    rndGeneratorContract,
    mumbaiChainId,
    polygonChainId,
    newChainAttrs,
} from '../../config';
import { rndGeneratorAbi } from '../../assets';

// function requestRandomWords()
//         public onlyOwner
// returns(uint256 requestId)
export const useRequestRandomWords = (
) => {
    const { chain } = useNetwork();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (rndGeneratorContract as any)[chainId],
        abi: rndGeneratorAbi,
        functionName: 'requestRandomWords',
        cacheTime: 2_000,
        args: [],
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
    const { write: requestRandomWordsFunction, data } = useContractWrite(config)
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
        requestRandomWordsFunction,
        isSuccess,
    }
}

// export const useRequestRandomWords = async () => {
//     // const { chain } = useNetwork();
//     // const chainId = chain?.id != undefined ? chain.id :
//     //     process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;
//     const chainId = 80001;

//     try {
//         const { wait } = await writeContract({
//             mode: "recklesslyUnprepared",
//             //@ts-ignore
//             address: rndGeneratorContract[chainId] ? rndGeneratorContract[chainId] :
//                 rndGeneratorContract[process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId],
//             abi: rndGeneratorContractJson,
//             functionName: "requestRandomWords",
//         });

//         await wait();

//     } catch (e) {
//         console.log(e);
//     }
// }