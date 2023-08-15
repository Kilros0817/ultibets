import { readContract, writeContract } from "@wagmi/core";

// function approve(address spender, uint256 amount) public virtual override returns (bool) {
export const approveUtbets = async (tokenAddress: any,
    spender: any,
    amount: any) => {
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
        functionName: "approve",
        args: [spender, amount],
    });

    await wait();

};

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

export const getUSDCBalance = async (tokenAddress: any, account: any) => {
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
    });

    return balance;
};