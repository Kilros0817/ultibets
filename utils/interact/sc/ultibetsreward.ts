import { writeContract } from "@wagmi/core";
import {
    ultibetsRewardAddresses,
} from '../../config';
import { ultibetsRewardAbi } from '../../assets';
import { ethers } from 'ethers';

// function claimReferralBettingReward(
//     uint256 _amount,
//     bytes memory _signature
// ) external
export const claimReferralBettingReward = async (
    amount: number,
    signature: string,
    chainId: number,
) => {
    try {
        const { wait } = await writeContract({
            mode: "recklesslyUnprepared",
            address: (ultibetsRewardAddresses as any)[chainId],
            abi: ultibetsRewardAbi,
            functionName: 'claimReferralBettingReward',
            args: [
                ethers.utils.parseEther(amount?.toString() ?? '0'),
                signature,
            ],
        });
        await wait();
        return true;
    } catch (e) {
        console.log(e, "============error in claim referral betting reward=============")
        return false
    }
}

// function claimReward() external {
export const claimReward = async (
    chainId: number,
) => {
    try {
        const { wait } = await writeContract({
            mode: "recklesslyUnprepared",
            address: (ultibetsRewardAddresses as any)[chainId],
            abi: ultibetsRewardAbi,
            functionName: 'claimReward',
            args: [],
        });
        await wait();
        return true;
    } catch (e) {
        console.log(e, "============error in claim reward=============")
        return false
    }
}