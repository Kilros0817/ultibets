import {
    useContractRead,
    useContractWrite,
    useNetwork,
    usePrepareContractWrite,
    useAccount,
    useWaitForTransaction,
} from 'wagmi';
import {
    ultiBetsLeaderBoardAddresses,
    mumbaiChainId,
    polygonChainId,
    newChainAttrs,
} from '../../config';
import { UltiBetsLeaderBoardAbi } from '../../assets';

// mapping(string => bool) public isUsedName;
export const useIsUsedName = (
    name: string,
) => {
    const { chain } = useNetwork();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { data: isUsedName, error, isLoading } = useContractRead({
        address: (ultiBetsLeaderBoardAddresses as any)[chainId],
        abi: UltiBetsLeaderBoardAbi,
        functionName: "isUsedName",
        cacheTime: 2_000,
        args: [name],
        watch: true,
        chainId: chainId,
        onSuccess() {
            console.log("getting isUsedName success")
        },
        onError(error: any) {
            console.log("error occured in getting isUsedName: ", error);
        }
    });

    return {
        status: error == undefined ? true : false,
        result: isUsedName,
        isLoading,
    }
}

// function registerOnLeaderboard(string memory _name) external {
export const useRegisterOnLeaderboard = (
    name: string,
) => {
    const { chain } = useNetwork();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (ultiBetsLeaderBoardAddresses as any)[chainId],
        abi: UltiBetsLeaderBoardAbi,
        functionName: 'registerOnLeaderboard',
        cacheTime: 2_000,
        args: [name],
        onSuccess(data) {
            console.log('prepare contract write Success', data)
        },
        onError(prepareError) {
            console.log('prepare contract write Error', prepareError)
        },
    })
    const { write: registerOnLeaderboardFunction, data } = useContractWrite(config)
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
        registerOnLeaderboardFunction,
        isSuccess,
    }
}
