import axios from "axios";
import { formatEther } from "viem";

export const getProfileData = async (
    address: string,
) => {
    let query = `{
        ultiBettors(where: {id: "${address}"}) {
            claimedReferralRewardAmount
            currentRewardTier
            id
            isClaimedReferralBettingReward
            isReferred
            nameOnLeaderBoard
            onLeaderBoard
            referralBettingReward
            totalBettingAmount
            totalPrize
            totalRefereeNumber
            totalReferralRewardAmount
            validRefereeNumber
            predictions {
                betTime
                amount
                paidAmount
                prediction
            }
        }
    }`;

    const params = {
        query: query,
        chainId: -1,
    }

    let isSuccess = true;
    let totalReferrals = 0;
    let validReferrals = 0;
    let claimableReward = 0;
    let totalClaimedAmount = 0;
    let isReferred = false;
    let isClaimedReferralBettingReward = false;
    let referralBettingReward = 0;

    try {
        const res = await axios.post("/api/subgraph/returnDataFromSubgraph", params, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        let returnedData = res?.data?.data;
        if (returnedData.length > 0) {
            for (let i = 0; i < returnedData.length; i++) {
                if (returnedData[i]?.ultiBettors.length > 0) {
                    totalReferrals += Number(returnedData[i]?.ultiBettors[0]?.totalRefereeNumber);
                    validReferrals += Number(returnedData[i]?.ultiBettors[0]?.validRefereeNumber);
                    totalClaimedAmount += parseFloat(formatEther(returnedData[i]?.ultiBettors[0]?.claimedReferralRewardAmount ?? '0'));
                    claimableReward += parseFloat(formatEther(returnedData[i]?.ultiBettors[0]?.totalReferralRewardAmount ?? '0')) -
                        parseFloat(formatEther(returnedData[i]?.ultiBettors[0]?.claimedReferralRewardAmount ?? '0'))
                    isReferred = isReferred || (returnedData[i]?.ultiBettors[0]?.isReferred == true ? true : false)
                    isClaimedReferralBettingReward =
                        isClaimedReferralBettingReward || (returnedData[i]?.ultiBettors[0]?.isClaimedReferralBettingReward == true ? true : false)
                    referralBettingReward += parseFloat(formatEther(returnedData[i]?.ultiBettors[0]?.referralBettingReward ?? '0'));
                    isSuccess = true;
                }
            }
        }
    } catch (e) {
        // toast.error("Failed to fetch from subgraph. ");
        // console.log(e, "============error============");
        isSuccess = false;
    }

    return {
        isSuccess: isSuccess,
        returnedData: {
            totalReferrals,
            validReferrals,
            claimableReward,
            totalClaimedAmount,
            isReferred,
            isClaimedReferralBettingReward,
            referralBettingReward,
        },
    };
};