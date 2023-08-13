import {
    useAccount,
    useContractRead,
    useContractWrite,
    useNetwork,
    usePrepareContractWrite,
    useWaitForTransaction,
} from 'wagmi';
import {
    airdropContractAddresses,
    mumbaiChainId,
    newChainAttrs,
    polygonChainId,
} from '../../config';
import { utbetsAirdropAbi } from '../../assets';

// function claimPrize() external {
export const useClaimPrize = () => {
    const { chain } = useNetwork();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (airdropContractAddresses as any)[chainId],
        abi: utbetsAirdropAbi,
        cacheTime: 2_000,
        functionName: 'claimPrize',
        args: [],
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error', prepareError)
        },
    })
    const { write: claimPrizeFunction, data } = useContractWrite(config)
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
        claimPrizeFunction,
        isSuccess,
    }
}

// mapping(address => uint256) public prizeAmount;
export const usePrizeAmount = () => {
    const { chain } = useNetwork();
    const { address, } = useAccount();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { data: prizeAmount, error, isLoading } = useContractRead({
        address: (airdropContractAddresses as any)[chainId],
        abi: utbetsAirdropAbi,
        functionName: "prizeAmount",
        cacheTime: 2_000,
        args: [
            address ?? '0x0',
        ],
        watch: true,
        chainId: chainId,
        onSuccess() {
            console.log("getting prize amount success")
        },
        onError(error: any) {
            console.log("error occured in getting prize amount: ", error);
        }
    });

    return {
        status: error == undefined ? true : false,
        result: prizeAmount,
        isLoading,
    }
}
