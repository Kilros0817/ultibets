
import { readContract, writeContract } from "@wagmi/core";
import {
    airdropContractAddresses,
} from '../../config';
import { utbetsAirdropAbi } from '../../assets';

// function claimPrize() external {
export const claimPrize = async (
    chainId: number,
) => {
    try {
        const { wait } = await writeContract({
            mode: "recklesslyUnprepared",
            address: (airdropContractAddresses as any)[chainId],
            abi: utbetsAirdropAbi,
            functionName: 'claimPrize',
            args: [],
        });
        await wait();
        return true;
    } catch (e) {
        console.log(e, "============error in claim prize=============")
        return false
    }
}

// mapping(address => uint256) public prizeAmount;
export const getPrizeAmount = async (chainId: number, address: any) => {
    const amount = await readContract({
        address: (airdropContractAddresses as any)[chainId],
        abi: utbetsAirdropAbi,
        functionName: "prizeAmount",
        args: [address],
    })

    return amount;
}
