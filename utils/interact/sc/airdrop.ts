
import { readContract, waitForTransaction, writeContract } from "@wagmi/core";
import {
    airdropContractAddresses,
} from '../../config';
import { utbetsAirdropAbi } from '../../assets';

// function claimPrize() external {
export const claimPrize = async (
    chainId: number,
) => {
    try {
        const { hash } = await writeContract({
            address: (airdropContractAddresses as any)[chainId],
            abi: utbetsAirdropAbi,
            functionName: 'claimPrize',
            args: [],
        });
        const data = await waitForTransaction({ hash });
        if (data.status == "success") {
            return true
        } else {
            return false
        }
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
