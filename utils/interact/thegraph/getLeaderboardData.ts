import axios from "axios";

export const getLeaderboardData = async (
    chainId?: number,
) => {
    let query = `{
        ultiBettors(where: {onLeaderBoard: true}) {
            id
            nameOnLeaderBoard
            onLeaderBoard
            totalBettingAmount
            totalPrize
            predictions {
                betTime
                amount
                paidAmount
                prediction
            }
            roiLogs {
                timestamp
                totalBetAmount
                totalPaidAmount
            }
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
            console.log("returned data: ", returnedData);
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