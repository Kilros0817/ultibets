import { readContract, writeContract } from "@wagmi/core";
import { ethers } from 'ethers';

// function approve(address spender, uint256 amount) public virtual override returns (bool) {
export const utbetsApprove = async (
    tokenAddress: any,
    spender: string,
    amount: string
) => {
    try {
        const { wait } = await writeContract({
            mode: "recklesslyUnprepared",
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
            args: [//@ts-ignore
                spender,
                ethers.utils.parseEther(amount),],
        });
        await wait();
        return true;
    } catch (e) {
        console.log(e, "============error in approve=============")
        return false
    }
}

export const getUTBETSBalance = async (tokenAddress: any, account: any) => {
    const balance = await readContract({
        address: tokenAddress,
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
    })

    return balance;
}

export const getAllowance = async (tokenAddress: any, owner: any, spender: any) => {
    const allowance = await readContract({
        address: tokenAddress,
        abi: [{
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
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
        },],
        functionName: "allowance",
        args: [owner, spender],
    });
    return allowance;
}