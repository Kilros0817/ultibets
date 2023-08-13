import {
    useContractRead,
    useContractWrite,
    useNetwork,
    usePrepareContractWrite,
    useAccount,
    useWaitForTransaction,
} from 'wagmi';
import { BigNumber, ethers } from 'ethers';
import {
    nftClaimerContract,
    mumbaiChainId,
    polygonChainId,
    NFTType,
    newChainAttrs,
} from '../../config';
import { useChainContext, } from '../../Context';
import { nftClaimerAbi } from '../../assets';

// function getClaimableNFTs(address _bettor)
// public
// view
// returns(SquidBetNFTInfo[] memory)
export const useGetClaimableNFTs = (
) => {
    const { chain } = useNetwork();
    const { address, } = useAccount();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { data: getClaimableNFTs, error, isLoading } = useContractRead({
        address: (nftClaimerContract as any)[chainId],
        abi: nftClaimerAbi,
        functionName: "getClaimableNFTs",
        cacheTime: 2_000,
        args: [address],
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
        result: getClaimableNFTs,
        isLoading,
    }
}

// function massClaimSBCNFT() public {
export const useMassClaimSBCNFT = (
) => {
    const { chain } = useNetwork();
    const { isNativeToken, } = useChainContext();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (nftClaimerContract as any)[chainId],
        abi: nftClaimerAbi,
        functionName: 'massClaimSBCNFT',
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
    const { write: massClaimSBCNFTFunction, data } = useContractWrite(config)
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
        massClaimSBCNFTFunction,
        isSuccess,
    }
}

// function setRoundNFTURI(
//     NFTType _type,
//     uint256 _eventID,
//     uint8 _level,
//     string memory _uri
// ) external onlyOwner
export const useSetRoundNFTURI = (
    type: NFTType,
    eventID: number,
    level: number,
    uri: string,
) => {
    const { chain } = useNetwork();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (nftClaimerContract as any)[chainId],
        abi: nftClaimerAbi,
        functionName: 'setRoundNFTURI',
        cacheTime: 2_000,
        args: [
            type,
            eventID,
            level,
            uri,
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
    const { write: setRoundNFTURIFunction, data } = useContractWrite(config)
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
        setRoundNFTURIFunction,
        isSuccess,
    }
}

// function claimFreeBetPerk(uint256 _tokenID) external {
export const useClaimFreeBetPerk = (
    tokenID: number,
) => {
    console.log('token id: in the interact: ', tokenID);
    const { chain } = useNetwork();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (nftClaimerContract as any)[chainId],
        abi: nftClaimerAbi,
        functionName: 'claimFreeBetPerk',
        cacheTime: 2_000,
        args: [
            tokenID,
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
    const { write: claimFreeBetPerkFunction, data } = useContractWrite(config)
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
        claimFreeBetPerkFunction,
        isSuccess,
    }
}

// function usePerkForBet(uint8 _round) external
export const useUsePerkForBet = (
    round: number,
) => {
    const { chain } = useNetwork();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { config, error: prepareError } = usePrepareContractWrite({
        address: (nftClaimerContract as any)[chainId],
        abi: nftClaimerAbi,
        functionName: 'usePerkForBet',
        cacheTime: 2_000,
        args: [
            round,
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
    const { write: usePerkForBetFunction, data } = useContractWrite(config)
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
        usePerkForBetFunction,
        isSuccess,
    }
}

// function getNumberOfClaimedPerks(
//     address _holder
// ) external view returns (uint16[] memory)
export const useGetNumberOfClaimedPerks = (
) => {
    const { chain } = useNetwork();
    const { address, } = useAccount();
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const { data: getNumberOfClaimedPerks, error, isLoading } = useContractRead({
        address: (nftClaimerContract as any)[chainId],
        abi: nftClaimerAbi,
        functionName: "getNumberOfClaimedPerks",
        cacheTime: 2_000,
        args: [address],
        watch: true,
        chainId: chainId,
        onSuccess() {
            console.log("getting number of claimed perks success")
        },
        onError(error: any) {
            console.log("error occured in getting number of claimed perks: ", error);
        }
    });

    return {
        status: error == undefined ? true : false,
        result: getNumberOfClaimedPerks,
        isLoading,
    }
}