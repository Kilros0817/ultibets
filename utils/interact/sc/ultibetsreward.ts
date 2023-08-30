import { waitForTransaction, writeContract } from "@wagmi/core";
import {
    ultibetsRewardAddresses,
} from '../../config';
import { ultibetsRewardAbi } from '../../assets';
import { parseEther } from "viem";

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
        const { hash } = await writeContract({
            address: (ultibetsRewardAddresses as any)[chainId],
            abi: ultibetsRewardAbi,
            functionName: 'claimReferralBettingReward',
            args: [
                parseEther(amount?.toString() ?? '0'),
                signature,
            ],
        });
        const data = await waitForTransaction({hash});
        if (data.status == "success") {
            return true
        } else {
            return false
        }
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
        const { hash } = await writeContract({
            address: (ultibetsRewardAddresses as any)[chainId],
            abi: ultibetsRewardAbi,
            functionName: 'claimReward',
            args: [],
        });
        const data = await waitForTransaction({hash});
        if (data.status == "success") {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log(e, "============error in claim reward=============")
        return false
    }
}

// function claimReferralReward(
//     uint256 _amount,
//     bytes memory _signature
// ) external
export const claimReferralReward = async (
    amount: number,
    signature: string,
    chainId: number,
) => {
    try {
        const { hash } = await writeContract({
            address: (ultibetsRewardAddresses as any)[chainId],
            abi: ultibetsRewardAbi,
            functionName: 'claimReferralReward',
            args: [parseEther((amount ?? '0')?.toString()), signature],
        });
        const data = await waitForTransaction({hash});
        if (data.status == "success") {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log(e, "============error in claim reward=============")
        return false
    }
}