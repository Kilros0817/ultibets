import { readContract, waitForTransaction, writeContract } from "@wagmi/core";
import { polygonUSDCAddress } from "../../config";


export const getUSDCBalance = async (account: any) => {
    const balance = await readContract({
        address: polygonUSDCAddress,
        abi: [{
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }],
        functionName: "balanceOf",
        args: [account],
    });

    return balance;
};

export const transferUSDC = async (account: any, amount: any) => {
    const { hash } = await writeContract({
        
        address: polygonUSDCAddress,
        abi: [{
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        }],
        functionName: "transfer",
        args: [account, amount],
    });

    const data = await waitForTransaction({hash});
    if (data.status == "success") {
        return true
    } else {
        return false
    }

};