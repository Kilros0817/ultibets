import axios from "axios";
import { secondsInMonth } from "../../config";

export const getLeaderboardData = async (
    chainId?: number,
) => {
    const time = Math.round(Date.now() / 1000) - secondsInMonth
    let query = `{
        ultiBettors {
          id
          nameOnLeaderBoard
          onLeaderBoard
          totalPrize
          predictions(where: {betTime_gte: "${time}", event_: {status_not: 0}}) {
            betTime
            amount
            paidAmount
            prediction
            event {
              startTime
            }
          }
          roiLogs(where: {timestamp_gte: "${time}"}, first: 1) {
            totalBetAmount
            totalPaidAmount
            timestamp
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