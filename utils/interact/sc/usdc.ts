import { readContract, waitForTransaction, writeContract } from "@wagmi/core";
import { merchStoreContractAddresses, usdcAddresses } from "../../config";
import { parseUnits } from "viem";

export const getUSDCBalance = async (account: any, chainId: number) => {
    const balance = await readContract({
        address: (usdcAddresses as any)[chainId],
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

export const transferUSDC = async (account: any, amount: any, chainId: number) => {
    const { hash } = await writeContract({
        address: (usdcAddresses as any)[chainId],
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

export const usdcApprove = async (amount: string, chainId: number) => {
    console.log(amount ,"==========amount==========")
    try {
        const { hash } = await writeContract({
            address: (usdcAddresses as any)[chainId],
            abi: [
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        }, {
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
                },
            ],
            functionName: 'approve',
            args: [
                // @ts-ignore
                (merchStoreContractAddresses as any)[chainId],
                parseUnits(String(amount), 6),
            ]
        });
        const data = await waitForTransaction({ hash });
        if (data.status == "success")
            return true;
        else
            return false;

    } catch (e) {
        console.log(e, "============error in approve=============")
        return false
    }
}

export const getAllowance = async (tokenAddress: any, owner: any, spender: any) => {
    const allowance = await readContract({
        address: tokenAddress,
        abi: [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }, {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    }
                ],
                "name": "allowance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
        ],
        functionName: "allowance",
        args: [owner, spender]
    });
    return allowance;
}