import axios from "axios";

export const getRewardData = async (
    address: string,
    chainId?: number,
) => {
    console.log("===========$$$$: ", address);
    let query = `{
        ultiBettors(where: {id: "${address}"}) {
            claimableRewardAmount
            claimedRewardAmount
            currentRewardTier
            totalBettingAmount
        }
    }`;

    const params = {
        query: query,
        chainId: chainId,
    }

    let returnedData = [];
    let isSuccess;

    try {
        const res = await axios.post("/api/subgraph/returnDataFromSubgraph", params, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        returnedData = res?.data?.data?.ultiBettors;

        if (returnedData?.length > 0) {
            console.log("returned data: aaaaaaaa ", returnedData);
            isSuccess = true;
        } else {
            isSuccess = true;
            returnedData = [];
        }
    } catch (e) {
        // toast.error("Failed to fetch from subgraph. ");
        console.log(e, "============error============");
        isSuccess = false;
    }

    return {
        isSuccess: isSuccess,
        returnedData: returnedData,
    };
};