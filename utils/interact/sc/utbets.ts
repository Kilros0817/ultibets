import {
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
} from 'wagmi';
import { ethers } from 'ethers';

// function approve(address spender, uint256 amount) public virtual override returns (bool) {
export const useApprove = (
    tokenAddress: any,
    spender: string,
    amount: string
) => {
    const { config, error: prepareError } = usePrepareContractWrite({
        address: tokenAddress,
        abi: [{
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },],
        functionName: 'approve',
        cacheTime: 2_000,
        args: [
            //@ts-ignore
            spender,
            ethers.utils.parseEther(amount),
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
